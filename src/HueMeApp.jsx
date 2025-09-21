// import React, { useState, useRef, useEffect } from 'react';
// import { Camera, Upload, Palette, Save, Download, RefreshCw, Heart, Star, Sun, Snowflake, Edit3, Trash2, RotateCcw, Check, X } from 'lucide-react';
// import './HueMe.css';
//
// const HueMeApp = () => {
//     const [currentStep, setCurrentStep] = useState('welcome');
//     const [userPhoto, setUserPhoto] = useState(null);
//     const [selectedColor, setSelectedColor] = useState('#FF6B9D');
//     const [tempColor, setTempColor] = useState('#FF6B9D');
//     const [savedColors, setSavedColors] = useState([]);
//     const [selectedColorType, setSelectedColorType] = useState('');
//     const [photoTransform, setPhotoTransform] = useState({ scale: 1, x: 0, y: 0 });
//     const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
//     const fileInputRef = useRef(null);
//     const canvasRef = useRef(null);
//     const photoRef = useRef(null);
//
//     // Загрузка данных из localStorage при инициализации
//     useEffect(() => {
//         try {
//             // Проверяем доступность localStorage
//             if (typeof Storage === "undefined") {
//                 console.error('localStorage не поддерживается');
//                 return;
//             }
//
//             console.log('Проверяем localStorage...');
//
//             const savedStep = localStorage.getItem('hueme-step');
//             const savedPhoto = localStorage.getItem('hueme-photo');
//             const savedColorsData = localStorage.getItem('hueme-saved-colors');
//             const savedTransform = localStorage.getItem('hueme-photo-transform');
//
//             console.log('Данные из localStorage:', {
//                 savedStep,
//                 savedPhoto: !!savedPhoto,
//                 savedColorsData,
//                 savedTransform: !!savedTransform
//             });
//
//             if (savedStep && savedPhoto) {
//                 setCurrentStep(savedStep);
//                 setUserPhoto(savedPhoto);
//                 console.log('Восстановлен step и фото');
//             }
//
//             if (savedColorsData && savedColorsData !== 'undefined' && savedColorsData !== 'null') {
//                 try {
//                     const colors = JSON.parse(savedColorsData);
//                     console.log('Парсим цвета:', colors);
//                     if (Array.isArray(colors) && colors.length > 0) {
//                         setSavedColors(colors);
//                         console.log('Загружены цвета:', colors);
//                     }
//                 } catch (parseError) {
//                     console.error('Ошибка парсинга цветов:', parseError);
//                     localStorage.removeItem('hueme-saved-colors');
//                 }
//             }
//
//             if (savedTransform && savedTransform !== 'undefined') {
//                 try {
//                     const transform = JSON.parse(savedTransform);
//                     setPhotoTransform(transform);
//                 } catch (parseError) {
//                     console.error('Ошибка парсинга трансформации:', parseError);
//                     localStorage.removeItem('hueme-photo-transform');
//                 }
//             }
//         } catch (error) {
//             console.error('Общая ошибка загрузки из localStorage:', error);
//             // Очищаем поврежденные данные
//             localStorage.removeItem('hueme-saved-colors');
//             localStorage.removeItem('hueme-photo-transform');
//         }
//     }, []);
//
//     // Сохранение данных в localStorage
//     useEffect(() => {
//         if (currentStep !== 'welcome') {
//             localStorage.setItem('hueme-step', currentStep);
//             console.log('Сохранен step:', currentStep);
//         }
//     }, [currentStep]);
//
//     useEffect(() => {
//         if (userPhoto) {
//             localStorage.setItem('hueme-photo', userPhoto);
//             console.log('Сохранено фото');
//         }
//     }, [userPhoto]);
//
//     useEffect(() => {
//         try {
//             localStorage.setItem('hueme-saved-colors', JSON.stringify(savedColors));
//             console.log('Сохранены цвета:', savedColors);
//         } catch (error) {
//             console.error('Ошибка сохранения цветов:', error);
//         }
//     }, [savedColors]);
//
//     useEffect(() => {
//         try {
//             localStorage.setItem('hueme-photo-transform', JSON.stringify(photoTransform));
//         } catch (error) {
//             console.error('Ошибка сохранения трансформации:', error);
//         }
//     }, [photoTransform]);
//
//     // Расширенные цветовые типажи
//     const colorTypes = {
//         'my-colors': {
//             name: 'Ваши цвета',
//             colors: savedColors.slice(0, 20),
//             icon: Heart
//         },
//         'cold-winter': {
//             name: 'Холодная зима',
//             colors: [
//                 '#000080', '#8B0000', '#4B0082', '#2F4F4F', '#191970',
//                 '#483D8B', '#800080', '#8B008B', '#9400D3', '#4169E1',
//                 '#0000CD', '#00008B', '#000080', '#6A5ACD', '#7B68EE',
//                 '#9370DB', '#8A2BE2', '#9932CC', '#BA55D3', '#DA70D6',
//                 '#EE82EE', '#DDA0DD', '#D8BFD8', '#E6E6FA', '#F8F8FF'
//             ],
//             icon: Snowflake
//         },
//         'warm-winter': {
//             name: 'Теплая зима',
//             colors: [
//                 '#800000', '#8B4513', '#2F4F4F', '#4682B4', '#483D8B',
//                 '#A0522D', '#8B0000', '#B22222', '#DC143C', '#CD5C5C',
//                 '#F08080', '#FA8072', '#E9967A', '#FFA07A', '#FF7F50',
//                 '#FF6347', '#FF4500', '#FF8C00', '#FFA500', '#FFD700',
//                 '#FFFF00', '#ADFF2F', '#7FFF00', '#32CD32', '#00FF00'
//             ],
//             icon: Snowflake
//         },
//         'cold-spring': {
//             name: 'Холодная весна',
//             colors: [
//                 '#FFB6C1', '#98FB98', '#87CEEB', '#DDA0DD', '#F0E68C',
//                 '#AFEEEE', '#E0FFFF', '#F0F8FF', '#F5FFFA', '#F0FFF0',
//                 '#FFFACD', '#FFEFD5', '#FFE4E1', '#FFF0F5', '#F8F8FF',
//                 '#E6E6FA', '#FDF5E6', '#FFFAF0', '#F5F5DC', '#FDF5E6',
//                 '#FAEBD7', '#FAF0E6', '#FFF8DC', '#FFFFF0', '#FFFAFA'
//             ],
//             icon: Star
//         },
//         'warm-spring': {
//             name: 'Теплая весна',
//             colors: [
//                 '#FFA500', '#FF6347', '#32CD32', '#FFD700', '#FF69B4',
//                 '#FF1493', '#FF00FF', '#8A2BE2', '#9400D3', '#4B0082',
//                 '#8B008B', '#800080', '#FF8C00', '#FF7F50', '#FF6347',
//                 '#FF4500', '#FF0000', '#DC143C', '#B22222', '#8B0000',
//                 '#A52A2A', '#800000', '#D2691E', '#CD853F', '#F4A460'
//             ],
//             icon: Sun
//         },
//         'cold-summer': {
//             name: 'Холодное лето',
//             colors: [
//                 '#B0C4DE', '#DDA0DD', '#F0F8FF', '#E6E6FA', '#D8BFD8',
//                 '#C71585', '#DB7093', '#FF69B4', '#FF1493', '#DC143C',
//                 '#B22222', '#8B0000', '#A0522D', '#CD853F', '#D2691E',
//                 '#F4A460', '#DEB887', '#BC8F8F', '#F5DEB3', '#FFE4C4',
//                 '#FFDEAD', '#F5DEB3', '#DEB887', '#D2B48C', '#BC8F8F'
//             ],
//             icon: Snowflake
//         },
//         'warm-summer': {
//             name: 'Теплое лето',
//             colors: [
//                 '#F5DEB3', '#DEB887', '#CD853F', '#D2691E', '#BC8F8F',
//                 '#F4A460', '#DEB887', '#D2B48C', '#BC8F8F', '#A0522D',
//                 '#8B4513', '#D2691E', '#CD853F', '#F4A460', '#DEB887',
//                 '#D2B48C', '#BC8F8F', '#F5DEB3', '#FFE4C4', '#FFDEAD',
//                 '#F5DEB3', '#DEB887', '#D2B48C', '#BC8F8F', '#A0522D'
//             ],
//             icon: Sun
//         },
//         'cold-autumn': {
//             name: 'Холодная осень',
//             colors: [
//                 '#800000', '#A0522D', '#8B4513', '#D2691E', '#B22222',
//                 '#DC143C', '#FF0000', '#FF4500', '#FF6347', '#FF7F50',
//                 '#FF8C00', '#FFA500', '#FFD700', '#FFFF00', '#ADFF2F',
//                 '#7FFF00', '#32CD32', '#00FF00', '#00FF7F', '#00FFFF',
//                 '#00BFFF', '#0080FF', '#0000FF', '#8000FF', '#FF00FF'
//             ],
//             icon: Star
//         },
//         'warm-autumn': {
//             name: 'Теплая осень',
//             colors: [
//                 '#FF8C00', '#FF4500', '#B8860B', '#DAA520', '#CD853F',
//                 '#D2691E', '#A0522D', '#8B4513', '#800000', '#B22222',
//                 '#DC143C', '#FF0000', '#FF4500', '#FF6347', '#FF7F50',
//                 '#FF8C00', '#FFA500', '#FFD700', '#F0E68C', '#BDB76B',
//                 '#9ACD32', '#6B8E23', '#556B2F', '#8FBC8F', '#90EE90'
//             ],
//             icon: Sun
//         }
//     };
//
//     const popularColors = [
//         '#FF6B9D', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57',
//         '#FF9FF3', '#54A0FF', '#5F27CD', '#00D2D3', '#FF9F43',
//         '#C44569', '#F8B500', '#6C5CE7', '#A29BFE', '#FD79A8',
//         '#E17055', '#00B894', '#FDCB6E', '#6C5CE7', '#E84393'
//     ];
//
//     const handlePhotoUpload = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onload = (e) => {
//                 setUserPhoto(e.target.result);
//                 setPhotoTransform({ scale: 1, x: 0, y: 0 }); // Сброс трансформации для нового фото
//             };
//             reader.readAsDataURL(file);
//         }
//     };
//
//     const saveColor = (color) => {
//         if (!savedColors.includes(color)) {
//             const newColors = [...savedColors, color];
//             setSavedColors(newColors);
//             // Принудительно сохраняем сразу
//             try {
//                 localStorage.setItem('hueme-saved-colors', JSON.stringify(newColors));
//                 console.log('Цвет сохранен:', color, 'Всего цветов:', newColors.length);
//             } catch (error) {
//                 console.error('Ошибка сохранения цвета:', error);
//             }
//         }
//     };
//
//     const removeColor = (colorToRemove) => {
//         setSavedColors(savedColors.filter(color => color !== colorToRemove));
//     };
//
//     const clearAllColors = () => {
//         setSavedColors([]);
//         localStorage.removeItem('hueme-saved-colors');
//         console.log('Все цвета удалены');
//     };
//
//     // Функция для тестирования localStorage
//     const testLocalStorage = () => {
//         try {
//             const testKey = 'hueme-test';
//             const testValue = 'test-data';
//             localStorage.setItem(testKey, testValue);
//             const retrieved = localStorage.getItem(testKey);
//             localStorage.removeItem(testKey);
//
//             if (retrieved === testValue) {
//                 console.log('✅ localStorage работает нормально');
//                 alert('localStorage работает нормально');
//             } else {
//                 console.log('❌ localStorage не работает');
//                 alert('localStorage не работает');
//             }
//         } catch (error) {
//             console.error('❌ Ошибка localStorage:', error);
//             alert('Ошибка localStorage: ' + error.message);
//         }
//     };
//
//     const changePhoto = () => {
//         setCurrentStep('welcome');
//         setUserPhoto(null);
//         setPhotoTransform({ scale: 1, x: 0, y: 0 });
//     };
//
//     const applyCustomColor = () => {
//         setSelectedColor(tempColor);
//         setIsColorPickerOpen(false);
//     };
//
//     const cancelCustomColor = () => {
//         setTempColor(selectedColor);
//         setIsColorPickerOpen(false);
//     };
//
//     // Обработчики для масштабирования и перемещения фото
//     const handleTouchStart = (e) => {
//         e.preventDefault();
//         if (e.touches.length === 2) {
//             const touch1 = e.touches[0];
//             const touch2 = e.touches[1];
//             const distance = Math.sqrt(
//                 Math.pow(touch2.clientX - touch1.clientX, 2) +
//                 Math.pow(touch2.clientY - touch1.clientY, 2)
//             );
//             photoRef.current.startDistance = distance;
//             photoRef.current.startScale = photoTransform.scale;
//         } else if (e.touches.length === 1) {
//             photoRef.current.startX = e.touches[0].clientX - photoTransform.x;
//             photoRef.current.startY = e.touches[0].clientY - photoTransform.y;
//             photoRef.current.isDragging = true;
//         }
//     };
//
//     const handleTouchMove = (e) => {
//         e.preventDefault();
//         if (!photoRef.current) return;
//
//         if (e.touches.length === 2 && photoRef.current.startDistance) {
//             // Масштабирование двумя пальцами
//             const touch1 = e.touches[0];
//             const touch2 = e.touches[1];
//             const distance = Math.sqrt(
//                 Math.pow(touch2.clientX - touch1.clientX, 2) +
//                 Math.pow(touch2.clientY - touch1.clientY, 2)
//             );
//             const scale = Math.max(0.5, Math.min(3, (distance / photoRef.current.startDistance) * photoRef.current.startScale));
//             setPhotoTransform(prev => ({ ...prev, scale }));
//         } else if (e.touches.length === 1 && photoRef.current.isDragging) {
//             // Перемещение одним пальцем
//             const newX = e.touches[0].clientX - photoRef.current.startX;
//             const newY = e.touches[0].clientY - photoRef.current.startY;
//             setPhotoTransform(prev => ({ ...prev, x: newX, y: newY }));
//         }
//     };
//
//     const handleTouchEnd = () => {
//         if (photoRef.current) {
//             photoRef.current.isDragging = false;
//             photoRef.current.startDistance = null;
//         }
//     };
//
//     // Поддержка мыши для тестирования
//     const handleMouseDown = (e) => {
//         e.preventDefault();
//         if (!photoRef.current) return;
//         photoRef.current.startX = e.clientX - photoTransform.x;
//         photoRef.current.startY = e.clientY - photoTransform.y;
//         photoRef.current.isDragging = true;
//     };
//
//     const handleMouseMove = (e) => {
//         e.preventDefault();
//         if (!photoRef.current || !photoRef.current.isDragging) return;
//         const newX = e.clientX - photoRef.current.startX;
//         const newY = e.clientY - photoRef.current.startY;
//         setPhotoTransform(prev => ({ ...prev, x: newX, y: newY }));
//     };
//
//     const handleMouseUp = () => {
//         if (photoRef.current) {
//             photoRef.current.isDragging = false;
//         }
//     };
//
//     const resetPhotoPosition = () => {
//         setPhotoTransform({ scale: 1, x: 0, y: 0 });
//     };
//
//     const handleWheel = (e) => {
//         e.preventDefault();
//         const delta = e.deltaY > 0 ? -0.1 : 0.1;
//         const newScale = Math.max(0.5, Math.min(3, photoTransform.scale + delta));
//         setPhotoTransform(prev => ({ ...prev, scale: newScale }));
//     };
//
//     const saveImage = () => {
//         if (!canvasRef.current || !userPhoto) return;
//
//         const canvas = canvasRef.current;
//         const ctx = canvas.getContext('2d');
//         const img = new Image();
//
//         img.onload = () => {
//             canvas.width = 400;
//             canvas.height = 600;
//
//             // Фоновый цвет
//             ctx.fillStyle = selectedColor;
//             ctx.fillRect(0, 0, canvas.width, canvas.height);
//
//             // Размеры и позиция овала
//             const centerX = canvas.width / 2;
//             const centerY = canvas.height / 2;
//             const radiusX = 120;
//             const radiusY = 150;
//
//             // Создаем маску овала
//             ctx.save();
//             ctx.beginPath();
//             ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
//             ctx.clip();
//
//             // Применяем трансформации фото
//             ctx.translate(centerX, centerY);
//             ctx.scale(photoTransform.scale, photoTransform.scale);
//             ctx.translate(photoTransform.x / photoTransform.scale, photoTransform.y / photoTransform.scale);
//
//             // Рисуем изображение
//             const imgWidth = radiusX * 2;
//             const imgHeight = radiusY * 2;
//             ctx.drawImage(img, -imgWidth/2, -imgHeight/2, imgWidth, imgHeight);
//
//             ctx.restore();
//
//             // Скачиваем результат
//             const link = document.createElement('a');
//             link.download = 'hueme-result.png';
//             link.href = canvas.toDataURL();
//             link.click();
//         };
//
//         img.src = userPhoto;
//     };
//
//     const WelcomeScreen = () => (
//         <div className="welcome-screen">
//             <div className="welcome-container">
//                 <div className="welcome-header">
//                     <h1>HueMe</h1>
//                     <p>Найди свои идеальные цвета</p>
//                 </div>
//
//                 <div className="info-card">
//                     <div className="info-header">
//                         <Palette className="palette-icon" />
//                         <h2>Подбери цвета, которые подходят именно тебе</h2>
//                     </div>
//
//                     <div className="instructions">
//                         <div className="instruction-item">
//                             <div className="step-number">1</div>
//                             <p>Сделай фото без макияжа и украшений</p>
//                         </div>
//                         <div className="instruction-item">
//                             <div className="step-number">2</div>
//                             <p>Убери волосы с лица</p>
//                         </div>
//                         <div className="instruction-item">
//                             <div className="step-number">3</div>
//                             <p>Фотографируйся при естественном освещении (у окна)</p>
//                         </div>
//                     </div>
//                 </div>
//
//                 <div className="upload-card">
//                     <h3>Загрузи свое фото</h3>
//
//                     <div className="upload-buttons">
//                         <button
//                             className="upload-btn primary"
//                             onClick={() => fileInputRef.current?.click()}
//                         >
//                             <Upload className="btn-icon" />
//                             <span>Выбрать из галереи</span>
//                         </button>
//
//                         <button className="upload-btn secondary">
//                             <Camera className="btn-icon" />
//                             <span>Сделать фото</span>
//                         </button>
//                     </div>
//
//                     <input
//                         ref={fileInputRef}
//                         type="file"
//                         accept="image/*"
//                         onChange={handlePhotoUpload}
//                         style={{ display: 'none' }}
//                     />
//
//                     {userPhoto && (
//                         <div className="photo-preview">
//                             <div className="preview-image">
//                                 <img src={userPhoto} alt="Uploaded" />
//                             </div>
//                             <button
//                                 onClick={() => setCurrentStep('main')}
//                                 className="ready-btn"
//                             >
//                                 Я готова! ✨
//                             </button>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
//
//     const MainScreen = () => (
//         <div className="main-screen">
//             <div className="header">
//                 <div className="header-content">
//                     <button onClick={changePhoto} className="change-photo-btn">
//                         <Edit3 className="edit-icon" />
//                     </button>
//                     <h1>HueMe</h1>
//                     <button
//                         onClick={() => setCurrentStep('palette')}
//                         className="palette-btn"
//                     >
//                         <Heart className="heart-icon" />
//                         <span>{savedColors.length}</span>
//                     </button>
//                 </div>
//             </div>
//
//             <div className="color-preview" style={{ backgroundColor: selectedColor }}>
//                 {userPhoto && (
//                     <div className="face-oval">
//                         <img
//                             src={userPhoto}
//                             alt="User"
//                             ref={photoRef}
//                             onTouchStart={handleTouchStart}
//                             onTouchMove={handleTouchMove}
//                             onTouchEnd={handleTouchEnd}
//                             onMouseDown={handleMouseDown}
//                             onMouseMove={handleMouseMove}
//                             onMouseUp={handleMouseUp}
//                             onWheel={handleWheel}
//                             style={{
//                                 transform: `translate(${photoTransform.x}px, ${photoTransform.y}px) scale(${photoTransform.scale})`,
//                                 transformOrigin: 'center center',
//                                 touchAction: 'none'
//                             }}
//                             draggable={false}
//                         />
//                     </div>
//                 )}
//
//                 <div className="action-buttons">
//                     <button
//                         onClick={() => saveColor(selectedColor)}
//                         className="action-btn"
//                         title="Сохранить цвет"
//                     >
//                         <Heart className="action-icon" />
//                     </button>
//                     <button
//                         onClick={resetPhotoPosition}
//                         className="action-btn"
//                         title="Сбросить позицию фото"
//                     >
//                         <RotateCcw className="action-icon" />
//                     </button>
//                     <button
//                         onClick={saveImage}
//                         className="action-btn"
//                         title="Скачать изображение"
//                     >
//                         <Download className="action-icon" />
//                     </button>
//                 </div>
//             </div>
//
//             <div className="controls-panel">
//                 <div className="panel-handle"></div>
//
//                 <div className="color-types">
//                     {Object.entries(colorTypes).map(([key, type]) => {
//                         const IconComponent = type.icon;
//                         // Пропускаем "Ваши цвета" если нет сохраненных цветов
//                         if (key === 'my-colors' && savedColors.length === 0) return null;
//
//                         return (
//                             <button
//                                 key={key}
//                                 onClick={() => setSelectedColorType(selectedColorType === key ? '' : key)}
//                                 className={`color-type-btn ${selectedColorType === key ? 'active' : ''}`}
//                             >
//                                 <IconComponent className="type-icon" />
//                                 <span>{type.name}</span>
//                             </button>
//                         );
//                     })}
//                 </div>
//
//                 <div className="color-grid">
//                     {(selectedColorType ? colorTypes[selectedColorType].colors : popularColors).map((color, index) => (
//                         <button
//                             key={index}
//                             onClick={() => setSelectedColor(color)}
//                             className={`color-btn ${selectedColor === color ? 'selected' : ''}`}
//                             style={{ backgroundColor: color }}
//                         />
//                     ))}
//                 </div>
//
//                 <div className="custom-color">
//                     <span>Свой цвет:</span>
//                     {!isColorPickerOpen ? (
//                         <button
//                             onClick={() => {
//                                 setTempColor(selectedColor);
//                                 setIsColorPickerOpen(true);
//                             }}
//                             className="color-preview-btn"
//                             style={{ backgroundColor: selectedColor }}
//                         />
//                     ) : (
//                         <div className="color-picker-group">
//                             <input
//                                 type="color"
//                                 value={tempColor}
//                                 onChange={(e) => setTempColor(e.target.value)}
//                                 className="color-picker"
//                             />
//                             <button onClick={applyCustomColor} className="color-action-btn apply">
//                                 <Check className="action-icon-small" />
//                             </button>
//                             <button onClick={cancelCustomColor} className="color-action-btn cancel">
//                                 <X className="action-icon-small" />
//                             </button>
//                         </div>
//                     )}
//                     <span className="color-code">{selectedColor}</span>
//                 </div>
//             </div>
//
//             <canvas ref={canvasRef} style={{ display: 'none' }} />
//         </div>
//     );
//
//     const PaletteScreen = () => (
//         <div className="palette-screen">
//             <div className="header">
//                 <div className="header-content">
//                     <button
//                         onClick={() => setCurrentStep('main')}
//                         className="back-btn"
//                     >
//                         ← Назад
//                     </button>
//                     <h1>Моя палитра</h1>
//                     {savedColors.length > 0 && (
//                         <button onClick={clearAllColors} className="clear-btn">
//                             <RotateCcw className="clear-icon" />
//                         </button>
//                     )}
//                 </div>
//             </div>
//
//             <div className="palette-content">
//                 {savedColors.length === 0 ? (
//                     <div className="empty-palette">
//                         <Heart className="empty-icon" />
//                         <p>Пока нет сохраненных цветов</p>
//                         <p className="empty-subtitle">
//                             Нажми на ❤️ в главном экране, чтобы сохранить понравившиеся цвета
//                         </p>
//                         <button
//                             onClick={testLocalStorage}
//                             className="upload-btn secondary"
//                             style={{ marginTop: '1rem', maxWidth: '200px', margin: '1rem auto 0' }}
//                         >
//                             Тест localStorage
//                         </button>
//                     </div>
//                 ) : (
//                     <div className="saved-colors">
//                         {savedColors.map((color, index) => (
//                             <div key={index} className="saved-color-item">
//                                 <div
//                                     className="saved-color-preview"
//                                     style={{ backgroundColor: color }}
//                                     onClick={() => {
//                                         setSelectedColor(color);
//                                         setCurrentStep('main');
//                                     }}
//                                 />
//                                 <p className="saved-color-code">{color}</p>
//                                 <button
//                                     onClick={() => removeColor(color)}
//                                     className="remove-color-btn"
//                                 >
//                                     <Trash2 className="trash-icon" />
//                                 </button>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
//
//     if (currentStep === 'welcome') {
//         return <WelcomeScreen />;
//     } else if (currentStep === 'palette') {
//         return <PaletteScreen />;
//     } else {
//         return <MainScreen />;
//     }
// };
//
// export default HueMeApp;