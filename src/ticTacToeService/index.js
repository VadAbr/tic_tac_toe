import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createGame, joinGame, makeMove as apiMakeMove, getGame } from '../api'
import {
    createId,
    setSecondUserId,
    setFirstUserId,
    getSecondUserId,
    getFirstUserId,
    setGameData as setLocalGameData,
    getGameData as getLocalGameData,
} from '../utils'

const createUsersId = () => {
    const firstUserId = createId();
    const secondUserId = createId();

    setFirstUserId(firstUserId);
    setSecondUserId(secondUserId);
}


export const useTicTacToe = () => {
    const [gameError, setGameError] = useState(null);
    const [gameData, setGameData] = useState(getLocalGameData());
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const startGame = async () => {
        createUsersId();
        setIsLoading(true);
        try {
            const { id: gameId, onePlayerId, twoPlayerId, ...rest } = await createGame(getFirstUserId());
            if (onePlayerId && twoPlayerId) {
                setLocalGameData({ id: gameId, onePlayerId, twoPlayerId, ...rest });

                navigate('/game');
                return;
            }

            const response = await joinGame({ userId: getSecondUserId(), gameId });
            setLocalGameData(response);

            navigate('/game');
        } catch (e) {
            console.log('ERROR startGame ->', e);
            setGameError(e);
        } finally {
            setIsLoading(false);
        }
    }

    const makeMove = async ({ x, y }) => {
        setIsLoading(true);
        try {
            console.log(gameData.move)
            const userId = gameData.move % 2 ? getFirstUserId() : getSecondUserId();
            const response = await apiMakeMove({ x, y, userId });
            if (!response.message) {
                setGameData(response);
                setLocalGameData(response);
            }

            if (response.ended) {
                navigate('/result');
            }
        } catch (e) {
            console.log('ERROR makeMove ->', e);
            setGameError(e);
        } finally {
            setIsLoading(false);
        }
    }

    const joinToGame = async (userId) => {
        const response = await getGame(userId);

        if (gameError) {
            setGameError(null);
        }

        if (!response.message) {
            setFirstUserId(response.onePlayerId);
            setSecondUserId(response.twoPlayerId);
            setGameData(response);
            setLocalGameData(response);
        }

        if (response.message) {
            setGameError(response.message);
            return;
        }

        if (response.ended) {
            navigate('/result');
            return;
        }

        navigate('/game');
    }


    return [{
        gameError,
        gameData,
        isLoading
    },
        {
            startGame,
            makeMove,
            joinToGame
        }];
}
