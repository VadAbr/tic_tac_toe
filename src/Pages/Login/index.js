import React, { useState } from 'react';

import { Button } from '../../components/button';

import { useTicTacToe } from '../../ticTacToeService'

import styles from './styles.module.css';

export const LoginPage = () => {
    const [{ isLoading, gameError }, { startGame, joinToGame }] = useTicTacToe();
    const [value, setValue] = useState('');

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                <span style={{ color: "red" }}>Крестики</span>
                -
                <span style={{ color: "blue" }}>нолики</span>
            </h1>

            <p className={styles.description}>
                Логическая игра между двумя противниками на квадратном поле 3 на 3 клетки
                или большего размера. Один из игроков играет «крестиками», второй — «ноликами».
            </p>

            <Button onClick={startGame} disabled={isLoading} title={'начать играть'}/>

            <p className={styles.text}>или</p>

            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={isLoading}
                className={styles.input}
                placeholder={'Введите id игрока'}
            />

            {gameError && <p className={styles.error}>{gameError}</p>}

            <Button onClick={() => joinToGame(value)} disabled={isLoading || !value} title={'найти игру'}/>
        </div>
    )
}