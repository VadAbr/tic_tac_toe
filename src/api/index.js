import qs from 'qs';

const ROOT_URL = 'http://localhost:8080';

const parseJson = (response) =>
    response.json().then((data) => {
        if (!data) {
            return null;
        }

        return data;
    });

const parseError = (error) => console.error(error);

const request = (path, { method = 'GET', data = {}, query = {} } = {}) => {
    const queryString = qs.stringify(query);
    const url = ROOT_URL.concat(path);
    const urlWithQuery = queryString ? url + '?'.concat(queryString) : url;

    return (
        fetch(urlWithQuery, {
            method,
            ...(method === 'GET' ? null : { body: JSON.stringify(data) }),
        })
            .then(parseJson)
            .catch(parseError)
    );
};

export const getGame = (userId) => request('/game', { query: { "user_id": userId } });
export const createGame = (userId) => request('/game', { method: "POST", query: { "user_id": userId } });

export const joinGame = ({ userId, gameId }) => request('/game/join', {
    method: "POST",
    query: { "user_id": userId, 'game_id': gameId }
});

export const makeMove = ({ userId, x, y }) => request('/game/move', {
    method: "POST",
    query: { "user_id": userId, x, y }
});

