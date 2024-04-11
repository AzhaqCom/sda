import React, { useState, useEffect } from 'react';
import regleData from '../../regle.json';
import actionData from '../../actions.json';
import armeData from '../../regle-arme.json';
import './modal.css'
function Modal({ ruleName }) {
    const [showPopup, setShowPopup] = useState(false);
    const [ruleEffect, setRuleEffect] = useState('');
    const [etat, setEtat] = useState('');
    const [phase, setPhase] = useState('');
    const [regleSpe, setRegleSpe] = useState('');
    const togglePopup = () => {
        setShowPopup(!showPopup);
        // document.body.classList.toggle('no-scroll');
    };
    useEffect(() => {
        const lowercaseRuleName = ruleName.toLowerCase();

        const rule = regleData.find(rule => rule.nom.toLowerCase() === lowercaseRuleName);
        const action = actionData.find(action => action.nom.toLowerCase() === lowercaseRuleName);
        const faction = armeData.find(arme => arme.faction.toLowerCase() === lowercaseRuleName);

        if (rule) {
            setRuleEffect(rule.effet);
            setEtat(rule.etat)
        } else if (action) {
            setRuleEffect(action.effet);
            setPhase(action.phase)

        } else if (faction) {
            setRuleEffect(faction.bonus);
            setRegleSpe(faction.regles)
          

        } else {
            setRuleEffect("Aucun effet trouvé pour cette règle spéciale.");
        }
    }, [ruleName]);
    return (
        <>
            <div className="rule-name" onClick={togglePopup}><div className='rule-title'>{ruleName}</div>{etat && (<span className={`etat ${etat}`}>{etat}</span>)}{phase && (<span className={`phase ${phase}`}>{phase}</span>)}</div>
            {showPopup && (
                <div className="popup" onClick={togglePopup}>
                    <div className='popup-container'>
                        <div className="popup-content">
                            <h3 className='rule-title'>{ruleName}</h3>
                            <p className='rule-effect'>{ruleEffect}</p>
                            {regleSpe && (<p className='rule-effect'>{regleSpe}</p>)}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Modal