import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.css';
import { Button } from "../../components/button";
import { useTicTacToe } from "../../ticTacToeService";
import { players } from "../../data";

export const ResultPage = () => {
    const [{ gameData }, { startGame }] = useTicTacToe();

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Игра окончена</h1>

            <h1 className={styles.title}>
                {gameData.winner ? (
                    <>
                        Победил <span
                        style={gameData.move % 2 ? { color: "blue" } : { color: 'red' }}>{players[gameData.winner % 2]}</span>
                    </>
                ) : (
                    <span style={{ color: "grey" }}>Ничья</span>
                )}
            </h1>

            <Button style={{ marginTop: 40 }} title={'начать играть'} onClick={startGame}/>

            <Link className={styles.link} to={'/'}>На главную</Link>
        </div>
    )
}