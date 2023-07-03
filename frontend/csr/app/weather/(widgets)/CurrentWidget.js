'use client'
import styles from './(css)/current.module.css';
import { Dosis } from '@next/font/google';

const font = Dosis({
    subsets: ['latin'],
    weight: ['400']
});

export default function CurrentWidget({props}) {
  return (
    <div className={styles.wrapper + ' ' + font.className}>
      <label className={styles.time}>{props.time}</label>
      <div className={styles.temperature}>{props.temp}<label className={styles.temperature_unit}>{props.unit}</label></div>
      <div className={styles.animation_wrapper}><img className={styles.animation} src={'/svg/' + props.svg}></img></div>
      <p className={styles.description}>{props.desc}</p>
      <span className={styles.description_after}></span>
    </div>
  );
}