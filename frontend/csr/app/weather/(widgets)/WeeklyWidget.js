'use client'
import WeekdayWidget from './(components)/WeekdayWidget';
import styles from './(css)/weekly.module.css';
import { useEffect } from 'react';
import { Dosis } from '@next/font/google';

const font = Dosis({
    subsets: ['latin'],
    weight: ['400']
});

export default function WeeklyWidget({props}) {

  const resources = hashResources(props);

  useEffect(() => {
    const slider = document.querySelector('.' + styles.content_wrapper);
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.classList.remove('active');
    });

    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.classList.remove('active');
    });

    slider.addEventListener('mousemove', (e) => {
      if(!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 0.95;
      slider.scrollLeft = scrollLeft - walk;
    });
  });

  return (
    <div className={styles.wrapper + ' ' + font.className}>
      <p className={styles.header}>10-Day Forecast</p>
      <div className={styles.content_wrapper}>
        {resources.map(resource => {
          return <WeekdayWidget key={resource.key} time={resource.time} max_temp={resource.max_temp} min_temp={resource.min_temp} unit={resource.unit} svg={resource.svg} desc={resource.desc} wind_dir={resource.wind_dir} wind_speed={resource.wind_speed} sunrise={resource.sunrise} sunset={resource.sunset} />
        })}
      </div>
    </div>
  );
}

const hashResources = (rs) => {
  const temp = [];

  for (var i = 0; i < 10; i++)
  {
    temp.push({
      'key': i,
      'desc': rs.desc[i],
      'svg': rs.svg[i],
      'max_temp': rs.temp[i].max,
      'min_temp': rs.temp[i].min,
      'unit': rs.unit,
      'time': rs.time[i],
      'wind_dir': rs.wind_dir[i],
      'wind_speed': rs.wind_speed[i],
      'sunrise': rs.daylight[i].sunrise,
      'sunset': rs.daylight[i].sunset 
    });
  }

  return temp;
}