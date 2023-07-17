'use client'
import { Dongle } from '@next/font/google';
import { Dosis } from '@next/font/google';
import styles from './component.module.css';
import SearchBox from './SearchBox';
import { useState, useEffect } from 'react';

const font = Dosis({
    subsets: ['latin'],
    weight: ['400']
});

const neon_sign = Dongle({
  subsets: ['latin'],
  weight: ['300']
});

export default function CreatePanel()
{
    const [trigger, setTrigger] = useState(1);
    const [error, setError] = useState('');
    const [errorFlag, setErrorFlag] = useState(false);
    const [readyState, setReadyState] = useState(false);
    const [buffer, setBuffer] = useState(new Map());

    const childToParent = (newError) => {
        setError(newError);
        setErrorFlag(true);
        setTrigger(trigger * (-1));
    }

    const addBufferItem = (key, name, country, lat, lon) => {
        if (key == null)
        {
            setReadyState(false);
            buffer.clear();
            return;
        }

        if (buffer.size > 0 && buffer.has(key))
        {
            buffer.delete(key);
        }
        else
        {
            buffer.set(key, {id: key, name: name, country: country, lat: lat, lon: lon});
        }
        
        if (buffer.size > 0)
        {
            setReadyState(true);
        }
        else
        {
            setReadyState(false);
        }
    }

    const locationForecast = () => {
        if (navigator.geolocation)
        {
            let coordSearch = new Event('geolocate', {detail: 'Using Current Location'});
            window.dispatchEvent(coordSearch);
        }
        else
        {
            childToParent('Location not supported and/or accessible.');
        }
    }

    const makeForecast = () => {
        if (!readyState)    return;

        const first = localStorage.getItem('forecastHash');
        const temp = [];
        let flag = null;
        if (first)
        {
            const updated = JSON.parse(first);
            buffer.forEach((item, key) => {
                if (flag === null)
                {
                    flag = new String(key);
                }
                updated.push(item);
            });
            localStorage.setItem('forecastHash', JSON.stringify(updated));
        }
        else
        {
            buffer.forEach((item, key) => {
                if (flag === null)
                {
                    flag = new String(key);
                }
                temp.push(item);
            });
            localStorage.setItem('forecastHash', JSON.stringify(temp));
        }
        window.location.href = (new String(window.location.origin)) + '/weather?id=' + flag;
    }

    useEffect(() => {
        setTimeout(() => {
            setErrorFlag(false);
        }, 10000);
    }, [trigger]);

    return (
        <div className={styles.create_panel + " " + font.className}>
            <div className={styles.logo_box}><img className={styles.logo} src='/img/logo.png'></img><label className={styles.logo_label}>Meteorize</label></div>
            <span className={styles.create_header_border}></span>
            <main className={font.className}>
                <h1 className={styles.create_header}>Add New Forecast</h1>
            </main>

            <p className={styles.description_title + " " + styles.title1}>Search for a Place</p>
            <p className={styles.description_text + " " + styles.text1}>
                Use the search bar to the right to search for a city or a location. Your search must be 
                a minimum of two characters to return a proper set of results. From the results, select 
                all locations for which you wish to view the forecast and current weather conditions, then click 
                the Add button in the bottom right of the page.   
            </p>

            <p className={styles.description_title + " " + styles.title2}>Navigate Between Forecasts</p>
            <p className={styles.description_text + " " + styles.text2}>
                Click the sandwich in the top left of the page to open the navigation bar. Use it to navigate 
                between all of the forecasts that you've selected and added. You're selections will persist even 
                if you close and re-open your browser.If you wish to remove a forecast, find it in the 
                navigation bar and click on the cross next to its name.    
            </p>

            <SearchBox errorMessage={childToParent} siblingToSibling={addBufferItem}/>
            <div className={styles.error_wrapper}><label className={styles.error} style={{opacity: errorFlag ? "1" : "0"}}>{error}</label></div>
            <button onClick={locationForecast} className={neon_sign.className + " " + styles.basic_button + " " + styles.location_button + " " + styles.ready}>Use My Location</button>
            <button onClick={makeForecast} className={neon_sign.className + " " + styles.basic_button + " " + styles.submit_button + " " + (readyState ? styles.ready : styles.not_ready)}>Add</button>
        </div>
    );
}