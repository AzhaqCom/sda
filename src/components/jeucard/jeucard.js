import React from 'react';
import './jeucard.css';
import Modal from '../modal/modal';
import Option from '../option/option';
import Modalpower from '../modalpower/modalpower';

function JeuCard({ selectedCharacter, updateCharacter, index }) {

    const handleChangeCapacite = (capacite, operation) => {
        const updatedCapacites = { ...selectedCharacter.capacites };

        // Vérifie si l'opération est une augmentation ou une diminution
        if (operation === 'increase') {
            updatedCapacites[capacite] = selectedCharacter.capacites[capacite] + 1;
        } else if (operation === 'decrease') {
            // Vérifie si la valeur actuelle est supérieure à zéro avant de la diminuer
            if (selectedCharacter.capacites[capacite] > 0) {
                updatedCapacites[capacite] = selectedCharacter.capacites[capacite] - 1;
            }
        }

        // Crée une nouvelle copie du personnage avec les capacités mises à jour
        const updatedCharacter = {
            ...selectedCharacter,
            capacites: updatedCapacites
        };
        updateCharacter(index, updatedCharacter);
    };

    const handleChangeCapaciteServant = (servantIndex, capacite, operation) => {
        // Assurez-vous que l'index du servant est valide
        if (servantIndex >= 0 && servantIndex < selectedCharacter.servants.length) {
            // Faites une copie du servant que vous voulez mettre à jour
            const updatedServant = { ...selectedCharacter.servants[servantIndex] };

            // Faites une copie des capacités du servant
            const updatedCapacites = { ...updatedServant.capacites };

            // Met à jour la valeur de la capacité selon l'opération
            updatedCapacites[capacite] = operation === 'increase' ? updatedCapacites[capacite] + 1 : updatedCapacites[capacite] - 1;

            // Met à jour les capacités du servant dans la copie
            updatedServant.capacites = updatedCapacites;

            // Faites une copie du personnage avec le servant mis à jour
            const updatedCharacter = {
                ...selectedCharacter,
                servants: [
                    ...selectedCharacter.servants.slice(0, servantIndex), // Avant le servant mis à jour
                    updatedServant, // Servant mis à jour
                    ...selectedCharacter.servants.slice(servantIndex + 1), // Après le servant mis à jour
                ],
            };

            // Appelez la fonction de mise à jour du personnage fournie par le parent
            updateCharacter(index, updatedCharacter);
        }
    };

    const handleChangeOption = (optionName, isChecked, index, uniqueId) => {
        if (isChecked) {
            const option = selectedCharacter.options.find(option => option.nom === optionName);

            if (option) {
                const { action, valeur } = option;
                option.isChecked = true;
                if (action.caracteristique === 'M') {
                    // Logique pour modifier la vitesse de la monture
                    const updatedCaracteristiques = {
                        ...selectedCharacter.caracteristiques,
                        [action.caracteristique]: action.valeur
                    };
                    const updatedPoints = parseInt(selectedCharacter.points) + valeur;
                    let newServant = {}
                    if (option.nom === 'Cheval') {
                        newServant = {

                            personnage: "Cheval",
                            caracteristiques: {
                                M: 10,
                                C: "3/6+",
                                F: 3,
                                D: 4,
                                A: 0,
                                B: 2
                            },
                            capacites: {
                                "Points de vie": 1
                            }

                        };
                    }else if (option.nom ==='Cheval Caparaçonné'){
                        newServant = {

                            personnage: "Cheval Caparaçonné",
                            caracteristiques: {
                                M: 10,
                                C: "3/6+",
                                F: 3,
                                D: 5,
                                A: 0,
                                B: 2
                            },
                            capacites: {
                                "Points de vie": 1
                            }

                        };
                    }

                    // Crée une nouvelle copie du personnage avec les caractéristiques et les points mis à jour
                    const updatedCharacter = {
                        ...selectedCharacter,
                        caracteristiques: updatedCaracteristiques,
                        points: updatedPoints,
                        servants: [newServant]

                    };

                    // Appelle la fonction de mise à jour du personnage fournie par le parent
                    updateCharacter(index, updatedCharacter);
                } else if (action.caracteristique === 'D') {
                    // Logique pour augmenter ou diminuer la défense
                    let updatedCaracteristiques = {
                        ...selectedCharacter.caracteristiques,
                        [action.caracteristique]: selectedCharacter.caracteristiques[action.caracteristique] + action.valeur
                    };



                    const updatedPoints = parseInt(selectedCharacter.points) + valeur;

                    // Crée une nouvelle copie du personnage avec les caractéristiques et les points mis à jour
                    const updatedCharacter = {
                        ...selectedCharacter,
                        caracteristiques: updatedCaracteristiques,
                        points: updatedPoints
                    };

                    // Appelle la fonction de mise à jour du personnage fournie par le parent
                    updateCharacter(index, updatedCharacter);
                } else if (action.caracteristique === 'B') {
                    // Logique pour augmenter ou diminuer la défense
                    let updatedCaracteristiques = {
                        ...selectedCharacter.caracteristiques,
                        [action.caracteristique]: selectedCharacter.caracteristiques[action.caracteristique] + action.valeur
                    };



                    const updatedPoints = parseInt(selectedCharacter.points) + valeur;

                    // Crée une nouvelle copie du personnage avec les caractéristiques et les points mis à jour
                    const updatedCharacter = {
                        ...selectedCharacter,
                        caracteristiques: updatedCaracteristiques,
                        points: updatedPoints
                    };

                    // Appelle la fonction de mise à jour du personnage fournie par le parent
                    updateCharacter(index, updatedCharacter);
                } else if (action.caracteristique === 'F') {
                    // Logique pour augmenter ou diminuer la défense
                    let updatedCaracteristiques = {
                        ...selectedCharacter.caracteristiques,
                        [action.caracteristique]: selectedCharacter.caracteristiques[action.caracteristique] + action.valeur
                    };



                    const updatedPoints = parseInt(selectedCharacter.points) + valeur;

                    // Crée une nouvelle copie du personnage avec les caractéristiques et les points mis à jour
                    const updatedCharacter = {
                        ...selectedCharacter,
                        caracteristiques: updatedCaracteristiques,
                        points: updatedPoints
                    };

                    // Appelle la fonction de mise à jour du personnage fournie par le parent
                    updateCharacter(index, updatedCharacter);
                } else if (action.caracteristique === 'C') {
                    let updatedCaracteristiques = { ...selectedCharacter.caracteristiques };
                    const updatedC = selectedCharacter.caracteristiques['C'];
                    const newC = updatedC.split('/')[0];
                    const newCValue = parseInt(newC) + action.valeur;
                    const newCStr = newCValue + '/' + updatedC.split('/')[1];
                    updatedCaracteristiques = {
                        ...selectedCharacter.caracteristiques,
                        C: newCStr
                    };

                    const updatedPoints = parseInt(selectedCharacter.points) + valeur;

                    // Crée une nouvelle copie du personnage avec les caractéristiques et les points mis à jour
                    const updatedCharacter = {
                        ...selectedCharacter,
                        caracteristiques: updatedCaracteristiques,
                        points: updatedPoints
                    };

                    // Appelle la fonction de mise à jour du personnage fournie par le parent
                    updateCharacter(index, updatedCharacter);
                } else if (action.effet === 'minus') {
                    // Logique pour les règles spéciales
                    let updatedRegles = [...selectedCharacter.regles, option.nom];

                    let updatedPoints = parseInt(selectedCharacter.points) + valeur;
                    let updatedCaracteristiques = {
                        ...selectedCharacter.caracteristiques,
                        ['D']: selectedCharacter.caracteristiques['D'] - 1
                    };



                    // Crée une nouvelle copie du personnage avec les règles spéciales, les caractéristiques et les points mis à jour
                    const updatedCharacter = {
                        ...selectedCharacter,
                        regles: updatedRegles,
                        caracteristiques: updatedCaracteristiques,
                        points: updatedPoints
                    };

                    // Appelle la fonction de mise à jour du personnage fournie par le parent
                    updateCharacter(index, updatedCharacter);
                } else if (action.effet === 'regles') {
                    // Logique pour les règles spéciales
                    let updatedRegles = [...selectedCharacter.regles, option.nom];
                    let updatedCaracteristiques = { ...selectedCharacter.caracteristiques };
                    let updatedPoints = parseInt(selectedCharacter.points) + valeur;

                    // Vérifie si l'option est Bannière de Minas Tirith pour mettre à jour la caractéristique C
                    if (option.nom === 'Bannière de Minas Tirith') {
                        const updatedC = selectedCharacter.caracteristiques['C'];
                        const newC = updatedC.split('/')[0];
                        const newCValue = parseInt(newC) + 1;
                        const newCStr = newCValue + '/4+';
                        updatedCaracteristiques = {
                            ...selectedCharacter.caracteristiques,
                            C: newCStr
                        };
                    }

                    // Crée une nouvelle copie du personnage avec les règles spéciales, les caractéristiques et les points mis à jour
                    const updatedCharacter = {
                        ...selectedCharacter,
                        regles: updatedRegles,
                        caracteristiques: updatedCaracteristiques,
                        points: updatedPoints
                    };

                    // Appelle la fonction de mise à jour du personnage fournie par le parent
                    updateCharacter(index, updatedCharacter);
                } else if (action.effet === 'servant') {
                    // Logique pour les servants
                    let updatedPoints = parseInt(selectedCharacter.points) + valeur;
                    const updatedServants = selectedCharacter.servants.map((servant, index) => {
                        if (index === 0) {
                            // Mettre à jour les caractéristiques du premier servant
                            return {
                                ...servant,
                                caracteristiques: {
                                    ...servant.caracteristiques,
                                    M: 6,
                                    C: "4/4+",
                                    F: 4,
                                    D: 6,
                                    A: 2,
                                    B: 4
                                },
                                capacites: {
                                    ...servant.capacites,
                                    Puissance: 2,
                                    "Points de vie": 2
                                },
                                personnage: 'Capitaine de Minas Tirith'
                            };
                        } else {
                            // Ne rien changer pour les autres servants
                            return servant;
                        }
                    });

                    // Crée une nouvelle copie du personnage avec les servants et les points mis à jour
                    const updatedCharacter = {
                        ...selectedCharacter,
                        servants: updatedServants,
                        points: updatedPoints
                    };

                    // Appelle la fonction de mise à jour du personnage fournie par le parent
                    updateCharacter(index, updatedCharacter);
                } else if (option.action === 'addmiroir') {
                    // Logique pour ajouter le miroir de Galadriel
                    const updatedRegles = [...selectedCharacter.regles, 'Miroir de Galadriel'];
                    const newServant = {
                        personnage: 'Miroir de Galadriel',
                        caracteristiques: {
                            M: '',
                            C: "",
                            F: '',
                            D: 8,
                            A: '',
                            B: ''
                        },
                        capacites: {
                            "Points de vie": 3
                        }
                    };

                    // Crée une nouvelle copie du personnage avec le nouveau servant et les règles spéciales mises à jour
                    const updatedCharacter = {
                        ...selectedCharacter,
                        servants: [newServant],
                        regles: updatedRegles,
                        points: parseInt(selectedCharacter.points) + valeur
                    };

                    // Appelle la fonction de mise à jour du personnage fournie par le parent
                    updateCharacter(index, updatedCharacter);
                } else if (option.action === 'addgripoil') {
                    // Logique pour modifier la vitesse de la monture
                    const updatedCaracteristiques = {
                        ...selectedCharacter.caracteristiques,
                        M: 12
                    };
                    const updatedPoints = parseInt(selectedCharacter.points) + valeur;
                    const updatedCapacites = {
                        ...selectedCharacter.capacites,
                        PvMonture: 1
                    };
                    const newServant = {
                        personnage: 'Gripoil',
                        caracteristiques: {
                            M: '12',
                            C: "",
                            F: 4,
                            D: 5,
                            A: '',
                            B: 5
                        },
                        capacites: {
                            "Volonté": 2,
                            "Destin": 1,
                            "Points de vie": 1
                        }
                    };
                    // Crée une nouvelle copie du personnage avec les caractéristiques et les points mis à jour
                    const updatedCharacter = {
                        ...selectedCharacter,
                        servants: [newServant],
                        caracteristiques: updatedCaracteristiques,
                        points: updatedPoints,
                        capacites: updatedCapacites
                    };

                    // Appelle la fonction de mise à jour du personnage fournie par le parent
                    updateCharacter(index, updatedCharacter);
                } else if (option.action === 'epethranduil') {
                    let updatedCaracteristiques = { ...selectedCharacter.caracteristiques };
                    let updatedPoints = parseInt(selectedCharacter.points) + valeur;
                    let updatedRegles = [...selectedCharacter.regles, 'Fine Lame'];
                    const updatedC = selectedCharacter.caracteristiques['C'];
                    const newC = updatedC.split('/')[0];
                    const newCValue = parseInt(newC) + 1;
                    const newCStr = newCValue + '/2+';
                    updatedCaracteristiques = {
                        ...selectedCharacter.caracteristiques,
                        C: newCStr,
                        A: updatedCaracteristiques['A'] + 1
                    };
                    // Crée une nouvelle copie du personnage avec les caractéristiques et les points mis à jour
                    const updatedCharacter = {
                        ...selectedCharacter,
                        regles: updatedRegles,
                        caracteristiques: updatedCaracteristiques,
                        points: updatedPoints,

                    };

                    // Appelle la fonction de mise à jour du personnage fournie par le parent
                    updateCharacter(index, updatedCharacter);
                } else if (option.action === 'adddiademe') {

                    let updatedPoints = parseInt(selectedCharacter.points) + valeur;
                    let updatedRegles = [...selectedCharacter.regles, 'Diadème des Rois'];
                    let pouvoirdiademe = [{
                        "nom": "Aura de Confusion",
                        "valeur": ""
                    },
                    {
                        "nom": "Colère de la Nature",
                        "valeur": ""
                    },]
                    // Crée une nouvelle copie du personnage avec les caractéristiques et les points mis à jour
                    const updatedCharacter = {
                        ...selectedCharacter,
                        regles: updatedRegles,
                        points: updatedPoints,
                        pouvoirsMagiques: pouvoirdiademe

                    };

                    // Appelle la fonction de mise à jour du personnage fournie par le parent
                    updateCharacter(index, updatedCharacter);
                } else if (option.action === 'addelan') {
                    // Logique pour modifier la vitesse de la monture
                    const updatedCaracteristiques = {
                        ...selectedCharacter.caracteristiques,
                        M: 10
                    };
                    const updatedPoints = parseInt(selectedCharacter.points) + valeur;
                    const updatedCapacites = {
                        ...selectedCharacter.capacites,
                        PvMonture: 2
                    };
                    let updatedRegles = [...selectedCharacter.regles, 'Elan de Thranduil']
                    const newServant = {
                        personnage: 'Elan',
                        caracteristiques: {
                            M: '10',
                            C: 4,
                            F: 4,
                            D: 5,
                            A: '',
                            B: 4
                        }
                    };
                    // Crée une nouvelle copie du personnage avec les caractéristiques et les points mis à jour
                    const updatedCharacter = {
                        ...selectedCharacter,
                        servants: [newServant],
                        caracteristiques: updatedCaracteristiques,
                        points: updatedPoints,
                        regles: updatedRegles,
                        capacites: updatedCapacites
                    };

                    // Appelle la fonction de mise à jour du personnage fournie par le parent
                    updateCharacter(index, updatedCharacter);
                } else if (option.action === 'orcrist') {
                    // Logique pour modifier la vitesse de la monture

                    const updatedPoints = parseInt(selectedCharacter.points) + valeur;

                    let updatedRegles = [...selectedCharacter.regles, 'Orcrist', 'Lame de facture Elfique, épée bâtarde', 'Fléau', 'Terreur']

                    // Crée une nouvelle copie du personnage avec les caractéristiques et les points mis à jour
                    const updatedCharacter = {
                        ...selectedCharacter,
                        points: updatedPoints,
                        regles: updatedRegles,

                    };

                    // Appelle la fonction de mise à jour du personnage fournie par le parent
                    updateCharacter(index, updatedCharacter);
                } else if (option.action === 'addbouquetin') {
                    // Logique pour modifier la vitesse de la monture
                    const updatedCaracteristiques = {
                        ...selectedCharacter.caracteristiques,
                        M: 8
                    };
                    const updatedPoints = parseInt(selectedCharacter.points) + valeur;
             
                    let updatedRegles = [...selectedCharacter.regles, 'Montagnard', 'Charge Dévastatrice']
                    const newServant = {
                        personnage: 'Bouquetin de Guerre',
                        caracteristiques: {
                            M: '8',
                            C: '2/6+',
                            F: 4,
                            D: 5,
                            A: '',
                            B: 3
                        },
                        capacites: {
                            "Points de vie": 1
                        }
                        
                    };
                    // Crée une nouvelle copie du personnage avec les caractéristiques et les points mis à jour
                    const updatedCharacter = {
                        ...selectedCharacter,
                        servants: [newServant],
                        caracteristiques: updatedCaracteristiques,
                        points: updatedPoints,
                        regles: updatedRegles
                    
                    };

                    // Appelle la fonction de mise à jour du personnage fournie par le parent
                    updateCharacter(index, updatedCharacter);
                } else if (option.action === 'addsanglier') {
                    // Logique pour modifier la vitesse de la monture
                    const updatedCaracteristiques = {
                        ...selectedCharacter.caracteristiques,
                        M: 8
                    };
                    const updatedPoints = parseInt(selectedCharacter.points) + valeur;
                   

                    const newServant = {
                        personnage: 'Sanglier de Guerre',
                        caracteristiques: {
                            M: '8',
                            C: '4/5+',
                            F: 4,
                            D: 6,
                            A: '',
                            B: 3
                        },
                        capacites: {
                            "Points de vie": 2
                        }
                    };
                    // Crée une nouvelle copie du personnage avec les caractéristiques et les points mis à jour
                    const updatedCharacter = {
                        ...selectedCharacter,
                        servants: [newServant],
                        caracteristiques: updatedCaracteristiques,
                        points: updatedPoints
                    };

                    // Appelle la fonction de mise à jour du personnage fournie par le parent
                    updateCharacter(index, updatedCharacter);
                } else if (option.action === 'addasfaloth') {
                    // Logique pour modifier la vitesse de la monture
                    const updatedCaracteristiques = {
                        ...selectedCharacter.caracteristiques,
                        M: 12
                    };
                    const updatedPoints = parseInt(selectedCharacter.points) + valeur;
                    let updatedRegles = [...selectedCharacter.regles, 'Pied Léger']
                    const newServant = {
                        personnage: 'Asfaloth',
                        caracteristiques: {
                            M: '12',
                            C: '3',
                            F: 3,
                            D: 4,
                            A: '',
                            B: 2
                        },
                        capacites: {
                            "Points de vie": 1
                        }
                    };
                    // Crée une nouvelle copie du personnage avec les caractéristiques et les points mis à jour
                    const updatedCharacter = {
                        ...selectedCharacter,
                        servants: [newServant],
                        caracteristiques: updatedCaracteristiques,
                        points: updatedPoints,
                        regles: updatedRegles
                    };

                    // Appelle la fonction de mise à jour du personnage fournie par le parent
                    updateCharacter(index, updatedCharacter);
                } else if (option.action === 'chevauxjumeau') {
                    // Logique pour modifier la vitesse de la monture
                    const updatedCaracteristiques = {
                        ...selectedCharacter.caracteristiques,
                        M: 10
                    };
                    const updatedPoints = parseInt(selectedCharacter.points) + valeur;
                    const updatedCapacites = {
                        ...selectedCharacter.capacites,
                        PvMonture: 1
                    };

                    const updatedJumeau = selectedCharacter.servants.map((servant, index) => {
                        if (index === 0) {
                            return {
                                ...servant,
                                caracteristiques: {
                                    ...servant.caracteristiques,
                                    M: 10
                                },
                                capacites: {
                                    ...servant.capacites,
                                    PvMonture: 1
                                }
                            }

                        }
                        return servant;
                    })
                    // Crée une nouvelle copie du personnage avec les caractéristiques et les points mis à jour
                    const updatedCharacter = {
                        ...selectedCharacter,
                        servants: updatedJumeau,
                        caracteristiques: updatedCaracteristiques,
                        points: updatedPoints,
                        capacites: updatedCapacites
                    };

                    // Appelle la fonction de mise à jour du personnage fournie par le parent
                    updateCharacter(index, updatedCharacter);
                } else if (option.action === 'armurejumeau') {
                    // Logique pour modifier la vitesse de la monture
                    const updatedCaracteristiques = {
                        ...selectedCharacter.caracteristiques,
                        D: selectedCharacter.caracteristiques.D + 1
                    };
                    const updatedPoints = parseInt(selectedCharacter.points) + valeur;


                    const updatedJumeau = selectedCharacter.servants.map((servant, index) => {
                        if (index === 0) {
                            return {
                                ...servant,
                                caracteristiques: {
                                    ...servant.caracteristiques,
                                    D: servant.caracteristiques.D + 1
                                }
                            }

                        }
                        return servant;
                    })
                    // Crée une nouvelle copie du personnage avec les caractéristiques et les points mis à jour
                    const updatedCharacter = {
                        ...selectedCharacter,
                        servants: updatedJumeau,
                        caracteristiques: updatedCaracteristiques,
                        points: updatedPoints
                    };

                    // Appelle la fonction de mise à jour du personnage fournie par le parent
                    updateCharacter(index, updatedCharacter);
                } else if (option.action === 'armuregondolin') {
                    // Logique pour modifier la vitesse de la monture
                    const updatedCaracteristiques = {
                        ...selectedCharacter.caracteristiques,
                        D: selectedCharacter.caracteristiques.D + 2
                    };
                    const updatedPoints = parseInt(selectedCharacter.points) + valeur;
                    let updatedRegles = [...selectedCharacter.regles, 'Armure de Gondolin']


                    // Crée une nouvelle copie du personnage avec les caractéristiques et les points mis à jour
                    const updatedCharacter = {
                        ...selectedCharacter,

                        regles: updatedRegles,
                        caracteristiques: updatedCaracteristiques,
                        points: updatedPoints
                    };

                    // Appelle la fonction de mise à jour du personnage fournie par le parent
                    updateCharacter(index, updatedCharacter);
                } else if (option.action === 'addponey') {

                    // Logique pour modifier la vitesse de la monture
                    const updatedCaracteristiques = {
                        ...selectedCharacter.caracteristiques,
                        M: 8
                    };
                    const updatedPoints = parseInt(selectedCharacter.points) + valeur;
                    let updatedRegles = [...selectedCharacter.regles, 'Poney : Timide']

                    const newServant = {
                        personnage: 'Poney',
                        caracteristiques: {
                            M: '8',
                            C: '2',
                            F: 2,
                            D: 3,
                            A: '',
                            B: 2
                        },
                        capacites: {
                            "Points de vie": 1
                        }
                        
                    };
                    // Crée une nouvelle copie du personnage avec les caractéristiques et les points mis à jour
                    const updatedCharacter = {
                        ...selectedCharacter,
                        regles: updatedRegles,
                        servants: [newServant],
                        caracteristiques: updatedCaracteristiques,
                        points: updatedPoints
                    };

                    // Appelle la fonction de mise à jour du personnage fournie par le parent
                    updateCharacter(index, updatedCharacter);
                } else if (option.action === 'addarquelance') {
                    // Logique pour ajouter le miroir de Galadriel
                    const updatedRegles = [...selectedCharacter.regles, 'Tir précis (Engins de sièges)'];
                    const newServant = {
                        personnage: 'Arquelance',
                        caracteristiques: {
                            M: '',
                            C: '',
                            F: 10,
                            D: 10,
                            A: '',
                            B: ''
                        },
                        capacites: {
                            "Points de vie": 3
                        }
                    };

                    // Crée une nouvelle copie du personnage avec le nouveau servant et les règles spéciales mises à jour
                    const updatedCharacter = {
                        ...selectedCharacter,
                        servants: [newServant],
                        regles: updatedRegles,
                        points: parseInt(selectedCharacter.points) + valeur
                    };

                    // Appelle la fonction de mise à jour du personnage fournie par le parent
                    updateCharacter(index, updatedCharacter);
                } else if (option.action === 'addombre') {
                    const updatedCaracteristiques = {
                        ...selectedCharacter.caracteristiques,
                        M: 12
                    };
                    const updatedRegles = [...selectedCharacter.regles, 'Charge Monstrueuse', 'Vol', 'Sauvage'];
                    const newServant = {
                        personnage: 'Ombre Ailée',
                        caracteristiques: {
                            M: 3,
                            C: 5,
                            F: 6,
                            D: 6,
                            A: 2,
                            B: 3
                        },
                        capacites: {
                            "Points de vie": 3
                        }
                    };

                    // Crée une nouvelle copie du personnage avec le nouveau servant et les règles spéciales mises à jour
                    const updatedCharacter = {
                        ...selectedCharacter,
                        caracteristiques: updatedCaracteristiques,
                        servants: [newServant],
                        regles: updatedRegles,
                        points: parseInt(selectedCharacter.points) + valeur
                    };

                    // Appelle la fonction de mise à jour du personnage fournie par le parent
                    updateCharacter(index, updatedCharacter);
                } else if (option.action === 'addombrecapa') {
                    const updatedCaracteristiques = {
                        ...selectedCharacter.caracteristiques,
                        M: 12
                    };
                    const updatedRegles = [...selectedCharacter.regles, 'Charge Monstrueuse', 'Vol', 'Sauvage'];
                    const newServant = {
                        personnage: 'Ombre Ailée caparacçonnée',
                        caracteristiques: {
                            M: 3,
                            C: 5,
                            F: 6,
                            D: 7,
                            A: 2,
                            B: 3
                        },
                        capacites: {
                            "Points de vie": 3
                        }
                    };

                    // Crée une nouvelle copie du personnage avec le nouveau servant et les règles spéciales mises à jour
                    const updatedCharacter = {
                        ...selectedCharacter,
                        servants: [newServant],
                        caracteristiques: updatedCaracteristiques,
                        regles: updatedRegles,
                        points: parseInt(selectedCharacter.points) + valeur
                    };

                    // Appelle la fonction de mise à jour du personnage fournie par le parent
                    updateCharacter(index, updatedCharacter);
                } else if (option.action === 'addaigle') {
                    const updatedCaracteristiques = {
                        ...selectedCharacter.caracteristiques,
                        M: 12
                    };
                    const updatedRegles = [...selectedCharacter.regles, 'Charge Monstrueuse', 'Terreur', 'Vol'];
                    const newServant = {
                        personnage: 'Grand Aigle',
                        caracteristiques: {
                            M: 3,
                            C: 7,
                            F: 6,
                            D: 8,
                            A: 2,
                            B: 6
                        },
                        capacites: {
                            "Points de vie": 3
                        }
                    };

                    // Crée une nouvelle copie du personnage avec le nouveau servant et les règles spéciales mises à jour
                    const updatedCharacter = {
                        ...selectedCharacter,
                        servants: [newServant],
                        caracteristiques: updatedCaracteristiques,
                        regles: updatedRegles,
                        points: parseInt(selectedCharacter.points) + valeur
                    };

                    // Appelle la fonction de mise à jour du personnage fournie par le parent
                    updateCharacter(index, updatedCharacter);
                } else if (option.action === 'addtraineau') {
                    const updatedCaracteristiques = {
                        ...selectedCharacter.caracteristiques,
                        M: 10
                    };
                    const updatedRegles = [...selectedCharacter.regles, 'Créature des bois'];
                    const newServant = {
                        personnage: 'Traîneau',
                        caracteristiques: {
                            M: 10,
                            C: 3,
                            F: 2,
                            D: 3,
                            A: 4,
                            B: 2
                        },
                        capacites: {
                            "Points de vie": 4
                        }
                    };

                    // Crée une nouvelle copie du personnage avec le nouveau servant et les règles spéciales mises à jour
                    const updatedCharacter = {
                        ...selectedCharacter,
                        servants: [newServant],
                        caracteristiques: updatedCaracteristiques,
                        regles: updatedRegles,
                        points: parseInt(selectedCharacter.points) + valeur
                    };

                    // Appelle la fonction de mise à jour du personnage fournie par le parent
                    updateCharacter(index, updatedCharacter);
                } else if (option.action === 'addecu') {
                    let updatedCaracteristiques = { ...selectedCharacter.caracteristiques };

                    updatedCaracteristiques = {
                        ...selectedCharacter.caracteristiques,
                        D: updatedCaracteristiques['D'] + 1
                    };

                    let updatedRegles = [...selectedCharacter.regles, 'Écu-de-chêne']

                    const updatedPoints = parseInt(selectedCharacter.points) + valeur;

                    // Crée une nouvelle copie du personnage avec les caractéristiques et les points mis à jour
                    const updatedCharacter = {
                        ...selectedCharacter,
                        caracteristiques: updatedCaracteristiques,
                        regles: updatedRegles,
                        points: updatedPoints
                    };

                    // Appelle la fonction de mise à jour du personnage fournie par le parent
                    updateCharacter(index, updatedCharacter);
                } else if (option.action === 'addcharette') {
                    const updatedCaracteristiques = {
                        ...selectedCharacter.caracteristiques,
                        M: 8
                    };
                    const updatedRegles = [...selectedCharacter.regles, 'La Charette de Gandalf'];
                    const newServant = {
                        personnage: 'Charette',
                        caracteristiques: {
                            M: 8,
                            C: 0,
                            F: 3,
                            D: 5,
                            A: 0,
                            B: 3
                        },
                        capacites: {
                            "Points de vie": 3
                        }
                    };

                    // Crée une nouvelle copie du personnage avec le nouveau servant et les règles spéciales mises à jour
                    const updatedCharacter = {
                        ...selectedCharacter,
                        servants: [newServant],
                        caracteristiques: updatedCaracteristiques,
                        regles: updatedRegles,
                        points: parseInt(selectedCharacter.points) + valeur
                    };

                    // Appelle la fonction de mise à jour du personnage fournie par le parent
                    updateCharacter(index, updatedCharacter);
                }
            }
        } else {
            // Logique pour annuler les effets de l'option décochée
            const option = selectedCharacter.options.find(option => option.nom === optionName);

            if (option) {
                const { action, valeur } = option;
                option.isChecked = false;
                if (action.caracteristique === 'M') {
                    // Logique pour annuler les effets sur la monture
                    const updatedCaracteristiques = {
                        ...selectedCharacter.caracteristiques,
                        [action.caracteristique]: 6
                    };
                    const updatedPoints = parseInt(selectedCharacter.points) - valeur;
                    
                    // Crée une nouvelle copie du personnage avec les caractéristiques et les points mis à jour
                    const updatedCharacter = {
                        ...selectedCharacter,
                        caracteristiques: updatedCaracteristiques,
                        points: updatedPoints,
                        servants:[]
                        
                    };

                    // Appelle la fonction de mise à jour du personnage fournie par le parent
                    updateCharacter(index, updatedCharacter);
                } else if (action.caracteristique === 'D') {
                    // Logique pour réduire la défense
                    let updatedCaracteristiques = {
                        ...selectedCharacter.caracteristiques,
                        [action.caracteristique]: selectedCharacter.caracteristiques[action.caracteristique] - action.valeur
                    };

                    const updatedPoints = parseInt(selectedCharacter.points) - valeur;

                    // Crée une nouvelle copie du personnage avec les caractéristiques et les points mis à jour
                    const updatedCharacter = {
                        ...selectedCharacter,
                        caracteristiques: updatedCaracteristiques,
                        points: updatedPoints
                    };

                    // Appelle la fonction de mise à jour du personnage fournie par le parent
                    updateCharacter(index, updatedCharacter);
                } else if (action.caracteristique === 'B') {
                    // Logique pour réduire la bravoure
                    let updatedCaracteristiques = {
                        ...selectedCharacter.caracteristiques,
                        [action.caracteristique]: selectedCharacter.caracteristiques[action.caracteristique] - action.valeur
                    };

                    const updatedPoints = parseInt(selectedCharacter.points) - valeur;

                    // Crée une nouvelle copie du personnage avec les caractéristiques et les points mis à jour
                    const updatedCharacter = {
                        ...selectedCharacter,
                        caracteristiques: updatedCaracteristiques,
                        points: updatedPoints
                    };

                    // Appelle la fonction de mise à jour du personnage fournie par le parent
                    updateCharacter(index, updatedCharacter);
                } else if (action.caracteristique === 'F') {
                    // Logique pour réduire la force
                    let updatedCaracteristiques = {
                        ...selectedCharacter.caracteristiques,
                        [action.caracteristique]: selectedCharacter.caracteristiques[action.caracteristique] - action.valeur
                    };

                    const updatedPoints = parseInt(selectedCharacter.points) - valeur;

                    // Crée une nouvelle copie du personnage avec les caractéristiques et les points mis à jour
                    const updatedCharacter = {
                        ...selectedCharacter,
                        caracteristiques: updatedCaracteristiques,
                        points: updatedPoints
                    };

                    // Appelle la fonction de mise à jour du personnage fournie par le parent
                    updateCharacter(index, updatedCharacter);
                } else if (action.caracteristique === 'C') {
                    let updatedCaracteristiques = { ...selectedCharacter.caracteristiques };
                    const updatedC = selectedCharacter.caracteristiques['C'];
                    const newC = updatedC.split('/')[0];
                    const newCValue = parseInt(newC) - action.valeur;
                    const newCStr = newCValue + '/' + updatedC.split('/')[1];
                    updatedCaracteristiques = {
                        ...selectedCharacter.caracteristiques,
                        C: newCStr
                    };

                    const updatedPoints = parseInt(selectedCharacter.points) - valeur;

                    // Crée une nouvelle copie du personnage avec les caractéristiques et les points mis à jour
                    const updatedCharacter = {
                        ...selectedCharacter,
                        caracteristiques: updatedCaracteristiques,
                        points: updatedPoints
                    };

                    // Appelle la fonction de mise à jour du personnage fournie par le parent
                    updateCharacter(index, updatedCharacter);
                } else if (action.effet === 'regles') {
                    // Logique pour annuler les règles spéciales
                    let updatedCaracteristiques = { ...selectedCharacter.caracteristiques };
                    let updatedPoints = parseInt(selectedCharacter.points) - valeur;

                    // Vérifie si l'option est Bannière de Minas Tirith pour mettre à jour la caractéristique C
                    if (option.nom === 'Bannière de Minas Tirith') {
                        const updatedC = selectedCharacter.caracteristiques['C'];
                        const newC = updatedC.split('/')[0];
                        const newCValue = parseInt(newC) - 1;
                        const newCStr = newCValue + '/4+';
                        updatedCaracteristiques = {
                            ...selectedCharacter.caracteristiques,
                            C: newCStr
                        };
                    }

                    // Crée une nouvelle copie du personnage avec les règles spéciales, les caractéristiques et les points mis à jour
                    const updatedCharacter = {
                        ...selectedCharacter,
                        regles: selectedCharacter.regles.filter(rule => rule !== option.nom),
                        caracteristiques: updatedCaracteristiques,
                        points: updatedPoints
                    };

                    // Appelle la fonction de mise à jour du personnage fournie par le parent
                    updateCharacter(index, updatedCharacter);
                } else if (action.effet === 'minus') {

                    let updatedPoints = parseInt(selectedCharacter.points) - valeur;
                    let updatedCaracteristiques = {
                        ...selectedCharacter.caracteristiques,
                        ['D']: selectedCharacter.caracteristiques['D'] + 1
                    };

                    // Crée une nouvelle copie du personnage avec les règles spéciales, les caractéristiques et les points mis à jour
                    const updatedCharacter = {
                        ...selectedCharacter,
                        regles: selectedCharacter.regles.filter(rule => rule !== option.nom),
                        caracteristiques: updatedCaracteristiques,
                        points: updatedPoints
                    };

                    // Appelle la fonction de mise à jour du personnage fournie par le parent
                    updateCharacter(index, updatedCharacter);
                } else if (action.effet === 'servant') {
                    // Logique pour annuler les effets sur le servant
                    let updatedPoints = parseInt(selectedCharacter.points) - valeur;
                    const updatedServants = selectedCharacter.servants.map((servant, index) => {
                        if (index === 0) {
                            // Mettre à jour les caractéristiques du premier servant
                            return {
                                ...servant,
                                caracteristiques: {
                                    ...servant.caracteristiques,
                                    M: 6,
                                    C: "3/4+",
                                    F: 3,
                                    D: 5,
                                    A: 1,
                                    B: 3
                                },
                                capacites: {
                                    ...servant.capacites,
                                    Puissance: 1,
                                    "Points de vie": 1
                                },
                                personnage: 'Vétéran - Guerrier de Minas Tirith'
                            };
                        } else {
                            // Ne rien changer pour les autres servants
                            return servant;
                        }
                    });

                    // Crée une nouvelle copie du personnage avec les servants et les points mis à jour
                    const updatedCharacter = {
                        ...selectedCharacter,
                        servants: updatedServants,
                        points: updatedPoints
                    };

                    // Appelle la fonction de mise à jour du personnage fournie par le parent
                    updateCharacter(index, updatedCharacter);
                } else if (option.action === 'addmiroir') {
                    // Logique pour retirer le miroir de Galadriel
                    const updatedRegles = selectedCharacter.regles.filter(rule => rule !== 'Miroir de Galadriel');

                    // Crée une nouvelle copie du personnage avec le miroir de Galadriel retiré et les règles spéciales mises à jour
                    const updatedCharacter = {
                        ...selectedCharacter,
                        servants: [],
                        regles: updatedRegles,
                        points: parseInt(selectedCharacter.points) - valeur
                    };

                    // Appelle la fonction de mise à jour du personnage fournie par le parent
                    updateCharacter(index, updatedCharacter);
                } else if (option.action === 'addgripoil') {
                    // Logique pour modifier la vitesse de la monture
                    const updatedCaracteristiques = {
                        ...selectedCharacter.caracteristiques,
                        M: 6
                    };
                    const updatedPoints = parseInt(selectedCharacter.points) - valeur;
                    const { PvMonture, ...updatedCapacites } = selectedCharacter.capacites;

                    // Crée une nouvelle copie du personnage avec les caractéristiques et les points mis à jour
                    const updatedCharacter = {
                        ...selectedCharacter,
                        servants: [],
                        caracteristiques: updatedCaracteristiques,
                        points: updatedPoints,
                        capacites: updatedCapacites
                    };

                    // Appelle la fonction de mise à jour du personnage fournie par le parent
                    updateCharacter(index, updatedCharacter);
                } else if (option.action === 'epethranduil') {
                    let updatedCaracteristiques = { ...selectedCharacter.caracteristiques };
                    let updatedPoints = parseInt(selectedCharacter.points) - valeur;
                    let updatedRegles = selectedCharacter.regles.filter(rule => rule !== 'Fine Lame');
                    const updatedC = selectedCharacter.caracteristiques['C'];
                    const newC = updatedC.split('/')[0];
                    const newCValue = parseInt(newC) - 1;
                    const newCStr = newCValue + '/2+';
                    updatedCaracteristiques = {
                        ...selectedCharacter.caracteristiques,
                        C: newCStr,
                        A: updatedCaracteristiques['A'] - 1
                    };
                    // Crée une nouvelle copie du personnage avec les caractéristiques et les points mis à jour
                    const updatedCharacter = {
                        ...selectedCharacter,
                        regles: updatedRegles,
                        caracteristiques: updatedCaracteristiques,
                        points: updatedPoints,

                    };

                    // Appelle la fonction de mise à jour du personnage fournie par le parent
                    updateCharacter(index, updatedCharacter);
                } else if (option.action === 'adddiademe') {

                    let updatedPoints = parseInt(selectedCharacter.points) - valeur;
                    let updatedRegles = selectedCharacter.regles.filter(rule => rule !== 'Diadème des Rois');

                    // Crée une nouvelle copie du personnage avec les caractéristiques et les points mis à jour
                    const updatedCharacter = {
                        ...selectedCharacter,
                        regles: updatedRegles,
                        points: updatedPoints,
                        pouvoirsMagiques: []

                    };

                    // Appelle la fonction de mise à jour du personnage fournie par le parent
                    updateCharacter(index, updatedCharacter);
                } else if (option.action === 'addelan') {
                    // Logique pour modifier la vitesse de la monture
                    const updatedCaracteristiques = {
                        ...selectedCharacter.caracteristiques,
                        M: 6
                    };
                    const updatedPoints = parseInt(selectedCharacter.points) - valeur;
                    const { PvMonture, ...updatedCapacites } = selectedCharacter.capacites;
                    let updatedRegles = selectedCharacter.regles.filter(rule => rule !== 'Elan de Thranduil');
                    // Crée une nouvelle copie du personnage avec les caractéristiques et les points mis à jour
                    const updatedCharacter = {
                        ...selectedCharacter,
                        servants: [],
                        caracteristiques: updatedCaracteristiques,
                        points: updatedPoints,
                        capacites: updatedCapacites,
                        regles: updatedRegles
                    };

                    // Appelle la fonction de mise à jour du personnage fournie par le parent
                    updateCharacter(index, updatedCharacter);
                } else if (option.action === 'orcrist') {
                    // Logique pour modifier la vitesse de la monture

                    const updatedPoints = parseInt(selectedCharacter.points) - valeur;


                    let updatedRegles = selectedCharacter.regles.filter(regle => regle !== 'Orcrist' && regle !== 'Lame de facture Elfique, épée bâtarde' && regle !== 'Fléau' && regle !== 'Terreur')
                    // Crée une nouvelle copie du personnage avec les caractéristiques et les points mis à jour
                    const updatedCharacter = {
                        ...selectedCharacter,
                        points: updatedPoints,
                        regles: updatedRegles,

                    };

                    // Appelle la fonction de mise à jour du personnage fournie par le parent
                    updateCharacter(index, updatedCharacter);
                } else if (option.action === 'addbouquetin') {
                    // Logique pour modifier la vitesse de la monture
                    const updatedCaracteristiques = {
                        ...selectedCharacter.caracteristiques,
                        M: 5
                    };
                   
                    const updatedPoints = parseInt(selectedCharacter.points) - valeur;

                    let updatedRegles = selectedCharacter.regles.filter(regle => regle !== 'Montagnard' && regle !== 'Charge Dévastatrice');



                    // Crée une nouvelle copie du personnage avec les caractéristiques et les points mis à jour
                    const updatedCharacter = {
                        ...selectedCharacter,
                        servants: [],
                        caracteristiques: updatedCaracteristiques,
                        points: updatedPoints,
                        regles: updatedRegles
                    };

                    // Appelle la fonction de mise à jour du personnage fournie par le parent
                    updateCharacter(index, updatedCharacter);
                } else if (option.action === 'addsanglier') {
                    // Logique pour modifier la vitesse de la monture
                    const updatedCaracteristiques = {
                        ...selectedCharacter.caracteristiques,
                        M: 5
                    };
                    const updatedPoints = parseInt(selectedCharacter.points) - valeur;


 
                    // Crée une nouvelle copie du personnage avec les caractéristiques et les points mis à jour
                    const updatedCharacter = {
                        ...selectedCharacter,
                        servants: [],
                        caracteristiques: updatedCaracteristiques,
                        points: updatedPoints
                    };

                    // Appelle la fonction de mise à jour du personnage fournie par le parent
                    updateCharacter(index, updatedCharacter);
                } else if (option.action === 'addasfaloth') {
                    // Logique pour modifier la vitesse de la monture
                    const updatedCaracteristiques = {
                        ...selectedCharacter.caracteristiques,
                        M: 6
                    };
                    const updatedPoints = parseInt(selectedCharacter.points) + valeur;
                    let updatedRegles = selectedCharacter.regles.filter(regle => regle !== 'Pied Léger');

               

                    // Crée une nouvelle copie du personnage avec les caractéristiques et les points mis à jour
                    const updatedCharacter = {
                        ...selectedCharacter,
                        servants: [],
                        caracteristiques: updatedCaracteristiques,
                        points: updatedPoints,
                        regles: updatedRegles
                    };

                    // Appelle la fonction de mise à jour du personnage fournie par le parent
                    updateCharacter(index, updatedCharacter);
                } else if (option.action === 'chevauxjumeau') {
                    // Logique pour modifier la vitesse de la monture
                    const updatedCaracteristiques = {
                        ...selectedCharacter.caracteristiques,
                        M: 6
                    };
                    const updatedPoints = parseInt(selectedCharacter.points) - valeur;
                    let { PvMonture, ...updatedCapacites } = selectedCharacter.capacites;


                    const updatedJumeau = selectedCharacter.servants.map((servant, index) => {
                        if (index === 0) {
                            const { PvMonture, ...updaCapaServ } = servant.capacites;
                            return {
                                ...servant,
                                caracteristiques: {
                                    ...servant.caracteristiques,
                                    M: 6
                                },
                                capacites: updaCapaServ
                            }

                        }
                        return servant;
                    })
                    // Crée une nouvelle copie du personnage avec les caractéristiques et les points mis à jour
                    const updatedCharacter = {
                        ...selectedCharacter,
                        servants: updatedJumeau,
                        caracteristiques: updatedCaracteristiques,
                        points: updatedPoints,
                        capacites: updatedCapacites
                    };

                    // Appelle la fonction de mise à jour du personnage fournie par le parent
                    updateCharacter(index, updatedCharacter);
                } else if (option.action === 'armurejumeau') {
                    // Logique pour modifier la vitesse de la monture
                    const updatedCaracteristiques = {
                        ...selectedCharacter.caracteristiques,
                        D: selectedCharacter.caracteristiques.D - 1
                    };
                    const updatedPoints = parseInt(selectedCharacter.points) - valeur;


                    const updatedJumeau = selectedCharacter.servants.map((servant, index) => {
                        if (index === 0) {
                            return {
                                ...servant,
                                caracteristiques: {
                                    ...servant.caracteristiques,
                                    D: servant.caracteristiques.D - 1
                                }
                            }

                        }
                        return servant;
                    })
                    // Crée une nouvelle copie du personnage avec les caractéristiques et les points mis à jour
                    const updatedCharacter = {
                        ...selectedCharacter,
                        servants: updatedJumeau,
                        caracteristiques: updatedCaracteristiques,
                        points: updatedPoints
                    };

                    // Appelle la fonction de mise à jour du personnage fournie par le parent
                    updateCharacter(index, updatedCharacter);
                } else if (option.action === 'armuregondolin') {
                    // Logique pour modifier la vitesse de la monture
                    const updatedCaracteristiques = {
                        ...selectedCharacter.caracteristiques,
                        D: selectedCharacter.caracteristiques.D - 2
                    };
                    const updatedPoints = parseInt(selectedCharacter.points) - valeur;

                    let updatedRegles = selectedCharacter.regles.filter(regle => regle !== 'Armure de Gondolin');


                    // Crée une nouvelle copie du personnage avec les caractéristiques et les points mis à jour
                    const updatedCharacter = {
                        ...selectedCharacter,
                        regles: updatedRegles,
                        caracteristiques: updatedCaracteristiques,
                        points: updatedPoints
                    };

                    // Appelle la fonction de mise à jour du personnage fournie par le parent
                    updateCharacter(index, updatedCharacter);
                } else if (option.action === 'addponey') {
                    // Logique pour modifier la vitesse de la monture
                    const updatedCaracteristiques = {
                        ...selectedCharacter.caracteristiques,
                        M: option.mouv
                    };
                    const updatedPoints = parseInt(selectedCharacter.points) - valeur;
                    let updatedRegles = selectedCharacter.regles.filter(regle => regle !== 'Poney : Timide')

        
                    // Crée une nouvelle copie du personnage avec les caractéristiques et les points mis à jour
                    const updatedCharacter = {
                        ...selectedCharacter,
                        regles: updatedRegles,
                        servants: [],
                        caracteristiques: updatedCaracteristiques,
                        points: updatedPoints
                    };

                    // Appelle la fonction de mise à jour du personnage fournie par le parent
                    updateCharacter(index, updatedCharacter);
                } else if (option.action === 'addarquelance') {
                    // Logique pour ajouter le miroir de Galadriel

                    let updatedRegles = selectedCharacter.regles.filter(regle => regle !== 'Tir précis (Engins de sièges)')

                    // Crée une nouvelle copie du personnage avec le nouveau servant et les règles spéciales mises à jour
                    const updatedCharacter = {
                        ...selectedCharacter,
                        servants: [],
                        regles: updatedRegles,
                        points: parseInt(selectedCharacter.points) - valeur
                    };

                    // Appelle la fonction de mise à jour du personnage fournie par le parent
                    updateCharacter(index, updatedCharacter);
                } else if (option.action === 'addombre') {
                    const updatedCaracteristiques = {
                        ...selectedCharacter.caracteristiques,
                        M: 6
                    };

                    let updatedRegles = selectedCharacter.regles.filter(r => r !== 'Charge Monstrueuse' && r !== 'Vol' && r !== 'Sauvage')

                    // Crée une nouvelle copie du personnage avec le nouveau servant et les règles spéciales mises à jour
                    const updatedCharacter = {
                        ...selectedCharacter,
                        caracteristiques: updatedCaracteristiques,
                        servants: [],
                        regles: updatedRegles,
                        points: parseInt(selectedCharacter.points) - valeur
                    };

                    // Appelle la fonction de mise à jour du personnage fournie par le parent
                    updateCharacter(index, updatedCharacter);
                } else if (option.action === 'addombrecapa') {
                    const updatedCaracteristiques = {
                        ...selectedCharacter.caracteristiques,
                        M: 6
                    };
                    let updatedRegles = selectedCharacter.regles.filter(r => r !== 'Charge Monstrueuse' && r !== 'Vol' && r !== 'Sauvage')



                    // Crée une nouvelle copie du personnage avec le nouveau servant et les règles spéciales mises à jour
                    const updatedCharacter = {
                        ...selectedCharacter,
                        servants: [],
                        caracteristiques: updatedCaracteristiques,
                        regles: updatedRegles,
                        points: parseInt(selectedCharacter.points) - valeur
                    };

                    // Appelle la fonction de mise à jour du personnage fournie par le parent
                    updateCharacter(index, updatedCharacter);
                } else if (option.action === 'addaigle') {
                    const updatedCaracteristiques = {
                        ...selectedCharacter.caracteristiques,
                        M: 6
                    };
                    let updatedRegles = selectedCharacter.regles.filter(r => r !== 'Charge Monstrueuse' && r !== 'Vol' && r !== 'Terreur')



                    // Crée une nouvelle copie du personnage avec le nouveau servant et les règles spéciales mises à jour
                    const updatedCharacter = {
                        ...selectedCharacter,
                        servants: [],
                        caracteristiques: updatedCaracteristiques,
                        regles: updatedRegles,
                        points: parseInt(selectedCharacter.points) - valeur
                    };

                    // Appelle la fonction de mise à jour du personnage fournie par le parent
                    updateCharacter(index, updatedCharacter);
                } else if (option.action === 'addtraineau') {
                    const updatedCaracteristiques = {
                        ...selectedCharacter.caracteristiques,
                        M: 6
                    };
                    let updatedRegles = selectedCharacter.regles.filter(r => r !== 'Créature des bois')



                    // Crée une nouvelle copie du personnage avec le nouveau servant et les règles spéciales mises à jour
                    const updatedCharacter = {
                        ...selectedCharacter,
                        servants: [],
                        caracteristiques: updatedCaracteristiques,
                        regles: updatedRegles,
                        points: parseInt(selectedCharacter.points) - valeur
                    };

                    // Appelle la fonction de mise à jour du personnage fournie par le parent
                    updateCharacter(index, updatedCharacter);
                } else if (option.action === 'addecu') {
                    let updatedCaracteristiques = { ...selectedCharacter.caracteristiques };

                    updatedCaracteristiques = {
                        ...selectedCharacter.caracteristiques,
                        D: updatedCaracteristiques['D'] - 1
                    };

                    let updatedRegles = selectedCharacter.regles.filter(regle => regle !== 'Écu-de-chêne')

                    const updatedPoints = parseInt(selectedCharacter.points) - valeur;

                    // Crée une nouvelle copie du personnage avec les caractéristiques et les points mis à jour
                    const updatedCharacter = {
                        ...selectedCharacter,
                        caracteristiques: updatedCaracteristiques,
                        regles: updatedRegles,
                        points: updatedPoints
                    };

                    // Appelle la fonction de mise à jour du personnage fournie par le parent
                    updateCharacter(index, updatedCharacter);
                } else if (option.action === 'addcharette') {
                    const updatedCaracteristiques = {
                        ...selectedCharacter.caracteristiques,
                        M: 6
                    };
                    let updatedRegles = selectedCharacter.regles.filter(regle => regle !== 'La Charette de Gandalf')


                    // Crée une nouvelle copie du personnage avec le nouveau servant et les règles spéciales mises à jour
                    const updatedCharacter = {
                        ...selectedCharacter,
                        servants: [],
                        caracteristiques: updatedCaracteristiques,
                        regles: updatedRegles,
                        points: parseInt(selectedCharacter.points) - valeur
                    };

                    // Appelle la fonction de mise à jour du personnage fournie par le parent
                    updateCharacter(index, updatedCharacter);
                }
            }
        }
    };


    return (
        <div className='card-content' >
            <h2 className='name-perso'>{selectedCharacter.personnage} <span className='point-perso'>{selectedCharacter.points}pts</span></h2>
            <Modal ruleName={selectedCharacter.faction} />
            <table>
                <tbody>
                    <tr>
                        {Object.entries(selectedCharacter.caracteristiques).map(([key, value]) => (
                            <td key={`${key}-${value}`}>{key}</td>
                        ))}
                    </tr>
                    <tr>
                        {Object.entries(selectedCharacter.caracteristiques).map(([key, value]) => (
                            <td key={`${key}-${value}`}>{value}</td>
                        ))}
                    </tr>
                </tbody>
            </table>
            <h3>Capacités</h3>
            <table>
                <tbody>
                    {Object.entries(selectedCharacter.capacites).map(([capacite, value]) => (
                        <tr key={capacite}>
                            <td>{capacite}</td>
                            <td>
                                <button className='btnmod' onClick={() => handleChangeCapacite(capacite, 'decrease')}>-</button>
                                <b>{value}</b>
                                <button className='btnmod' onClick={() => handleChangeCapacite(capacite, 'increase')}>+</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedCharacter.note && selectedCharacter.note.length > 0 && (
                <div className='flex'>
                    <h3 className='blue'>Notes : </h3>
                    <div className='note'>
                        {selectedCharacter.note}
                    </div>
                </div>
            )
            }
            {
                selectedCharacter.options && selectedCharacter.options.length > 0 && (
                    <>
                        <h3>Options</h3>
                        {selectedCharacter.options.map((option, optionIndex) => (
                            <Option
                                key={option.nom}
                                character={selectedCharacter}
                                optionIndex={optionIndex}
                                onChange={(isChecked) => handleChangeOption(option.nom, isChecked, index, selectedCharacter.uniqueId)} // Passer uniqueId
                                optionName={option.nom}
                                optionValue={option.valeur}
                                isChecked={option.isChecked}
                            />
                        ))}
                    </>
                )
            }

            {
                selectedCharacter.servants && selectedCharacter.servants.length > 0 && (
                    <>
                        <h3>Servants</h3>
                        <div className='container-servant'>
                            {selectedCharacter.servants.map((servant, index) => (
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
                                            {servant.capacites && (Object.entries(servant.capacites).map(([capacite, value]) => (
                                                <tr key={capacite}>
                                                    <td>{capacite}</td>
                                                    <td>
                                                        <button className='btnmod' onClick={() => handleChangeCapaciteServant(index, capacite, 'decrease')}>-</button>
                                                        {value}
                                                        <button className='btnmod' onClick={() => handleChangeCapaciteServant(index, capacite, 'increase')}>+</button>
                                                    </td>
                                                </tr>
                                            )))}
                                        </tbody>
                                    </table>
                                </div>
                            ))}
                        </div>
                    </>
                )
            }

            <div className='grid2'>

                {selectedCharacter.regles && selectedCharacter.regles.length > 0 && (
                    <div className='regle-spe-perso'>
                        <h3>Règles spéciales</h3>
                        <div className='regle-perso'>
                            {selectedCharacter.regles.map((rule, index) => (<Modal key={rule} ruleName={rule} />))}
                        </div>
                    </div>
                )}

                {selectedCharacter.actions && selectedCharacter.actions.length > 0 && (
                    <div className='action-hero-perso'>
                        <h3>Actions Héroïques</h3>
                        <div className='action-perso'>
                            {selectedCharacter.actions.map((action, index) => (<Modal key={action} ruleName={action} />))}
                        </div>
                    </div>
                )}
            </div>

            {
                selectedCharacter.pouvoirsMagiques && selectedCharacter.pouvoirsMagiques.length > 0 && (
                    <div className='pouvoir-hero-perso'>
                        <h3>Pouvoirs Magiques</h3>

                        <div className='action-perso'>
                            {selectedCharacter.pouvoirsMagiques.map((pouvoir, index) => (<Modalpower key={pouvoir.nom} powerJson={pouvoir} />))}

                        </div>

                    </div>
                )
            }

        </div >
    );
}

export default JeuCard;