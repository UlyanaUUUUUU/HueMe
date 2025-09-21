import React from 'react';
import { Edit3, Heart, Sun, Moon } from 'lucide-react';

const Header = ({ onChangePhoto, savedColorsCount, onShowPalette, isDarkTheme, onToggleTheme }) => (
    <div className="header">
        <div className="header-content">
            <button onClick={onChangePhoto} className="change-photo-btn">
                <Edit3 className="edit-icon" />
            </button>
            <h1>HueMe</h1>
            <div className="header-actions">
                <button onClick={onToggleTheme} className="theme-btn" title={isDarkTheme ? 'Светлая тема' : 'Темная тема'}>
                    {isDarkTheme ? <Sun className="theme-icon" /> : <Moon className="theme-icon" />}
                </button>
                <button onClick={onShowPalette} className="palette-btn">
                    <Heart className="heart-icon" />
                    <span>{savedColorsCount}</span>
                </button>
            </div>
        </div>
    </div>
);

export default Header;