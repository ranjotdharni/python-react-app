'use client'
import { Dongle } from '@next/font/google';
import styles from './component.module.css';
import SearchBox from './SearchBox';
import { useState, useEffect } from 'react';

const neon_sign = Dongle({
  subsets: ['latin'],
  weight: ['300']
});

export default function CreatePanel({})
{
    const [trigger, setTrigger] = useState(1);
    const [error, setError] = useState('');
    const [errorFlag, setErrorFlag] = useState(false);

    const childToParent = (newError) => {
        setError(newError);
        setErrorFlag(true);
        setTrigger(trigger * (-1));
    }

    useEffect(() => {
        setTimeout(() => {
            setErrorFlag(false);
        }, 10000);
    }, [trigger]);

    return (
        <div className={styles.create_panel}>
            <span className={styles.create_header_border}></span>
            <main className={neon_sign.className}>
                <h1 className={styles.create_header}>Add New Forecast</h1>
            </main>

            <SearchBox errorMessage={childToParent}/>
            <label className={styles.error} style={{opacity: errorFlag ? "1" : "0"}}>{error}</label>
        </div>
    );
}