'use client'
import Compass from './(components)/Compass';
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

      <Compass rot={props.wind_dir} wind={props.wind_speed} width={'25%'} height={'10%'} top={'82.5%'} left={'10%'} />

      <img src='/svg/visibility.svg' className={styles.eyeball}></img>
      <label className={styles.visibility}>{props.visibility + ' MI'}</label>

      <p className={styles.sunrise}>{props.sunrise}</p>
      <p className={styles.sunset}>{props.sunset}</p>
    </div>
  );
}