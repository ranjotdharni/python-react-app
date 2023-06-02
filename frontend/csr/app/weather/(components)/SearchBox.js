'use client'
import { useState } from 'react';
import styles from '../weather.module.css'
import { Dosis } from '@next/font/google';

const search_box = Dosis({
    subsets: ['latin'],
    weight: ['400']
  });


export default function SearchBox({})
{
    const [input, setInput] = useState('');

    const search = async (e) => 
    {
        if (input.trim() == '')
            return;

        
        console.log('searching for "' + input + '"');
    }

    return (
        <main className={search_box.className}>
            <div className={styles.search_div}>
                <input className={styles.search_input} value={input} placeholder='Search City...'
                    onChange={evt => setInput(evt.target.value)}></input><button className={styles.search_button} onClick={search}></button>
                <div className={styles.search_list}>

                </div>
            </div>
        </main>
    );
}