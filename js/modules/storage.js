/**
 * Модуль для работы с локальным хранилищем браузера.
 * Используем чистые функции с обработкой ошибок.
 */

const STORAGE_KEYS = {
    USER_PROFILE: 'samir_fit_profile',
    WORKOUT_PROGRESS: 'samir_fit_workout'
};

export const Storage = {
    // Сохранить данные
    save(key, data) {
        try {
            const serializedData = JSON.stringify(data);
            localStorage.setItem(key, serializedData);
        } catch (error) {
            console.error('Ошибка сохранения в Storage:', error);
        }
    },

    // Получить данные
    get(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Ошибка чтения из Storage:', error);
            return null;
        }
    },

    // Удалить данные (например, для сброса прогресса)
    remove(key) {
        localStorage.removeItem(key);
    },

    // Ключи для внешнего использования
    KEYS: STORAGE_KEYS
};