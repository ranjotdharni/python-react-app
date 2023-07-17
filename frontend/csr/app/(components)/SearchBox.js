'use client'
import { useState, useEffect } from 'react';
import SearchItem from './SearchItem';
import styles from './component.module.css';
import { Dosis } from '@next/font/google';

const search_box = Dosis({
    subsets: ['latin'],
    weight: ['400']
});


export default function SearchBox({errorMessage, siblingToSibling})
{
    const [hasFocus, hocusFocus] = useState(false);
    const [searchHash, setSearchHash] = useState([]);
    const [input, setInput] = useState('');
    const [response, setResponse] = useState([]);
    const [data, setData] = useState([]);

    const handleEnter = async (e) => 
    {
        if (e.key == 'Enter')
        {
            await search();
        }
    }

    const preSearch = async () =>
    {
        if (input.trim() == '')
            return;
    
        await fetch('https://geocoding-api.open-meteo.com/v1/search?name=' + input).then(async mid => {
            return await mid.json();
        }).then(async final => {
            if (!final.error && final.results)
            {
                const temp = [];

                final.results.forEach(item => {
                    temp.push({'key': item.id, 'name': item.name});
                });

                setSearchHash(temp);
                hocusFocus(true);
            }
        });
    }

    const search = async (literal) => 
    {
        setData([]);
        hocusFocus(false); 

        if (!literal && (input.trim() == ''))
        {
            errorMessage('Enter the name of a city or town.');
            return;
        }

        siblingToSibling(null, null, null, null, null);
    
        await fetch('https://geocoding-api.open-meteo.com/v1/search?name=' + (literal || input)).then(async mid => {
            return await mid.json();
        }).then(final => {
            if (!final.error && final.results)
            {
                setResponse(final.results);
            }
            else
            {
                errorMessage((final.error || 'No results, check your search.'));
            }
        });
    }

    const formatGeolocation = (inputString) => {
        let spaceCount = 0;
        let result = '';

        for (let i = 0; i < inputString.length; i++) {
            if (inputString[i] === ' ') {
                spaceCount++;
            }

            if (spaceCount <= 1) {
                result += inputString[i];
            } else {
                break;
            }
        }

        return result;
    }

    const locationForecast = async (pos) => {
        let lat = pos.coords.latitude;
        let lon = pos.coords.longitude;

        fetch('https://geocode.maps.co/reverse?lat=' + lat + '&lon=' + lon).then(async middle => {
            return await middle.json();
        }).then(async obj => {
            const final = obj.address.city + ', ' + formatGeolocation(obj.address.country);
            setInput(final);
            await search(final);
        });
    }

    useEffect(() => {
        window.addEventListener('geolocate', async () => {navigator.geolocation.getCurrentPosition(async (pos) => {locationForecast(pos)});});
    }, []);

    useEffect(() => {
        document.addEventListener("click", (evt) => {
            if (!(document.getElementById('preSearcher').contains(evt.target)) && hasFocus)
            {
                hocusFocus(false);
            }
        });
    });

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
                'region': results[i].admin1, //.timezone.substring(results[i].timezone.indexOf("/") + 1).replace(/_/, " "),
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
                <input className={styles.search_input} value={input} placeholder='Search City...' onKeyDown={handleEnter}
                    onChange={evt => {setInput(evt.target.value); preSearch()}}></input><button className={styles.search_button} onClick={() => {search()}}></button>
                
                <div id={'preSearcher'} className={(searchHash.length == 0 ? '' : styles.search_hash) + (hasFocus ? (' ' + styles.search_hash_focus) : '')}>
                    {searchHash.map(result =>   {
                        return <p onClick={() => {setInput(result.name); search(result.name)}} className={styles.search_hash_item}>{result.name}</p>
                    })}
                </div>

                <div className={styles.search_list}>
                <div className={styles.search_list_header}><label>{(data.length == 0 ? 'Search for a location' : 'Select all that apply')}</label></div>

                {data.map(item => {
                    return <SearchItem key={item.id} id={item.id} name={item.name} country={item.country} region={item.region} lat={item.lat} lon={item.lon} passUp={siblingToSibling}/>
                })}
                </div>
            </div>
        </main>
    );
}