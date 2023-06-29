import WallCover from './WallCover';
import styles from './component.module.css';

export default async function DynamicWall() {
  const background = await defaultBackground().then((bg) => { return {'img' : bg, 'isReady' : true} });

  return (
    <div className={styles.background} style={{background: 'url(' + background.img + ')'}}>
        <WallCover isReady={background.isReady}/>
    </div>
  );
}

const defaultBackground = async () => {
    const temp = await fetch('https://api.pexels.com/v1/search?query=' + process.env.DEFAULT_WALLPAPER + '&per_page=80&color=#ec136d', {
        method: "GET",
        headers: {
            Authorization: process.env.PEXEL_KEY,
        }
    });

    const res = await temp.json();

    res.photos.forEach(itr => {
        if ((itr.width >= 1920) && (itr.height >= 1080))
        {
            return itr.src.original;
        }
    })

    return res.photos[Math.floor(Math.random() * res.photos.length)].src.original;
}