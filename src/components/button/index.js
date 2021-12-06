import React from 'react';
import styles from './styles.module.css';

export const Button = ({ title, onClick, disabled, style }) => {
    return (
        <button style={style} className={styles.button} onClick={onClick} disabled={disabled}>
            {title}
        </button>
    )
}