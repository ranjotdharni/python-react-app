'use client'
import styles from '../(css)/component.module.css';

const hash = ["NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW", "N"];

export default function Compass({width, height, top, left, rot, wind}) {

  return (
    <div style={{position: 'absolute', width: width, height: height, top: top, left: left}}>
      <div className={styles.compass}>

        <label className={styles.direction}>{getDirection(rot)}</label>
        <label className={styles.speed}>{wind + ' MPH'}</label>

        <div className={styles.needle} style={{transform: 'rotate(' + rot + 'deg)'}}>
            <div className={styles.handle1}></div>
            <div className={styles.handle2}></div>
        </div>
      </div>
    </div>
  );
}

const getDirection = (rot) => {

  if (rot <= 11.25)
  {
    return hash[hash.length - 1];
  }

  for (var i = 0; i < hash.length; i++)
  {
    if ((rot > ((22.5 * i) + 11.25)) && (rot <= ((22.5 * (i + 1)) + 11.25)))
    {
      return hash[i];
    }
  }
}