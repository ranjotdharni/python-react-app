import styles from './page.module.css'
import CurrentWidget from './(widgets)/CurrentWidget';
import DailyWidget from './(widgets)/DailyWidget';
import WeeklyWidget from './(widgets)/WeeklyWidget';
import { Dosis } from '@next/font/google';

const font = Dosis({
    subsets: ['latin'],
    weight: ['400']
});

export default async function page({searchParams})
{
  const id = searchParams.id;
  var initialProps;
  if (!id)
  {
    newError(`Hmm, that page doesn't seem to exist...`)
  }

  initialProps = await instateInitialProps(id);
  const label = initialProps.name + ', ' + initialProps.country;

  return (
    <>
      <div className={styles.page_header_wrapper}><label className={styles.page_header + ' ' + font.className}>{label}</label></div>
      <CurrentWidget props={parseCurrentProps(initialProps)} />
      <DailyWidget props={label} />
      <WeeklyWidget props={label} />
    </> 
  );
}

const newError = (m) => {
  throw new Error(m);
}

const instateInitialProps = async (id) => {
  const worker = await fetch('https://geocoding-api.open-meteo.com/v1/get?id=' + id);
  const data = await worker.json();
  
  if (data.error)
  {
    newError(data.reason);
  }
  
  return data;
}

const parseCurrentProps = (obj) => {
  return {
    'lat': obj.latitude,
    'lon': obj.longitude
  };
}