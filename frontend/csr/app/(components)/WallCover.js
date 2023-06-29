'use client'
import { useEffect, useState } from 'react';
import styles from './component.module.css';

export default function WallCover({isReady}) {
  const [display, setDisplay] = useState(true);
  const [timeUp, setTimeUp] = useState(false);

  useEffect(() => {
    if (isReady)
    {
        setTimeout(() => {
            setTimeUp(true);
            setTimeout(() => {
                setDisplay(false);
            }, 1000);
        }, 2000);
    }
  }, isReady);

  return (
    display ? <video src={'/mp4/loading.mp4'} className={styles.cover + ' ' + (timeUp ? styles.fade : '')} autoPlay muted></video> : <div></div>
  );
}