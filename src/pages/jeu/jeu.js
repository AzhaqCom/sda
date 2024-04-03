import React, { useState } from 'react';
import JeuCard from '../../components/jeucard/jeucard';
import PersoData from '../../perso.json';

function Jeu() {
    const [selectedCharacters, setSelectedCharacters] = useState([]);
    const [selectedCharacter, setSelectedCharacter] = useState('');

    const handleSelectChange = (event) => {
        setSelectedCharacter(event.target.value);
    };

    const handleAddCharacter = () => {
        if (selectedCharacter) {
            setSelectedCharacters(prevSelectedCharacters => {
                if (!prevSelectedCharacters.includes(selectedCharacter)) {
                    return [...prevSelectedCharacters, selectedCharacter];
                }
                return prevSelectedCharacters;
            });
            setSelectedCharacter('');
        }
    };

    const handleRemoveCharacter = (characterName) => {
        setSelectedCharacters(prevSelectedCharacters => {
            return prevSelectedCharacters.filter(name => name !== characterName);
        });
    };

    // Regrouper les personnages par faction
    const groupedCharacters = PersoData.reduce((acc, character) => {
        acc[character.faction] = acc[character.faction] || [];
        acc[character.faction].push(character);
        return acc;
    }, {});

    return (
        <div className='container'>
            <select value={selectedCharacter} onChange={handleSelectChange}>
                <option value="">Sélectionner un personnage</option>
                {Object.keys(groupedCharacters).map((faction, index) => (
                    <optgroup key={index} label={faction}>
                        {groupedCharacters[faction].map((character, characterIndex) => (
                            <option key={characterIndex} value={character.personnage}>{character.personnage}</option>
                        ))}
                    </optgroup>
                ))}
            </select>
            <button className='btn-add' onClick={handleAddCharacter}>Ajouter</button>
            {selectedCharacters.map((character, index) => (
                <div key={index} className='card'>
                    <JeuCard selectedCharacter={character} />
                    <button onClick={() => handleRemoveCharacter(character)}>Supprimer</button>
                </div>
            ))}
        </div>
    );
}

export default Jeu;
