import React from 'react';

const ColorTypes = ({ colorTypes, selectedColorType, onSelectType }) => (
    <div className="color-types">
        {Object.entries(colorTypes).map(([key, type]) => {
            const IconComponent = type.icon;
            if (key === 'my-colors' && type.colors.length === 0) return null;

            return (
                <button
                    key={key}
                    onClick={() => onSelectType(selectedColorType === key ? '' : key)}
                    className={`color-type-btn ${selectedColorType === key ? 'active' : ''}`}
                >
                    <IconComponent className="type-icon" />
                    <span>{type.name}</span>
                </button>
            );
        })}
    </div>
);

export default ColorTypes;