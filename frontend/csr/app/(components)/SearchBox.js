'use client'
import { useState, useEffect, setState } from 'react';
import SearchItem from './SearchItem';
import styles from './component.module.css';
import { Dosis } from '@next/font/google';

const search_box = Dosis({
    subsets: ['latin'],
    weight: ['400']
});


export default function SearchBox({errorMessage, siblingToSibling})
{
    const [input, setInput] = useState('');
    const [response, setResponse] = useState([]);
    const [data, setData] = useState([]);

    const search = async (onChange) => 
    {
        if (input.trim() == '')
            return;

        await fetch('https://geocoding-api.open-meteo.com/v1/search?name=' + input).then(async mid => {
            return await mid.json();
        }).then(async final => {
            if (!final.error && final.results)
            {
                setResponse(final.results);
            }
            else if (!onChange)
            {
                errorMessage('No results, check your search.');
            }
        });
    }

    useEffect(() =>
    {
        let raw = [];
        const results = response;
        for (var i = 0; i < results.length; i++)
        {
            const obj = {
                'id': results[i].id,
                'name': results[i].name,
                'country': results[i].country_code,
                'timezone': results[i].timezone.substring(results[i].timezone.indexOf("/") + 1).replace(/_/, " "),
                'lat': results[i].latitude,
                'lon': results[i].longitude
            };
            raw.push(obj);
        }
        setData(raw);
    }, [response]);

    return (
        <main className={search_box.className}>
            <div className={styles.search_div}>
                <input className={styles.search_input} value={input} placeholder='Search City...'
                    onChange={evt => {setInput(evt.target.value); search(true)}}></input><button className={styles.search_button} onClick={() => {search(false)}}></button>
                <div className={styles.search_list}>
                <div className={styles.search_list_header}><label>Name</label><label>Country</label><label>Timezone</label><label>Select all that apply</label></div>

                {data.map(item => {
                    return <SearchItem key={item.id} id={item.id} name={item.name} country={item.country} timezone={item.timezone} lat={item.lat} lon={item.lon} passUp={siblingToSibling}/>
                })}
                </div>
            </div>
        </main>
    );
}