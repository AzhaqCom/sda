import React, { useEffect, useState } from 'react';
import '../components/jeucard/jeucard.css';
import Modal from '../components/modal/modal';
import Option from '../components/option/option';
import Modalpower from '../components/modalpower/modalpower';


function TestCard2({ personnage, onUpdateCapacities, characterData, onUpdateCarac, onUpdatePoints }) {
    const [mainCharacterCapacities, setMainCharacterCapacities] = useState(characterData.capacites);
    const [servantsCapacities, setServantsCapacities] = useState({});
    const [initialPoint, setInitialPoint] = useState(characterData.points);
    useEffect(() => {
        setMainCharacterCapacities(characterData.capacites);
    }, [characterData.capacites]);
    useEffect(() => {
        setInitialPoint(characterData.points);
    }, [characterData.points]);
    
    useEffect(() => {
        if (characterData.servants) {
            const initialServantsCapacities = {};
            characterData.servants.forEach(servant => {
                initialServantsCapacities[servant.personnage] = servant.capacites;
            });
            setServantsCapacities(initialServantsCapacities);
        }
    }, [characterData.servants]); // Ne pas inclure servantsCapacities comme dépendance


    const handleChangeCapacity = (isMainCharacter, characterName, capacity, value) => {
        if (isMainCharacter) {
            const updatedCapacites = { ...mainCharacterCapacities, [capacity]: mainCharacterCapacities[capacity] + value };
            setMainCharacterCapacities(updatedCapacites);
            onUpdateCapacities(personnage, capacity, value);
            localStorage.setItem(personnage, JSON.stringify(updatedCapacites));
        } else {
            const updatedServantsCapacities = {
                ...servantsCapacities,
                [characterName]: {
                    ...servantsCapacities[characterName],
                    [capacity]: servantsCapacities[characterName][capacity] + value
                }
            };
            setServantsCapacities(updatedServantsCapacities);

            // Mettre à jour le local storage pour les capacités des serviteurs
            const updatedSelectedCharactersData = {
                ...characterData,
                [personnage]: {
                    ...characterData[personnage],
                    servants: characterData.servants.map(servant => ({
                        ...servant,
                        capacites: servant.personnage === characterName ? updatedServantsCapacities[characterName] : servant.capacites
                    }))
                }
            };
            localStorage.setItem('selectedCharactersData', JSON.stringify(updatedSelectedCharactersData));
        }
    };
    const handleChangeOption = (optionName, isChecked) => {
        localStorage.setItem(`${personnage}-${optionName}`, isChecked);
        if (isChecked) {
            // Logique pour modifier les caractéristiques du personnage en fonction de l'option sélectionnée
            const option = characterData.options.find(option => option.nom === optionName);

            if (option) {
                const { action, valeur } = option;

                if (action.caracteristique === 'M') {
                    // Mettre à jour la caractéristique M du personnage
                    onUpdateCarac(personnage, 'M', action.valeur);
                    onUpdatePoints(personnage, "points", parseInt(characterData.points) + parseInt(valeur));
                }
            }
        } else {
            // Gérer le cas où l'option est décochée (si nécessaire)
            // Par exemple, réinitialiser la caractéristique M à sa valeur d'origine
            onUpdateCarac(personnage, 'M', 6);
            onUpdatePoints(personnage, "points", initialPoint );

        }
    };


    return (
        <div className='card-content'>
            <h2 className='name-perso'>{personnage} <span className='point-perso'>{characterData.points}pts</span></h2>
            <table>
                <tbody>
                    <tr>
                        {Object.entries(characterData.caracteristiques).map(([key, value]) => (
                            <td key={`${key}-${value}`}>{key}</td>
                        ))}
                    </tr>
                    <tr>
                        {Object.entries(characterData.caracteristiques).map(([key, value]) => (
                            <td key={`${key}-${value}`}>{value}</td>
                        ))}
                    </tr>
                </tbody>
            </table>
            <h3>Capacités</h3>
            <table>
                <tbody>
                    {Object.entries(mainCharacterCapacities).map(([key, value]) => (
                        <tr key={key}>
                            <td>{key}</td>
                            <td>
                                <button className='btnmod' onClick={() => handleChangeCapacity(true, personnage, key, -1)}>-</button>
                                <b>{value}</b>
                                <button className='btnmod' onClick={() => handleChangeCapacity(true, personnage, key, 1)}>+</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {characterData.options && characterData.options.length > 0 && (
                <>
                    <h3>Options</h3>
                    {characterData.options.map((option, index) => (
                        <Option key={option.nom} optionName={option.nom} optionValue={option.valeur} onChange={handleChangeOption} />
                    ))}
                </>
            )}
            {characterData.servants && characterData.servants.length > 0 && (
                <>
                    <h3>Servants</h3>
                    <div className='container-servant'>
                        {characterData.servants.map((servant, index) => (
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
                                        {servant.capacites && Object.entries(servant.capacites).map(([capacite, value]) => (
                                            <tr key={capacite}>
                                                <td>{capacite}</td>
                                                <td>
                                                    <button onClick={() => handleChangeCapacity(false, servant.personnage, capacite, -1)}>-</button>
                                                    {value}
                                                    <button onClick={() => handleChangeCapacity(false, servant.personnage, capacite, 1)}>+</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </div>
                </>
            )}
            <div className='grid2'>
                {characterData.regles && characterData.regles.length > 0 && (
                    <div className='regle-spe-perso'>
                        <h3>Règles spéciales</h3>
                        <div className='regle-perso'>
                            {characterData.regles.map((rule, index) => (<Modal key={rule} ruleName={rule} />))}
                        </div>
                    </div>
                )}
                {characterData.actions && characterData.actions.length > 0 && (
                    <div className='action-hero-perso'>
                        <h3>Actions Héroïques</h3>
                        <div className='action-perso'>
                            {characterData.actions.map((action, index) => (<Modal key={action} ruleName={action} />))}
                        </div>
                    </div>
                )}
            </div>
            {characterData.pouvoirsMagiques && characterData.pouvoirsMagiques.length > 0 && (
                <div className='pouvoir-hero-perso'>
                    <h3>Pouvoirs Magiques</h3>
                    <div className='action-perso'>
                        {characterData.pouvoirsMagiques.map((pouvoir, index) => (<Modalpower key={pouvoir.nom} powerName={pouvoir.nom} powerLancement={pouvoir.valeur} />))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default TestCard2;
