const getLocalStorageItem = (key) => {
    const localStorageValue = localStorage.getItem(key);

    return localStorageValue ? JSON.parse(localStorageValue) : null;
}

const setLocalStorageItem = (slug, value) => {
    return localStorage.setItem(slug, JSON.stringify(value));
}

//get/set first user
export const getFirstUserId = () => {
    return getLocalStorageItem('first_user') || null;
}

export const setFirstUserId = (id) => {
    setLocalStorageItem('first_user', id);
}

//get/set second user
export const getSecondUserId = () => {
    return getLocalStorageItem('second_user') || null;
}

export const setSecondUserId = (id) => {
    setLocalStorageItem('second_user', id);
}

//get/set game data
export const getGameData = () => {
    return getLocalStorageItem('game_data') || null;
}

export const setGameData = (data) => {
    setLocalStorageItem('game_data', data);
}
