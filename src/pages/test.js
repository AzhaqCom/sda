import React, { useState, useEffect } from 'react';
import TestCard from './testcard';
import PersoData from '../test.json';

function Test() {
  const [selectedCharacter, setSelectedCharacter] = useState('');
  const [selectedCharactersData, setSelectedCharactersData] = useState({});

  const updateCharacterCapacities = (character, capacity, value) => {
    setSelectedCharactersData((prevData) => ({
      ...prevData,
      [character]: {
        ...prevData[character],
        capacites: {
          ...prevData[character]?.capacites, // Utiliser l'opérateur optionnel pour éviter les erreurs si capacites n'existe pas
          [capacity]: (prevData[character]?.capacites?.[capacity] || 0) + value, // Utiliser l'opérateur optionnel pour éviter les erreurs si capacity n'existe pas
        },
      },
    }));
  };

  useEffect(() => {
    const storedCharactersData = localStorage.getItem('selectedCharactersData');
    if (storedCharactersData) {
      setSelectedCharactersData(JSON.parse(storedCharactersData));
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

  return (
    <div>
      <select value={selectedCharacter} onChange={handleSelectChange}>
        <option value="">Sélectionner un personnage</option>
        {PersoData.map((character) => (
          <option key={character.personnage} value={character.personnage}>{character.personnage}</option>
        ))}
      </select>
      <button onClick={handleAddCharacter}>Ajouter</button>
      <div>
        {Object.entries(selectedCharactersData).map(([character, data]) => (
          <TestCard
            key={character}
            personnage={character}
            characterData={data}
            onUpdateCapacities={updateCharacterCapacities}
          />
        ))}
      </div>
    </div>
  );
}

export default Test;
