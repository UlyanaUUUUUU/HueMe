import React from 'react';
import ColorTypes from './ColorTypes';
import ColorGrid from './ColorGrid';
import CustomColorPicker from './CustomColorPicker';

const ControlsPanel = ({
                           colorTypes,
                           selectedColorType,
                           selectedColor,
                           tempColor,
                           isColorPickerOpen,
                           popularColors,
                           onSelectColorType,
                           onSelectColor,
                           onOpenColorPicker,
                           onColorChange,
                           onApplyColor,
                           onCancelColor
                       }) => (
    <div className="controls-panel">
        <div className="panel-handle"></div>

        <ColorTypes
            colorTypes={colorTypes}
            selectedColorType={selectedColorType}
            onSelectType={onSelectColorType}
        />

        <ColorGrid
            colors={selectedColorType ? colorTypes[selectedColorType].colors : popularColors}
            selectedColor={selectedColor}
            onSelectColor={onSelectColor}
        />

        <CustomColorPicker
            selectedColor={selectedColor}
            tempColor={tempColor}
            isOpen={isColorPickerOpen}
            onOpenPicker={onOpenColorPicker}
            onColorChange={onColorChange}
            onApply={onApplyColor}
            onCancel={onCancelColor}
        />
    </div>
);

export default ControlsPanel;