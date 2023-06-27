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
    <div className={styles.wrapper + ' ' + font.className}>
      Current Weather @ latitude: {props.lat} longitude: {props.lon}
    </div>
  );
}