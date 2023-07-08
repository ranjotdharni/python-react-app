'use client'
import { useEffect } from 'react';
import HourlyWidget from './(components)/HourlyWidget';
import styles from './(css)/daily.module.css';
import { Dosis } from '@next/font/google';

const font = Dosis({
    subsets: ['latin'],
    weight: ['400']
});

export default function DailyWidget({props}) {

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
      <p className={styles.header}>24-Hour Forecast</p>
      <p className={styles.info}>{'Scroll or Drag ->'}</p>
      <div className={styles.content_wrapper}>
        {resources.map(resource => {
          return <HourlyWidget key={resource.key} time={resource.time} temp={resource.temp} unit={resource.unit} svg={resource.svg} desc={resource.desc} wind_dir={resource.wind_dir} wind_speed={resource.wind_speed} visibility={resource.visibility} isDay={resource.is_day} />
        })}
      </div>
    </div>
  );
}

const hashResources = (rs) => {
  const temp = [];

  for (var i = 0; i < 24; i++)
  {
    temp.push({
      'key': i,
      'desc': rs.desc[i],
      'svg': rs.svg[i],
      'temp': rs.temp[i],
      'unit': rs.unit,
      'time': rs.time[i],
      'wind_dir': rs.wind_dir[i],
      'wind_speed': rs.wind_speed[i],
      'visibility': rs.visibility[i],
      'is_day': rs.isDay[i] 
    });
  }

  return temp;
}