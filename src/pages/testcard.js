import React, { useState, useEffect } from 'react';

function TestCard({ personnage, onUpdateCapacities, characterData }) {
  const [localCapacites, setLocalCapacites] = useState(characterData.capacites);

  useEffect(() => {
    setLocalCapacites(characterData.capacites);
  }, [characterData.capacites]);

  const handleChangeCapacity = (capacity, value) => {
    const updatedCapacites = { ...localCapacites, [capacity]: localCapacites[capacity] + value };
    setLocalCapacites(updatedCapacites);
    onUpdateCapacities(personnage, capacity, value);
    localStorage.setItem(personnage, JSON.stringify(updatedCapacites));
  };

  return (
    <div>
      <h2>{personnage}</h2>
      <p>Points : {characterData.points}</p>
      <p>Caractéristiques :</p>
      <ul>
        {Object.entries(characterData.caracteristiques).map(([key, value]) => (
          <li key={key}>{key}: {value}</li>
        ))}
      </ul>
      <p>Capacités :</p>
      <table>
        <thead>
          <tr>
            <th>Capacité</th>
            <th>Valeur</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(localCapacites).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>
                <input type="number" value={value} readOnly />
              </td>
              <td>
                <button onClick={() => handleChangeCapacity(key, 1)}>+</button>
                <button onClick={() => handleChangeCapacity(key, -1)}>-</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Actions :</p>
      <ul>
        {characterData.actions.map((action, index) => (
          <li key={index}>{action}</li>
        ))}
      </ul>
      <p>Options :</p>
      <ul>
        {characterData.options.map((option, index) => (
          <li key={index}>{option.nom}: {option.valeur}</li>
        ))}
      </ul>
      <p>Règles :</p>
      <ul>
        {characterData.regles.map((regle, index) => (
          <li key={index}>{regle}</li>
        ))}
      </ul>
      <p>Pouvoirs Magiques :</p>
      <ul>
        {characterData.pouvoirsMagiques && (characterData.pouvoirsMagiques.map((pouvoir, index) => (
          <li key={index}>{pouvoir.nom}: {pouvoir.valeur}</li>
        )))}
      </ul>
    </div>
  );
}

export default TestCard;
