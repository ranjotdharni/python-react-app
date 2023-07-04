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
    const temp = await fetch('https://api.pexels.com/v1/search?query=' + process.env.DEFAULT_WALLPAPER + '&per_page=80&color=#2b2461', {
        method: "GET",
        headers: {
            Authorization: process.env.PEXEL_KEY,
        }
    }); //#2b2461

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