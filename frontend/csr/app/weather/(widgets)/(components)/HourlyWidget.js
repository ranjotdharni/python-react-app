'use client'
import Compass from './Compass';
import styles from '../(css)/component.module.css';
import { Dosis } from '@next/font/google';
import { useEffect } from 'react';

const font = Dosis({
    subsets: ['latin'],
    weight: ['400']
});

export default function HourlyWidget({time, temp, unit, svg, desc, wind_dir, wind_speed, visibility, isDay}) {

  return (
    <div className={styles.wrapper + ' ' + font.className}>
      <label className={styles.time}>{getTime(time)}</label>
      <div className={styles.temperature}>{temp}<label className={styles.temperature_unit}>{unit}</label></div>
      <div className={styles.animation_wrapper}><img className={styles.animation} src={'/svg/' + svg}></img></div>
      <p className={styles.description}>{desc}</p>
      <span className={styles.description_after}></span>

      <Compass rot={wind_dir} wind={wind_speed} width={'25%'} height={'10%'} top={'82.5%'} left={'10%'} />

      <img src='/svg/visibility.svg' className={styles.eyeball}></img>
      <div className={styles.visibility_wrapper}><label className={styles.visibility}>{visibility + ' MI'}</label></div>

      <img className={styles.time_icon} src={(isDay == 1 ? '/svg/isDay.svg' : '/svg/isNight.svg')}></img>
    </div>
  );
}

const getTime = (context) => {
  var date = new Date(context);
  return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).replace(':00', '');
}