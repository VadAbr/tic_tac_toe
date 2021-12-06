import React from 'react';
import styles from './styles.module.css';

import { ReactComponent as CrossIcon } from '../../assets/cross.svg';
import { ReactComponent as CircleIcon } from '../../assets/circle.svg';

import { useTicTacToe } from "../../ticTacToeService";

import { players, blockCoordinates } from "../../data";
import { Link } from "react-router-dom";

export const GamePage = () => {
    const [{ gameData }, { makeMove }] = useTicTacToe();

    const blocks = gameData.square.matrix.flat();

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                Id текущего игрока: {gameData.move % 2 ? gameData.onePlayerId : gameData.twoPlayerId}
            </h1>

            <div className={styles.wrapper}>
                {blocks.map((el, index) => {
                    return (
                        <div className={styles.block} key={index} onClick={() => makeMove(blockCoordinates[index])}>
                            {el === '0' && <CircleIcon className={styles.iconCircle}/>}
                            {el === 'X' && <CrossIcon className={styles.iconCross}/>}
                        </div>
                    )
                })}
            </div>

            <div className={styles.text}>
                Играет: {' '}
                <span className={gameData.move % 2 ? styles.firstUser : styles.secondUser}>
                    {players[gameData.move % 2]}
                </span>
            </div>

            <Link className={styles.link} to={'/'}>На главную</Link>
        </div>
    )
}

