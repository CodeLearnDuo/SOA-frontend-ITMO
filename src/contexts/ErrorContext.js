import React, { createContext, useState, useContext } from 'react';

// Создаем контекст ошибок
const ErrorContext = createContext();

// Хук для доступа к контексту
export const useError = () => useContext(ErrorContext);

// Провайдер для контекста ошибок
export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);

  // Функция для добавления ошибки
  const addError = (message) => {
    setError(message);
    // Убираем сообщение об ошибке через 5 секунд
    setTimeout(() => setError(null), 5000);
  };

  return (
    <ErrorContext.Provider value={{ addError }}>
      {children}
      {/* Отображение ошибки в виде алерта */}
      {error && (
        <div style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          backgroundColor: 'red',
          color: 'white',
          padding: 10,
          borderRadius: 5,
          zIndex: 1000,
        }}>
          {error}
        </div>
      )}
    </ErrorContext.Provider>
  );
};
