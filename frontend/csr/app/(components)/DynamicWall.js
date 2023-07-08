'use client'

import { usePathname, useSearchParams } from 'next/navigation';
import styles from './component.module.css';
import { useEffect, useState } from 'react';

export default function DynamicWall({background}) {

   const [active, setActive] = useState(background);
   const pathname = usePathname();
   const searchParams = useSearchParams();
   useEffect(() => {
      if (searchParams.get('bg') && (Number(searchParams.get('bg')) < Number(process.env.NEXT_PUBLIC_MAX_BGS)))
      {
        setActive('/mp4/bg_' + searchParams.get('bg') + '.mp4');
      }
   }, [pathname, searchParams]);

  return (
    <div className={styles.background}>
        <video className={styles.background_video} src={active || '/mp4/bg_0.mp4'} type="video/mp4" autoPlay loop muted>
        </video>
    </div>
  );
}

const defaultBackground = async () => {
    const temp = await fetch('https://api.pexels.com/v1/search?query=' + process.env.DEFAULT_WALLPAPER + '&per_page=80&color=#2b2461', {
        method: "GET",
        headers: {
            Authorization: process.env.PEXEL_KEY,
        }
    });

    const res = await temp.json();

    var src = '';
    var width = 0;
    var height = 0;

    while ((width < 1920) && (height < 1080))
    {
        const index = Math.trunc(Math.random() * res.photos.length);
        src = res.photos[index].src.original;
        width = res.photos[index].width;
        height = res.photos[index].height;
    }

    return src;
}