import React from 'react'

function Option({ optionName, optionValue, onChange }) {
    const handleCheckboxChange = (event) => {
        const isChecked = event.target.checked;
        onChange(optionName, isChecked);
    };

    return (
        <div>
            <label>
                <input type="checkbox" onChange={handleCheckboxChange} />
                {optionName} : {optionValue}pts
            </label>
        </div>
    );
}

export default Option