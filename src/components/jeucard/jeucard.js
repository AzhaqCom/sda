import React, { useEffect, useState } from 'react';
import PersoData from '../../perso.json';
import './jeucard.css';
import Modal from '../modal/modal';
import Option from '../option/option';

function JeuCard({ selectedCharacter }) {
    const [personnage, setPersonnage] = useState(null);
    const [defaultPersonnage, setDefaultPersonnage] = useState(null);

    useEffect(() => {
        const foundCharacter = PersoData.find(character => character.personnage === selectedCharacter);
        setPersonnage(foundCharacter);
        setDefaultPersonnage(foundCharacter);
    }, [selectedCharacter]);

    const handleChangeCapacite = (capacite, operation) => {
        setPersonnage(prevPersonnage => {
            const updatedCapacites = { ...prevPersonnage.capacites };

            // Met à jour la valeur de la capacité selon l'opération
            updatedCapacites[capacite] = operation === 'increase' ? updatedCapacites[capacite] + 1 : updatedCapacites[capacite] - 1;

            return {
                ...prevPersonnage,
                capacites: updatedCapacites
            };
        });
    };

    const handleChangeOption = (optionName, isChecked) => {
        if (isChecked) {
            // Logique pour modifier les caractéristiques du personnage en fonction de l'option sélectionnée
            const option = personnage.options.find(option => option.nom === optionName);

            if (option) {
                const { action, valeur } = option;

                if (action.caracteristique === 'M') {
                    // Logique pour modifier la vitesse de la monture
                    setPersonnage(prevPersonnage => ({
                        ...prevPersonnage,
                        caracteristiques: {
                            ...prevPersonnage.caracteristiques,
                            [action.caracteristique]: action.valeur
                        },
                        points: parseInt(prevPersonnage.points) + valeur
                    }));
                } else if (action.caracteristique === 'D') {
                    // Logique pour augmenter la défense de 1
                    setPersonnage(prevPersonnage => ({
                        ...prevPersonnage,
                        caracteristiques: {
                            ...prevPersonnage.caracteristiques,
                            [action.caracteristique]: prevPersonnage.caracteristiques[action.caracteristique] + action.valeur
                        },
                        points: parseInt(prevPersonnage.points) + valeur
                    }));
                } else if (action.effet === 'regles') {
                    // Logique pour les règles spéciales
                    setPersonnage(prevPersonnage => {
                        // Utilisez prevPersonnage à l'intérieur de cette fonction de rappel
                        const updatedRegles = [...prevPersonnage.regles, option.nom];
                        let updatedCaracteristiques = { ...prevPersonnage.caracteristiques };
                        let updatedPoints = parseInt(prevPersonnage.points) + valeur;

                        if (option.nom === 'Bannière de Minas Tirith') {
                            const updatedC = prevPersonnage.caracteristiques['C'];
                            const newC = updatedC.split('/')[0];
                            const newCValue = parseInt(newC) + 1;
                            const newCStr = newCValue + '/4+';
                            updatedCaracteristiques = {
                                ...prevPersonnage.caracteristiques,
                                ['C']: newCStr
                            };
                        }

                        return {
                            ...prevPersonnage,
                            regles: updatedRegles,
                            caracteristiques: updatedCaracteristiques,
                            points: updatedPoints
                        };
                    });
                }
            }
        } else {
            // Logique pour annuler les effets de l'option décochée
            const option = personnage.options.find(option => option.nom === optionName);

            if (option) {
                const { action, valeur } = option;

                if (action.caracteristique === 'M') {
                    // Logique pour annuler les effets sur la monture
                    setPersonnage(prevPersonnage => ({
                        ...prevPersonnage,
                        caracteristiques: {
                            ...prevPersonnage.caracteristiques,
                            [action.caracteristique]: 6 // Remettre la vitesse de la monture à 0 ou à sa valeur par défaut
                        },
                        points: parseInt(prevPersonnage.points) - valeur
                    }));
                } else if (action.caracteristique === 'D') {
                    // Logique pour réduire la défense de 1
                    setPersonnage(prevPersonnage => ({
                        ...prevPersonnage,
                        caracteristiques: {
                            ...prevPersonnage.caracteristiques,
                            [action.caracteristique]: prevPersonnage.caracteristiques[action.caracteristique] - action.valeur
                        },
                        points: parseInt(prevPersonnage.points) - valeur
                    }));
                } else if (action.effet === 'regles') {
                    // Logique pour les règles spéciales
                    setPersonnage(prevPersonnage => {
                        // Utilisez prevPersonnage à l'intérieur de cette fonction de rappel
                      
                        let updatedCaracteristiques = { ...prevPersonnage.caracteristiques };
                        let updatedPoints = parseInt(prevPersonnage.points) - valeur;

                        if (option.nom === 'Bannière de Minas Tirith') {
                            const updatedC = prevPersonnage.caracteristiques['C'];
                            const newC = updatedC.split('/')[0];
                            const newCValue = parseInt(newC) - 1;
                            const newCStr = newCValue + '/4+';
                            updatedCaracteristiques = {
                                ...prevPersonnage.caracteristiques,
                                ['C']: newCStr
                            };
                        }

                        return {
                            ...prevPersonnage,
                            regles: prevPersonnage.regles.filter(rule => rule !== option.nom),
                            caracteristiques: updatedCaracteristiques,
                            points: updatedPoints
                        };
                    });
                }
            }
        }
    };


    if (!personnage) {
        return null;
    }

    return (
        <div className='card-content'>
            <h2 className='name-perso'>{personnage.personnage} <span className='point-perso'>{personnage.points}pts</span></h2>
            <table>
                <tbody>
                    <tr>
                        {Object.entries(personnage.caracteristiques).map(([key, value]) => (
                            <td key={`${key}-${value}`}>{key}</td>
                        ))}
                    </tr>
                    <tr>
                        {Object.entries(personnage.caracteristiques).map(([key, value]) => (
                            <td key={`${key}-${value}`}>{value}</td>
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
                                <button onClick={() => handleChangeCapacite(capacite, 'decrease')}>-</button>
                                {value}
                                <button onClick={() => handleChangeCapacite(capacite, 'increase')}>+</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {personnage.servants && personnage.servants.length > 0 && (
                <>
                    <h3>Servants</h3>
                    {personnage.servants.map((servant, index) => (
                        <div key={index} className='servant'>
                            <h5>{servant.personnage}</h5>
                            <table>
                                <tbody>
                                    <tr>
                                        {Object.entries(servant.caracteristiques).map(([key, value]) => (
                                            <td key={`${key}-${value}`}>{key}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        {Object.entries(servant.caracteristiques).map(([key, value]) => (
                                            <td key={`${key}-${value}`}>{value}</td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                            <table>
                                <tbody>
                                    {Object.entries(servant.capacites).map(([capacite, value]) => (
                                        <tr key={capacite}>
                                            <td>{capacite}</td>
                                            <td>
                                                <button onClick={() => handleChangeCapacite(capacite, 'decrease')}>-</button>
                                                {value}
                                                <button onClick={() => handleChangeCapacite(capacite, 'increase')}>+</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </>
            )}

            {personnage.regles && personnage.regles.length > 0 && (
                <>
                    <h3>Règles spéciales</h3>
                    <div className='regle-perso'>
                        {personnage.regles.map((rule, index) => (<Modal key={rule} ruleName={rule} />))}
                    </div>
                </>
            )}

            {personnage.actions && personnage.actions.length > 0 && (
                <>
                    <h3>Actions Héroïques</h3>
                    <div className='action-perso'>
                        {personnage.actions.map((action, index) => (<Modal key={action} ruleName={action} />))}
                    </div>
                </>
            )}

            {personnage.options && personnage.options.length > 0 && (
                <>
                    <h3>Options</h3>
                    {personnage.options.map((option, index) => (
                        <Option key={option.nom} optionName={option.nom} optionValue={option.valeur} onChange={handleChangeOption} />
                    ))}
                </>
            )}


        </div>
    );
}

export default JeuCard;
