const changeOption = (personnage, optionName, isChecked, setPersonnage) => {
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
                    points: parseInt(prevPersonnage.points) + valeur,
                    capacites: {
                        ...prevPersonnage.capacites,
                        PvMonture: 1
                    }
                }));
            } else if (action.caracteristique === 'D') {
                // Logique pour augmenter la défense de 1
                if (option.nom === 'Armure Lourde' && personnage.equipements !== undefined && !personnage.equipements.length > 0) {
                    setPersonnage(prevPersonnage => ({
                        ...prevPersonnage,
                        caracteristiques: {
                            ...prevPersonnage.caracteristiques,
                            [action.caracteristique]: prevPersonnage.caracteristiques[action.caracteristique] + 2
                        },
                        points: parseInt(prevPersonnage.points) + valeur
                    }));
                } else {
                    setPersonnage(prevPersonnage => ({
                        ...prevPersonnage,
                        caracteristiques: {
                            ...prevPersonnage.caracteristiques,
                            [action.caracteristique]: prevPersonnage.caracteristiques[action.caracteristique] + action.valeur
                        },
                        points: parseInt(prevPersonnage.points) + valeur
                    }));
                }

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
                            C: newCStr
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
            // Autres conditions ici ...
        }
    } else {
        // Logique pour annuler les effets de l'option décochée
        // Logique pour annuler les effets de l'option décochée
        const option = personnage.options.find(option => option.nom === optionName);

        if (option) {
            const { action, valeur } = option;

            if (action.caracteristique === 'M') {
                // Logique pour annuler les effets sur la monture
                setPersonnage(prevPersonnage => {
                    // Supprimer la capacité PvMonture
                    const { PvMonture, ...updatedCapacites } = prevPersonnage.capacites;

                    return {
                        ...prevPersonnage,
                        caracteristiques: {
                            ...prevPersonnage.caracteristiques,
                            [action.caracteristique]: 6
                        },
                        points: parseInt(prevPersonnage.points) - valeur,
                        capacites: updatedCapacites
                    };
                });
            } else if (action.caracteristique === 'D') {
                // Logique pour réduire la défense de 1
                if (option.nom === 'Armure Lourde' && personnage.equipements !== undefined && !personnage.equipements.length > 0) {
                    setPersonnage(prevPersonnage => ({
                        ...prevPersonnage,
                        caracteristiques: {
                            ...prevPersonnage.caracteristiques,
                            [action.caracteristique]: prevPersonnage.caracteristiques[action.caracteristique] - 2
                        },
                        points: parseInt(prevPersonnage.points) - valeur
                    }));
                } else {
                    setPersonnage(prevPersonnage => ({
                        ...prevPersonnage,
                        caracteristiques: {
                            ...prevPersonnage.caracteristiques,
                            [action.caracteristique]: prevPersonnage.caracteristiques[action.caracteristique] - action.valeur
                        },
                        points: parseInt(prevPersonnage.points) - valeur
                    }));
                }

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
                            C: newCStr
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
            // Autres conditions ici ...
        }
    }
};

export default changeOption;
