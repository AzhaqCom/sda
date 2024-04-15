import React,{useState} from 'react';

function Option({ character, optionName, optionValue, index, onChange }) {
    const [isChecked, setIsChecked] = useState(character.options[index].isChecked); // Initialiser l'état local
  
    const handleCheckboxChange = (event) => {
      const newIsChecked = event.target.checked;
      setIsChecked(newIsChecked); // Mettre à jour l'état local
      onChange(newIsChecked); // Appeler la fonction de mise à jour d'état fournie
    };
  
    return (
      <div>
        <label>
          <input type="checkbox" checked={isChecked || false} onChange={handleCheckboxChange} />
          {optionName} : {optionValue}pts
        </label>
      </div>
    );
  }

export default Option;
