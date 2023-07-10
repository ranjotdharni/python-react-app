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