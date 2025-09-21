import React, { useState, useRef, useEffect } from 'react';
import { Heart, Star, Sun, Snowflake } from 'lucide-react';
import WelcomeScreen from './WelcomeScreen';
import Header from './Header';
import ColorPreview from './ColorPreview';
import ControlsPanel from './ControlsPanel';
import PaletteScreen from './PaletteScreen';
import './HueMe.css';

const HueMeApp = () => {
    const [currentStep, setCurrentStep] = useState('welcome');
    const [userPhoto, setUserPhoto] = useState(null);
    const [selectedColor, setSelectedColor] = useState('#FF6B9D');
    const [tempColor, setTempColor] = useState('#FF6B9D');
    const [savedColors, setSavedColors] = useState([]);
    const [selectedColorType, setSelectedColorType] = useState('');
    const [photoTransform, setPhotoTransform] = useState({ scale: 1, x: 0, y: 0 });
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
    const [isDarkTheme, setIsDarkTheme] = useState(() => {
        // Инициализируем тему сразу из localStorage
        const savedTheme = localStorage.getItem('hueme-theme');
        return savedTheme === 'dark';
    });
    const [isThemeLoaded, setIsThemeLoaded] = useState(false);
    const photoRef = useRef(null);
    const canvasRef = useRef(null);

    // Цветовые типажи
    const colorTypes = {
        'my-colors': {
            name: 'Ваши цвета',
            colors: savedColors.slice(0, 20),
            icon: Heart
        },
        'cold-winter': {
            name: 'Холодная зима',
            colors: [
                '#000080', '#8B0000', '#4B0082', '#2F4F4F', '#191970',
                '#483D8B', '#800080', '#8B008B', '#9400D3', '#4169E1',
                '#0000CD', '#00008B', '#6A5ACD', '#7B68EE', '#9370DB',
                '#8A2BE2', '#9932CC', '#BA55D3', '#DA70D6', '#EE82EE',
                '#DDA0DD', '#D8BFD8', '#E6E6FA', '#F8F8FF', '#000000'
            ],
            icon: Snowflake
        },
        'warm-winter': {
            name: 'Теплая зима',
            colors: [
                '#800000', '#8B4513', '#2F4F4F', '#4682B4', '#483D8B',
                '#A0522D', '#8B0000', '#B22222', '#DC143C', '#CD5C5C',
                '#F08080', '#FA8072', '#E9967A', '#FFA07A', '#FF7F50',
                '#FF6347', '#FF4500', '#FF8C00', '#FFA500', '#FFD700',
                '#FFFF00', '#ADFF2F', '#7FFF00', '#32CD32', '#00FF00'
            ],
            icon: Snowflake
        },
        'cold-spring': {
            name: 'Холодная весна',
            colors: [
                '#FFB6C1', '#98FB98', '#87CEEB', '#DDA0DD', '#F0E68C',
                '#AFEEEE', '#E0FFFF', '#F0F8FF', '#F5FFFA', '#F0FFF0',
                '#FFFACD', '#FFEFD5', '#FFE4E1', '#FFF0F5', '#F8F8FF',
                '#E6E6FA', '#FDF5E6', '#FFFAF0', '#F5F5DC', '#FAEBD7',
                '#FAF0E6', '#FFF8DC', '#FFFFF0', '#FFFAFA', '#F0FFFF'
            ],
            icon: Star
        },
        'warm-spring': {
            name: 'Теплая весна',
            colors: [
                '#FFA500', '#FF6347', '#32CD32', '#FFD700', '#FF69B4',
                '#FF1493', '#FF00FF', '#8A2BE2', '#9400D3', '#4B0082',
                '#8B008B', '#800080', '#FF8C00', '#FF7F50', '#FF4500',
                '#FF0000', '#DC143C', '#B22222', '#A52A2A', '#D2691E',
                '#CD853F', '#F4A460', '#DEB887', '#D2B48C', '#BC8F8F'
            ],
            icon: Sun
        },
        'cold-summer': {
            name: 'Холодное лето',
            colors: [
                '#B0C4DE', '#DDA0DD', '#F0F8FF', '#E6E6FA', '#D8BFD8',
                '#C71585', '#DB7093', '#FF69B4', '#FF1493', '#DC143C',
                '#B22222', '#A0522D', '#CD853F', '#D2691E', '#F4A460',
                '#DEB887', '#BC8F8F', '#F5DEB3', '#FFE4C4', '#FFDEAD',
                '#FFFACD', '#EEDD82', '#F0E68C', '#BDB76B', '#9ACD32'
            ],
            icon: Snowflake
        },
        'warm-summer': {
            name: 'Теплое лето',
            colors: [
                '#F5DEB3', '#DEB887', '#CD853F', '#D2691E', '#BC8F8F',
                '#F4A460', '#D2B48C', '#A0522D', '#8B4513', '#800000',
                '#B22222', '#DC143C', '#FF0000', '#FF4500', '#FF6347',
                '#FF7F50', '#FF8C00', '#FFA500', '#FFD700', '#F0E68C',
                '#BDB76B', '#9ACD32', '#6B8E23', '#556B2F', '#8FBC8F'
            ],
            icon: Sun
        },
        'cold-autumn': {
            name: 'Холодная осень',
            colors: [
                '#800000', '#A0522D', '#8B4513', '#D2691E', '#B22222',
                '#DC143C', '#FF0000', '#FF4500', '#FF6347', '#FF7F50',
                '#FF8C00', '#FFA500', '#FFD700', '#FFFF00', '#ADFF2F',
                '#7FFF00', '#32CD32', '#00FF00', '#00FF7F', '#00FFFF',
                '#00BFFF', '#0080FF', '#0000FF', '#8000FF', '#FF00FF'
            ],
            icon: Star
        },
        'warm-autumn': {
            name: 'Теплая осень',
            colors: [
                '#FF8C00', '#FF4500', '#B8860B', '#DAA520', '#CD853F',
                '#D2691E', '#A0522D', '#8B4513', '#B22222', '#DC143C',
                '#FF0000', '#FF6347', '#FF7F50', '#FFA500', '#FFD700',
                '#F0E68C', '#BDB76B', '#9ACD32', '#6B8E23', '#556B2F',
                '#8FBC8F', '#90EE90', '#98FB98', '#00FF7F', '#32CD32'
            ],
            icon: Sun
        }
    };

    const popularColors = [
        '#FF6B9D', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57',
        '#FF9FF3', '#54A0FF', '#5F27CD', '#00D2D3', '#FF9F43',
        '#C44569', '#F8B500', '#6C5CE7', '#A29BFE', '#FD79A8',
        '#E17055', '#00B894', '#FDCB6E', '#6C5CE7', '#E84393'
    ];

    // Загрузка из localStorage
    useEffect(() => {
        try {
            console.log('Загружаем данные из localStorage...');

            const savedStep = localStorage.getItem('hueme-step');
            const savedPhoto = localStorage.getItem('hueme-photo');
            const savedColorsData = localStorage.getItem('hueme-saved-colors');
            const savedTransform = localStorage.getItem('hueme-photo-transform');
            const savedTheme = localStorage.getItem('hueme-theme');

            console.log('Найденные данные:', {
                step: savedStep,
                photo: !!savedPhoto,
                colors: savedColorsData,
                transform: !!savedTransform,
                theme: savedTheme
            });

            // Применяем тему к body (уже загружена в состояние)
            document.body.className = isDarkTheme ? 'dark-theme' : 'light-theme';
            console.log('Применена тема:', isDarkTheme ? 'dark' : 'light');

            // Отмечаем что тема загружена
            setIsThemeLoaded(true);

            if (savedStep && savedPhoto) {
                setCurrentStep(savedStep);
                setUserPhoto(savedPhoto);
                console.log('Восстановлены step и фото');
            }

            if (savedColorsData && savedColorsData !== 'undefined' && savedColorsData !== 'null') {
                try {
                    const colors = JSON.parse(savedColorsData);
                    if (Array.isArray(colors) && colors.length > 0) {
                        setSavedColors(colors);
                        console.log('Восстановлено цветов:', colors.length);
                    }
                } catch (parseError) {
                    console.error('Ошибка парсинга цветов:', parseError);
                    localStorage.removeItem('hueme-saved-colors');
                }
            }

            if (savedTransform && savedTransform !== 'undefined') {
                try {
                    const transform = JSON.parse(savedTransform);
                    setPhotoTransform(transform);
                } catch (parseError) {
                    console.error('Ошибка парсинга трансформации:', parseError);
                    localStorage.removeItem('hueme-photo-transform');
                }
            }
        } catch (error) {
            console.error('Ошибка загрузки из localStorage:', error);
        }
    }, [isDarkTheme]);

    // Сохранение в localStorage
    useEffect(() => {
        if (currentStep !== 'welcome') {
            localStorage.setItem('hueme-step', currentStep);
        }
    }, [currentStep]);

    useEffect(() => {
        if (userPhoto) {
            localStorage.setItem('hueme-photo', userPhoto);
        }
    }, [userPhoto]);

    useEffect(() => {
        try {
            localStorage.setItem('hueme-saved-colors', JSON.stringify(savedColors));
        } catch (error) {
            console.error('Ошибка сохранения цветов:', error);
        }
    }, [savedColors]);

    useEffect(() => {
        try {
            localStorage.setItem('hueme-photo-transform', JSON.stringify(photoTransform));
        } catch (error) {
            console.error('Ошибка сохранения трансформации:', error);
        }
    }, [photoTransform]);

    // Сохранение темы
    useEffect(() => {
        if (isThemeLoaded) {
            localStorage.setItem('hueme-theme', isDarkTheme ? 'dark' : 'light');
            document.body.className = isDarkTheme ? 'dark-theme' : 'light-theme';
            console.log('Тема сохранена:', isDarkTheme ? 'dark' : 'light');
        }
    }, [isDarkTheme, isThemeLoaded]);

    // Обработчики событий
    const handlePhotoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setUserPhoto(e.target.result);
                setPhotoTransform({ scale: 1, x: 0, y: 0 });
            };
            reader.readAsDataURL(file);
        }
    };

    const saveColor = (color) => {
        if (!savedColors.includes(color)) {
            const newColors = [...savedColors, color];
            setSavedColors(newColors);

            // Принудительно сохраняем
            try {
                localStorage.setItem('hueme-saved-colors', JSON.stringify(newColors));
                console.log('Цвет сохранен:', color, 'Всего:', newColors.length);
            } catch (error) {
                console.error('Ошибка сохранения цвета:', error);
            }
        }
    };

    const removeColor = (colorToRemove) => {
        setSavedColors(savedColors.filter(color => color !== colorToRemove));
    };

    const clearAllColors = () => {
        setSavedColors([]);
        localStorage.removeItem('hueme-saved-colors');
    };

    const changePhoto = () => {
        setCurrentStep('welcome');
        setUserPhoto(null);
        setPhotoTransform({ scale: 1, x: 0, y: 0 });
    };

    const resetPhotoPosition = () => {
        setPhotoTransform({ scale: 1, x: 0, y: 0 });
    };

    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    };

    const applyCustomColor = () => {
        setSelectedColor(tempColor);
        setIsColorPickerOpen(false);
    };

    const cancelCustomColor = () => {
        setTempColor(selectedColor);
        setIsColorPickerOpen(false);
    };

    // Функция для ограничения трансформации фото
    const constrainPhotoTransform = (newTransform) => {
        const { scale, x, y } = newTransform;

        // Минимальный масштаб - 1 (исходный размер)
        const constrainedScale = Math.max(1, Math.min(3, scale));

        // Размеры овала в пикселях (примерно)
        const ovalWidth = 192; // 12rem = 192px
        const ovalHeight = 240; // 15rem = 240px

        // Вычисляем максимальное смещение с учетом масштаба
        const scaledImageWidth = ovalWidth * constrainedScale;
        const scaledImageHeight = ovalHeight * constrainedScale;

        // Максимальное смещение = (размер увеличенного изображения - размер овала) / 2
        const maxOffsetX = Math.max(0, (scaledImageWidth - ovalWidth) / 2);
        const maxOffsetY = Math.max(0, (scaledImageHeight - ovalHeight) / 2);

        // Ограничиваем смещение
        const constrainedX = Math.max(-maxOffsetX, Math.min(maxOffsetX, x));
        const constrainedY = Math.max(-maxOffsetY, Math.min(maxOffsetY, y));

        return {
            scale: constrainedScale,
            x: constrainedX,
            y: constrainedY
        };
    };
    // Обработчики для управления фото
    const handleTouchStart = (e) => {
        if (!photoRef.current) return;

        if (e.touches.length === 2) {
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            const distance = Math.sqrt(
                Math.pow(touch2.clientX - touch1.clientX, 2) +
                Math.pow(touch2.clientY - touch1.clientY, 2)
            );
            photoRef.current.startDistance = distance;
            photoRef.current.startScale = photoTransform.scale;
        } else if (e.touches.length === 1) {
            photoRef.current.startX = e.touches[0].clientX - photoTransform.x;
            photoRef.current.startY = e.touches[0].clientY - photoTransform.y;
            photoRef.current.isDragging = true;
        }
    };

    const handleTouchMove = (e) => {
        if (!photoRef.current) return;

        if (e.touches.length === 2 && photoRef.current.startDistance) {
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            const distance = Math.sqrt(
                Math.pow(touch2.clientX - touch1.clientX, 2) +
                Math.pow(touch2.clientY - touch1.clientY, 2)
            );
            const newScale = (distance / photoRef.current.startDistance) * photoRef.current.startScale;
            const constrainedTransform = constrainPhotoTransform({
                scale: newScale,
                x: photoTransform.x,
                y: photoTransform.y
            });
            setPhotoTransform(constrainedTransform);
        } else if (e.touches.length === 1 && photoRef.current.isDragging) {
            const newX = e.touches[0].clientX - photoRef.current.startX;
            const newY = e.touches[0].clientY - photoRef.current.startY;
            const constrainedTransform = constrainPhotoTransform({
                scale: photoTransform.scale,
                x: newX,
                y: newY
            });
            setPhotoTransform(constrainedTransform);
        }
    };

    const handleTouchEnd = (e) => {
        if (photoRef.current) {
            photoRef.current.isDragging = false;
            photoRef.current.startDistance = null;
        }
    };

    const handleMouseDown = (e) => {
        if (!photoRef.current) return;
        photoRef.current.startX = e.clientX - photoTransform.x;
        photoRef.current.startY = e.clientY - photoTransform.y;
        photoRef.current.isDragging = true;
    };

    const handleMouseMove = (e) => {
        if (!photoRef.current || !photoRef.current.isDragging) return;
        const newX = e.clientX - photoRef.current.startX;
        const newY = e.clientY - photoRef.current.startY;
        const constrainedTransform = constrainPhotoTransform({
            scale: photoTransform.scale,
            x: newX,
            y: newY
        });
        setPhotoTransform(constrainedTransform);
    };

    const handleMouseUp = (e) => {
        if (photoRef.current) {
            photoRef.current.isDragging = false;
        }
    };

    const handleWheel = (e) => {
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        const newScale = photoTransform.scale + delta;
        const constrainedTransform = constrainPhotoTransform({
            scale: newScale,
            x: photoTransform.x,
            y: photoTransform.y
        });
        setPhotoTransform(constrainedTransform);
    };

    const saveImage = () => {
        if (!canvasRef.current || !userPhoto) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = () => {
            canvas.width = 400;
            canvas.height = 600;

            ctx.fillStyle = selectedColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const radiusX = 120;
            const radiusY = 150;

            ctx.save();
            ctx.beginPath();
            ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
            ctx.clip();

            ctx.translate(centerX, centerY);
            ctx.scale(photoTransform.scale, photoTransform.scale);
            ctx.translate(photoTransform.x / photoTransform.scale, photoTransform.y / photoTransform.scale);

            const imgWidth = radiusX * 2;
            const imgHeight = radiusY * 2;
            ctx.drawImage(img, -imgWidth/2, -imgHeight/2, imgWidth, imgHeight);

            ctx.restore();

            const link = document.createElement('a');
            link.download = 'hueme-result.png';
            link.href = canvas.toDataURL();
            link.click();
        };

        img.src = userPhoto;
    };

    // Объект с обработчиками для фото
    const photoHandlers = {
        ref: photoRef,
        onTouchStart: handleTouchStart,
        onTouchMove: handleTouchMove,
        onTouchEnd: handleTouchEnd,
        onMouseDown: handleMouseDown,
        onMouseMove: handleMouseMove,
        onMouseUp: handleMouseUp,
        onWheel: handleWheel
    };

    // Рендер экранов
    if (currentStep === 'welcome') {
        return (
            <WelcomeScreen
                userPhoto={userPhoto}
                onPhotoUpload={handlePhotoUpload}
                onReady={() => setCurrentStep('main')}
                isDarkTheme={isDarkTheme}
                onToggleTheme={toggleTheme}
            />
        );
    }

    if (currentStep === 'palette') {
        return (
            <PaletteScreen
                savedColors={savedColors}
                onBack={() => setCurrentStep('main')}
                onClearAll={clearAllColors}
                onRemoveColor={removeColor}
                onSelectColor={(color) => {
                    setSelectedColor(color);
                    setCurrentStep('main');
                }}
                isDarkTheme={isDarkTheme}
                onToggleTheme={toggleTheme}
            />
        );
    }

    return (
        <div className={`main-screen ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
            <Header
                onChangePhoto={changePhoto}
                savedColorsCount={savedColors.length}
                onShowPalette={() => setCurrentStep('palette')}
                isDarkTheme={isDarkTheme}
                onToggleTheme={toggleTheme}
            />

            <ColorPreview
                selectedColor={selectedColor}
                userPhoto={userPhoto}
                photoTransform={photoTransform}
                onSaveColor={saveColor}
                onResetPhoto={resetPhotoPosition}
                onSaveImage={saveImage}
                photoHandlers={photoHandlers}
            />

            <ControlsPanel
                colorTypes={colorTypes}
                selectedColorType={selectedColorType}
                selectedColor={selectedColor}
                tempColor={tempColor}
                isColorPickerOpen={isColorPickerOpen}
                popularColors={popularColors}
                onSelectColorType={setSelectedColorType}
                onSelectColor={setSelectedColor}
                onOpenColorPicker={() => {
                    setTempColor(selectedColor);
                    setIsColorPickerOpen(true);
                }}
                onColorChange={(e) => setTempColor(e.target.value)}
                onApplyColor={applyCustomColor}
                onCancelColor={cancelCustomColor}
            />

            <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
    );
};

export default HueMeApp;