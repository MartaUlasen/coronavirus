import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';

const Header = () => (
    <header className={styles.header}>
        <div className='logo'>
            <Link to='/' className={styles.logoLink}>
                Covid-19
            </Link>
        </div>
    </header>
);

export default Header;
