import React from 'react';

const ColorGrid = ({ colors, selectedColor, onSelectColor }) => (
    <div className="color-grid">
        {colors.map((color, index) => (
            <button
                key={index}
                onClick={() => onSelectColor(color)}
                className={`color-btn ${selectedColor === color ? 'selected' : ''}`}
                style={{ backgroundColor: color }}
            />
        ))}
    </div>
);

export default ColorGrid;