'use client'
import styles from './(css)/weekly.module.css';
import { Dosis } from '@next/font/google';

const font = Dosis({
    subsets: ['latin'],
    weight: ['400']
});

export default function WeeklyWidget({props}) {
  return (
    <div className={styles.wrapper + ' ' + font.className}>
      Weekly forecast for ID {props}
    </div>
  );
}