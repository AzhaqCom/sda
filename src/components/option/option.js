import React, { useState, useEffect } from 'react';

function Option({ character, optionIndex, optionName, optionValue, onChange, uniqueId }) {
  // Chaque instance du composant a son propre état `isChecked`
  const [isChecked, setIsChecked] = useState(false);

  // Initialisation de l'état `isChecked` avec la valeur de l'option
  useEffect(() => {
    setIsChecked(character.options[optionIndex].isChecked);
  }, [character.options, optionIndex]);

  const handleCheckboxChange = (event) => {
    const newIsChecked = event.target.checked;
    setIsChecked(newIsChecked);
    onChange(newIsChecked, optionName, optionIndex, uniqueId); // Passer l'index de l'option et uniqueId
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
