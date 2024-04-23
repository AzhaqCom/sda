import React, { useState, useEffect } from 'react';
import JeuCard from '../../components/jeucard/jeucard';
import PersoData from '../../perso.json';
import FigData from '../../fig.json';

function Jeu() {
    const [selectedCharacters, setSelectedCharacters] = useState(() => {
        const storedCharacters = localStorage.getItem('selectedCharacters');
        return storedCharacters ? JSON.parse(storedCharacters) : [];
    });
    const [selectedCharacter, setSelectedCharacter] = useState('');

    const [selectedFactions, setSelectedFactions] = useState(() => {
        const storedFactions = localStorage.getItem('selectedFactions');
        return storedFactions ? JSON.parse(storedFactions) : [];
    });
    const [selectedAllegiance, setSelectedAllegiance] = useState(() => {
        const storedAllegiance = localStorage.getItem('selectedAllegiance');
        return storedAllegiance ? storedAllegiance : '';
    });
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
    useEffect(() => {
        localStorage.setItem('selectedFactions', JSON.stringify(selectedFactions));
    }, [selectedFactions]);

    useEffect(() => {
        localStorage.setItem('selectedAllegiance', selectedAllegiance);
    }, [selectedAllegiance]);
    // Fusionner les données de PersoData et FigData et ajout d'un type
    const combinedData = [...PersoData.map(character => ({ ...character, type: 'Héros' })), ...FigData.map(figure => ({ ...figure, type: 'Figurine' }))];


    // Regrouper les données fusionnées par faction
    const groupedData = groupDataByFaction(combinedData);


    // Fonction utilitaire pour regrouper les données par faction
    function groupDataByFaction(dataList) {
        return dataList.reduce((acc, item) => {
            const faction = item.faction;
            if (!acc[faction]) {
                acc[faction] = [];
            }
            acc[faction].push(item);
            return acc;
        }, {});
    }
    const handleSelectChange = (event) => {
        setSelectedCharacter('');
        const selectedFactions = Array.from(event.target.selectedOptions, option => option.value);
        setSelectedFactions(selectedFactions);
    };
    const handleAddCharacter = () => {

        if (selectedCharacter) {
            const selectedCharacterObj = filteredCharacters.find(character => {
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
    };


    // Récupérer toutes les factions distinctes
    const allFactions = Object.keys(groupedCharacters);


    // Filtrer les factions par allégeance sélectionnée
    const filteredFactions = allFactions.filter(faction => {
        const factionAllegiance = groupedCharacters[faction][0].allegence;
        return selectedAllegiance === '' || factionAllegiance === selectedAllegiance;
    }).sort();

    // Filtrer les personnages par factions sélectionnées
    // Filtrer les personnages par factions sélectionnées
    const filteredCharacters = Object.values(groupedData).flatMap(characters => {
        return characters.filter(character => {
            return selectedFactions.includes(character.faction) ||
                selectedFactions.includes(`LL-${character.allegence}`);
        });
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
            <select multiple size={5} value={selectedFactions} onChange={handleSelectChange}>
                {filteredFactions.map((faction, index) => (
                    <option key={index} value={faction}>{faction}</option>
                ))}
            </select>
            <select value={selectedCharacter} onChange={(e) => setSelectedCharacter(e.target.value)}>
                <option value="">Sélectionner une figurine</option>
                {selectedFactions.map((faction, index) => (
                    <React.Fragment key={`optgroup_${index}`}>
                        <optgroup label={`Héros ${faction}`}>
                            {groupedData[faction].filter(item => item.type === 'Héros').sort((a, b) => a.personnage.localeCompare(b.personnage)).map((character, idx) => (
                                <option key={`character_${idx}`} value={character.personnage}>{character.personnage} ({character.points}pts)</option>
                            ))}
                        </optgroup>
                        {groupedData[faction].some(item => item.type === 'Figurine') && (
                            <optgroup label={`Figurine ${faction}`}>
                                {groupedData[faction].filter(item => item.type === 'Figurine').map((figure, idx) => (
                                    <option key={`figure_${idx}`} value={figure.personnage}>{figure.personnage} ({figure.points}pts)</option>
                                ))}
                            </optgroup>
                        )}
                    </React.Fragment>
                ))}
            </select>

            <button className='btn-add' onClick={handleAddCharacter}>Ajouter</button>
            <div className='container-card'>
                {
                    selectedCharacters.map((character, index) => (
                        <div key={index} className='card'>
                            <JeuCard selectedCharacter={character} updateCharacter={updateCharacter} index={index} />
                            <button className='btnsuppr' onClick={() => handleRemoveCharacter(index)}>Supprimer</button>
                        </div>
                    ))
                }
            </div>
        </div >
    );
}

export default Jeu;