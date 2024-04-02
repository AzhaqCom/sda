import React, { useState, useEffect } from 'react';
import PersoData from '../../perso.json';

function JeuCard() {
    const [personnages, setPersonnages] = useState([]);

    useEffect(() => {
        setPersonnages(PersoData);
    }, []);

    const handleChangeCapacite = (personnageIndex, capacite, operation) => {
        setPersonnages(prevPersonnages => {
            const updatedPersonnages = [...prevPersonnages];
            const updatedCapacites = { ...updatedPersonnages[personnageIndex].capacites };
            
            // Met à jour la valeur de la capacité selon l'opération
            updatedCapacites[capacite] = operation === 'increase' ? updatedCapacites[capacite] + 1 : updatedCapacites[capacite] - 1;

            // Met à jour la liste des personnages avec la capacité mise à jour
            updatedPersonnages[personnageIndex] = {
                ...updatedPersonnages[personnageIndex],
                capacites: updatedCapacites
            };

            return updatedPersonnages;
        });
    };

    return (
        <div className='container'>
            {personnages.map((personnage, index) => (
                <div key={index}>
                    <h2>Nom du personnage : {personnage.personnage}</h2>
                    <table>
                        <tbody>
                            <tr>
                                {Object.keys(personnage.caracteristiques).map(key => (
                                    <td key={key}>{key}</td>
                                ))}
                            </tr>
                            <tr>
                                {Object.values(personnage.caracteristiques).map(value => (
                                    <td key={value}>{value}</td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                    <h3>Capacités</h3>
                    <table>
                        <tbody>
                            {Object.entries(personnage.capacites).map(([capacite, value]) => (
                                <tr key={capacite}>
                                    <td>{capacite}</td>
                                    <td>
                                        <button onClick={() => handleChangeCapacite(index, capacite, 'decrease')}>-</button>
                                        {value}
                                        <button onClick={() => handleChangeCapacite(index, capacite, 'increase')}>+</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
}

export default JeuCard;
