'use client'
import { Dongle } from '@next/font/google';
import styles from '../weather.module.css'
import SearchBox from './SearchBox';

const neon_sign = Dongle({
  subsets: ['latin'],
  weight: ['300']
});

export default function CreatePanel({})
{
    return (
        <div className={styles.create_panel}>
            <span className={styles.create_header_border}></span>
            <main className={neon_sign.className}>
                <h1 className={styles.create_header}>Add New Forecast</h1>
            </main>

            <SearchBox />
        </div>
    );
}