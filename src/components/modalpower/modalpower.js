import React, { useState, useEffect } from 'react';
import pouvoirData from '../../pouvoir.json';

function Modalpower({powerJson }) {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedPouvoir, setSelectedPouvoir] = useState(null);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    useEffect(() => {
        const lowercasePouvoirName = powerJson.nom.toLowerCase()
        const pouvoir = pouvoirData.find(pouvoir => pouvoir.nom.toLowerCase() === lowercasePouvoirName);

        if (pouvoir) {
            setSelectedPouvoir(pouvoir);
        } else {
            setSelectedPouvoir(null);
        }
    }, [powerJson.nom]);

    return (
        selectedPouvoir && (
            <div className='pouvoir-container'>
                <div className="pouvoir-name" onClick={togglePopup}>{powerJson.nom}</div>
                <div className="pouvoir-porte">{powerJson.portee}</div>
                {powerJson.valeur && (<div className="pouvoir-lancement">{powerJson.valeur}</div>)}

                {showPopup && (
                    <div className="popup" onClick={togglePopup}>
                        <div className='popup-container'>
                            <div className="popup-content">
                                <h3 className='pouvoir-title'>{powerJson.nom}</h3>
                                {selectedPouvoir && (
                                    <div>
                                        <p className='rule-effect'><b>Effet: </b>{selectedPouvoir.effet}</p>
                                        {selectedPouvoir.effetCanalise && (
                                            <p><b>Effet Canalise</b>: {selectedPouvoir.effetCanalise}</p>

                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    );
}

export default Modalpower;
