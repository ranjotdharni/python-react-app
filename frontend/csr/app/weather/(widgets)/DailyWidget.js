'use client'
import styles from './(css)/daily.module.css';
import { useState } from 'react';
import { Dosis } from '@next/font/google';

const font = Dosis({
    subsets: ['latin'],
    weight: ['400']
});

export default function DailyWidget({props}) {
  return (
    <div className={styles.wrapper + ' ' + font.className}>
      Daily forecast for ID {props}
    </div>
  );
}