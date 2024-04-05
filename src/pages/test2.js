import React, { useState, useEffect } from 'react';
import TestCard2 from './testcard2';
import PersoData from '../test.json';

function Test2() {
    const [selectedCharacter, setSelectedCharacter] = useState('');
    const [selectedCharactersData, setSelectedCharactersData] = useState({});

    const updateCharacterCapacities = (character, capacity, value) => {
        setSelectedCharactersData((prevData) => ({
            ...prevData,
            [character]: {
                ...prevData[character],
                capacites: {
                    ...prevData[character]?.capacites,
                    [capacity]: (prevData[character]?.capacites?.[capacity] || 0) + value,
                },
            },
        }));
    };
    const updatePoints =(character,points, value)=>{
         setSelectedCharactersData((prevData) => ({
            ...prevData,
            [character]: {
                ...prevData[character],
                points: value
            },
        }));
    }
    const updateCharacterCharacteristics = (character, characteristic, value) => {
        setSelectedCharactersData((prevData) => ({
            ...prevData,
            [character]: {
                ...prevData[character],
                caracteristiques: {
                    ...prevData[character]?.caracteristiques,
                    [characteristic]: value,
                },
            },
        }));
    };

    useEffect(() => {
        const storedData = localStorage.getItem('selectedCharactersData');
        if (storedData) {
            setSelectedCharactersData(JSON.parse(storedData));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('selectedCharactersData', JSON.stringify(selectedCharactersData));
    }, [selectedCharactersData]);

    const handleSelectChange = (event) => {
        setSelectedCharacter(event.target.value);
    };

    const handleAddCharacter = () => {
        if (selectedCharacter && !selectedCharactersData[selectedCharacter]) {
            setSelectedCharactersData((prevData) => ({
                ...prevData,
                [selectedCharacter]: PersoData.find((character) => character.personnage === selectedCharacter),
            }));
        }
    };

    const handleRemoveCharacter = (characterName) => {
        // Créez une copie de l'objet selectedCharactersData
        const updatedCharactersData = { ...selectedCharactersData };
        // Supprimez le personnage avec le nom spécifié de la copie
        delete updatedCharactersData[characterName];
        // Mettez à jour l'état avec la nouvelle copie
        setSelectedCharactersData(updatedCharactersData);
    };

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
                            <option key={characterIndex} value={character.personnage}>{character.personnage} ({character.points}pts)</option>
                        ))}
                    </optgroup>
                ))}
            </select>
            <button className='btn-add' onClick={handleAddCharacter}>Ajouter</button>

            {Object.entries(selectedCharactersData).map(([character, data]) => (
                <div key={character} className='card'>
                    <TestCard2
                        key={character}
                        personnage={character}
                        characterData={data}
                        onUpdateCapacities={updateCharacterCapacities}
                        onUpdateCarac={updateCharacterCharacteristics}
                        onUpdatePoints={updatePoints}
                        
                    />
                    <button className='btnsuppr' onClick={() => handleRemoveCharacter(character)}>Supprimer</button>
                </div>
            ))}
        </div>
    );
}

export default Test2;
