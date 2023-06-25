'use client'
import styles from './(css)/current.module.css';
import { useState } from 'react';
import { Dosis } from '@next/font/google';

const font = Dosis({
    subsets: ['latin'],
    weight: ['400']
});

export default function CurrentWidget({props}) {
  return (
    <div className={styles.wrapper}>
      <label className={styles.header_label + ' ' + font.className}>Berlin</label>
      Weather for ID {props}
    </div>
  );
}