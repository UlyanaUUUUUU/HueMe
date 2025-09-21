import React from 'react';
import { Heart, Download, RotateCcw } from 'lucide-react';

const ColorPreview = ({
                          selectedColor,
                          userPhoto,
                          photoTransform,
                          onSaveColor,
                          onResetPhoto,
                          onSaveImage,
                          photoHandlers
                      }) => (
    <div className="color-preview" style={{ backgroundColor: selectedColor }}>
        {userPhoto && (
            <div className="face-oval">
                <img
                    src={userPhoto}
                    alt="User"
                    style={{
                        transform: `translate(${photoTransform.x}px, ${photoTransform.y}px) scale(${photoTransform.scale})`,
                        transformOrigin: 'center center',
                        touchAction: 'none'
                    }}
                    draggable={false}
                    {...photoHandlers}
                />
            </div>
        )}

        <div className="action-buttons">
            <button onClick={() => onSaveColor(selectedColor)} className="action-btn" title="Сохранить цвет">
                <Heart className="action-icon" />
            </button>
            <button onClick={onResetPhoto} className="action-btn" title="Сбросить позицию фото">
                <RotateCcw className="action-icon" />
            </button>
            <button onClick={onSaveImage} className="action-btn" title="Скачать изображение">
                <Download className="action-icon" />
            </button>
        </div>
    </div>
);

export default ColorPreview;