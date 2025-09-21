import React, { useRef } from 'react';
import { Camera, Upload, Palette, Sun, Moon } from 'lucide-react';

const WelcomeScreen = ({ userPhoto, onPhotoUpload, onReady, isDarkTheme, onToggleTheme }) => {
    const fileInputRef = useRef(null);

    return (
        <div className={`welcome-screen ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
            <div className="welcome-container">
                <div className="welcome-header">
                    <div className="welcome-title">
                        <h1>HueMe</h1>
                        <button onClick={onToggleTheme} className="theme-btn-welcome" title={isDarkTheme ? 'Светлая тема' : 'Темная тема'}>
                            {isDarkTheme ? <Sun className="theme-icon" /> : <Moon className="theme-icon" />}
                        </button>
                    </div>
                    <p>Найди свои идеальные цвета</p>
                </div>

                <div className="info-card">
                    <div className="info-header">
                        <Palette className="palette-icon" />
                        <h2>Подбери цвета, которые подходят именно тебе</h2>
                    </div>

                    <div className="instructions">
                        <div className="instruction-item">
                            <div className="step-number">1</div>
                            <p>Сделай фото без макияжа и украшений</p>
                        </div>
                        <div className="instruction-item">
                            <div className="step-number">2</div>
                            <p>Убери волосы с лица</p>
                        </div>
                        <div className="instruction-item">
                            <div className="step-number">3</div>
                            <p>Фотографируйся при естественном освещении (у окна)</p>
                        </div>
                    </div>
                </div>

                <div className="upload-card">
                    <h3>Загрузи свое фото</h3>

                    <div className="upload-buttons">
                        <button
                            className="upload-btn primary"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <Upload className="btn-icon" />
                            <span>Выбрать из галереи</span>
                        </button>

                        <button className="upload-btn secondary">
                            <Camera className="btn-icon" />
                            <span>Сделать фото</span>
                        </button>
                    </div>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={onPhotoUpload}
                        style={{ display: 'none' }}
                    />

                    {userPhoto && (
                        <div className="photo-preview">
                            <div className="preview-image">
                                <img src={userPhoto} alt="Uploaded" />
                            </div>
                            <button onClick={onReady} className="ready-btn">
                                Я готова! ✨
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WelcomeScreen;