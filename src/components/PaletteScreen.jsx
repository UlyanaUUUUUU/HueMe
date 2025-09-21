import React from 'react';
import { Heart, RotateCcw, Trash2, Sun, Moon } from 'lucide-react';

const PaletteScreen = ({
                           savedColors,
                           onBack,
                           onClearAll,
                           onRemoveColor,
                           onSelectColor,
                           isDarkTheme,
                           onToggleTheme
                       }) => (
    <div className={`palette-screen ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
        <div className="header">
            <div className="header-content">
                <button onClick={onBack} className="back-btn">
                    ← Назад
                </button>
                <h1>Моя палитра</h1>
                <div className="header-actions">
                    <button onClick={onToggleTheme} className="theme-btn" title={isDarkTheme ? 'Светлая тема' : 'Темная тема'}>
                        {isDarkTheme ? <Sun className="theme-icon" /> : <Moon className="theme-icon" />}
                    </button>
                    {savedColors.length > 0 && (
                        <button onClick={onClearAll} className="clear-btn">
                            <RotateCcw className="clear-icon" />
                        </button>
                    )}
                </div>
            </div>
        </div>

        <div className="palette-content">
            {savedColors.length === 0 ? (
                <div className="empty-palette">
                    <Heart className="empty-icon" />
                    <p>Пока нет сохраненных цветов</p>
                    <p className="empty-subtitle">
                        Нажми на ❤️ в главном экране, чтобы сохранить понравившиеся цвета
                    </p>
                </div>
            ) : (
                <div className="saved-colors">
                    {savedColors.map((color, index) => (
                        <div key={index} className="saved-color-item">
                            <div
                                className="saved-color-preview"
                                style={{ backgroundColor: color }}
                                onClick={() => onSelectColor(color)}
                            />
                            <p className="saved-color-code">{color}</p>
                            <button
                                onClick={() => onRemoveColor(color)}
                                className="remove-color-btn"
                            >
                                <Trash2 className="trash-icon" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
);

export default PaletteScreen;