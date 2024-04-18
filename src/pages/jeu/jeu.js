import React, { useState, useEffect } from 'react';
import JeuCard from '../../components/jeucard/jeucard';
import PersoData from '../../perso.json';

function Jeu() {
    const [selectedCharacters, setSelectedCharacters] = useState(() => {
        const storedCharacters = localStorage.getItem('selectedCharacters');
        return storedCharacters ? JSON.parse(storedCharacters) : [];
    });
    const [selectedCharacter, setSelectedCharacter] = useState('');
    const [selectedFactions, setSelectedFactions] = useState(['Alliance de Radagast']);
    const [selectedAllegiance, setSelectedAllegiance] = useState('Bien');
    const groupedCharacters = PersoData.reduce((acc, character) => {
        acc[character.faction] = acc[character.faction] || [];
        acc[character.faction].push(character);
        return acc;
    }, {});
    function generateUniqueId() {
        return '_' + Math.random().toString(36).substring(2, 9);
    }
    useEffect(() => {
        localStorage.setItem('selectedCharacters', JSON.stringify(selectedCharacters));
    }, [selectedCharacters]);


    const handleSelectChange = (event) => {
        setSelectedCharacter('');
        const selectedFactions = Array.from(event.target.selectedOptions, option => option.value);
        setSelectedFactions(selectedFactions);
    };
    const handleAddCharacter = () => {
        if (selectedCharacter) {
            const selectedCharacterObj = PersoData.find(character => {
                return character.personnage === selectedCharacter && selectedFactions.includes(character.faction);
            });
            if (selectedCharacterObj) {
                let characterWithUniqueId = {
                    ...selectedCharacterObj,
                    uniqueId: generateUniqueId()
                };
                if (selectedCharacterObj.options) {
                    characterWithUniqueId = {
                        ...characterWithUniqueId,
                        options: selectedCharacterObj.options.map(option => ({ ...option, isChecked: false }))
                    };
                }
                setSelectedCharacters(prevSelectedCharacters => {
                    return [...prevSelectedCharacters, characterWithUniqueId];
                });
                setSelectedCharacter('');
            }
        }
    };
    

    const handleRemoveCharacter = (index) => {
        setSelectedCharacters(prevSelectedCharacters => {
            const updatedCharacters = [...prevSelectedCharacters];
            updatedCharacters.splice(index, 1); // Supprimer le personnage à l'index spécifié
            return updatedCharacters;
        });
    };

    const updateCharacter = (index, updatedCharacter) => {
        setSelectedCharacters(prevSelectedCharacters => {
            return prevSelectedCharacters.map((character, idx) => {
                if (idx === index) {
                    // Mettre à jour uniquement le personnage à l'index spécifié
                    return {
                        ...updatedCharacter,
                        uniqueId: character.uniqueId
                    }
                }
                return character;
            });
        });
    };

    const handleAllegianceChange = (event) => {
        const newAllegiance = event.target.value;
        setSelectedAllegiance(newAllegiance);
    
        // Filtrer les factions disponibles pour la nouvelle allégeance
        const availableFactions = allFactions.filter(faction => {
            const factionAllegiance = groupedCharacters[faction][0].allegence;
            return newAllegiance === '' || factionAllegiance === newAllegiance;
        });
    
        // Mettre à jour les factions sélectionnées
        setSelectedFactions(availableFactions.length > 0 ? [availableFactions[0]] : []);
    };
    

    // Récupérer toutes les factions distinctes
    const allFactions = Object.keys(groupedCharacters);
    // Regrouper les personnages par faction

    // Filtrer les factions par allégeance sélectionnée
    const filteredFactions = allFactions.filter(faction => {
        const factionAllegiance = groupedCharacters[faction][0].allegence;
        return selectedAllegiance === '' || factionAllegiance === selectedAllegiance;
    });

    // Filtrer les personnages par factions sélectionnées
    const filteredCharacters = PersoData.filter(character => {
        return selectedFactions.includes(character.faction) ||
            selectedFactions.includes(`LL-${character.allegence}`);
    });

    return (
        <div className='container'>
            <select value={selectedAllegiance} onChange={handleAllegianceChange}>
                <option value="">Toutes les armées</option>
                <option value="Bien">Armé du Bien</option>
                <option value="Mal">Armé du Mal</option>
                <option value="LL-Bien">Légion légendaire du bien</option>
                <option value="LL-Mal">Légion légendaire du Mal</option>

            </select>
            <select multiple value={selectedFactions} onChange={handleSelectChange}>
                {filteredFactions.map((faction, index) => (
                    <option key={index} value={faction}>{faction}</option>
                ))}
            </select>
            <select value={selectedCharacter} onChange={(e) => setSelectedCharacter(e.target.value)}>
                <option value="">Sélectionner un héros</option>
                {filteredCharacters.map((character, index) => (
                    <option key={index} value={character.personnage}>{character.personnage} ({character.points}pts)</option>
                ))}
            </select>
            <button className='btn-add' onClick={handleAddCharacter}>Ajouter</button>
            {selectedCharacters.map((character, index) => (
                <div key={index} className='card'>
                    <JeuCard selectedCharacter={character} updateCharacter={updateCharacter} index={index} />
                    <button className='btnsuppr' onClick={() => handleRemoveCharacter(index)}>Supprimer</button>
                </div>
            ))}
        </div>
    );
}

export default Jeu;
