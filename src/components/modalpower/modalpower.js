import React, { useState, useEffect } from 'react';
import pouvoirData from '../../pouvoir.json';

function Modalpower({ powerName }) {
    const [showPopup, setShowPopup] = useState(false);
    const [pouvoirEffect, setPouvoirEffect] = useState('');
    const [selectedPouvoir, setSelectedPouvoir] = useState(null);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    useEffect(() => {
        const lowercasePouvoirName = powerName.toLowerCase().split('(')[0].trim();
        const pouvoir = pouvoirData.find(pouvoir => pouvoir.nom.toLowerCase() === lowercasePouvoirName);

        if (pouvoir) {
            setSelectedPouvoir(pouvoir);
            setPouvoirEffect(pouvoir.effet);
        } else {
            setPouvoirEffect("Aucun effet trouvé pour cette règle spéciale.");
        }
    }, [powerName]);
    return (
        selectedPouvoir && (
            <div className='pouvoir-container' >
                <div className="pouvoir-name" onClick={togglePopup}>{powerName}</div>
                <div className="pouvoir-porte">{selectedPouvoir.portee}</div>
                <div className="pouvoir-lancement">{selectedPouvoir.valeurLancement}</div>

            
                {showPopup && (
                    <div className="popup" onClick={togglePopup}>
                        <div className="popup-content">
                            <h3 className='pouvoir-title'>{powerName}</h3>
                            <p className='pouvoir-effect'>{pouvoirEffect}</p>
                            {selectedPouvoir && (
                                <div>
                                    <p>Effet: {selectedPouvoir.effet}</p>
                                    <p>Effet Canalise: {selectedPouvoir.effetCanalise}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        )
    );



}

export default Modalpower;
