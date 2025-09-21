import React from 'react';
import { Check, X } from 'lucide-react';

const CustomColorPicker = ({
                               selectedColor,
                               tempColor,
                               isOpen,
                               onOpenPicker,
                               onColorChange,
                               onApply,
                               onCancel
                           }) => (
    <div className="custom-color">
        <span>Свой цвет:</span>
        {!isOpen ? (
            <button
                onClick={onOpenPicker}
                className="color-preview-btn"
                style={{ backgroundColor: selectedColor }}
            />
        ) : (
            <div className="color-picker-group">
                <input
                    type="color"
                    value={tempColor}
                    onChange={onColorChange}
                    className="color-picker"
                />
                <button onClick={onApply} className="color-action-btn apply">
                    <Check className="action-icon-small" />
                </button>
                <button onClick={onCancel} className="color-action-btn cancel">
                    <X className="action-icon-small" />
                </button>
            </div>
        )}
        <span className="color-code">{selectedColor}</span>
    </div>
);

export default CustomColorPicker;