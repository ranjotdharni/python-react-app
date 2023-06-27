'use client'
import { Dongle } from '@next/font/google';
import styles from './component.module.css';
import SearchBox from './SearchBox';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const neon_sign = Dongle({
  subsets: ['latin'],
  weight: ['300']
});

export default function CreatePanel({})
{
    const [trigger, setTrigger] = useState(1);
    const [error, setError] = useState('');
    const [errorFlag, setErrorFlag] = useState(false);
    const [readyState, setReadyState] = useState(false);
    const [buffer, setBuffer] = useState(new Map());

    const childToParent = (newError) => {
        setError(newError);
        setErrorFlag(true);
        setTrigger(trigger * (-1));
    }

    const addBufferItem = (key, name, country) => {
        if (buffer.size > 0 && buffer.has(key))
        {
            buffer.delete(key);
        }
        else
        {
            buffer.set(key, {id: key, name: name, country: country});
        }
        
        if (buffer.size > 0)
        {
            setReadyState(true);
        }
        else
        {
            setReadyState(false);
        }
    }

    const makeForecast = () => {
        const first = localStorage.getItem('forecastHash');
        const temp = [];
        let flag = null;
        if (first)
        {
            const updated = JSON.parse(first);
            buffer.forEach((item, key) => {
                if (flag === null)
                {
                    flag = new String(key);
                }
                updated.push(item);
            });
            localStorage.setItem('forecastHash', JSON.stringify(updated));
        }
        else
        {
            buffer.forEach((item, key) => {
                if (flag === null)
                {
                    flag = new String(key);
                }
                temp.push(item);
            });
            localStorage.setItem('forecastHash', JSON.stringify(temp));
        }
        window.location.href = (new String(window.location.origin)) + '/weather?id=' + flag;
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

            <SearchBox errorMessage={childToParent} siblingToSibling={addBufferItem}/>
            <label className={styles.error} style={{opacity: errorFlag ? "1" : "0"}}>{error}</label>
            <button onClick={makeForecast} className={neon_sign.className + " " + styles.submit_button + " " + (readyState ? styles.ready : styles.not_ready)}>Add</button>
        </div>
    );
}