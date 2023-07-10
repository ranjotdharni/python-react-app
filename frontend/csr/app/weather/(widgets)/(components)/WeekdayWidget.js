'use client'
import Compass from './Compass';
import styles from '../(css)/weekly.module.css';
import { Dosis } from '@next/font/google';

const font = Dosis({
    subsets: ['latin'],
    weight: ['400']
});

const hashDays = [
  [0, "Sunday"],
  [1, "Monday"],
  [2, "Tuesday"],
  [3, "Wednesday"],
  [4, "Thursday"],
  [5, "Friday"],
  [6, "Saturday"]
];

const dayOfWeek = new Map(hashDays);

export default function WeekdayWidget({time, max_temp, min_temp, unit, svg, desc, wind_dir, wind_speed, sunrise, sunset}) {
  return (
    <div className={styles.item_wrapper + ' ' + font.className}>
      <div className={styles.time_wrapper}><label className={styles.time}>{getTime(time)}</label></div>
      <div className={styles.temperature}>{max_temp}<label className={styles.temperature_unit}>{unit}</label></div>
      <div className={styles.animation_wrapper}><img className={styles.animation} src={'/svg/' + svg}></img></div>
      <p className={styles.description}>{desc}</p>
      <span className={styles.description_after}></span>

      <Compass rot={wind_dir} wind={wind_speed} width={'25%'} height={'10%'} top={'82%'} left={'10%'} />

      <p className={styles.min_temp}>{min_temp + ' ' + unit}</p>

      <p className={styles.sunrise}>{sunrise}</p>
      <p className={styles.sunset}>{sunset}</p>
    </div>
  );
}

const getTime = (context) => {
  var date = new Date(context).getUTCDay();
  return dayOfWeek.get(date);
}