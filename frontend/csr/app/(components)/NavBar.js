'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './component.module.css';
import { Dosis } from '@next/font/google';

const search_box = Dosis({
    subsets: ['latin'],
    weight: ['400']
});

export default function NavBar()
{
    var [loc, setLoc] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [items, setItems] = useState([]);

    const obliterate = (id) => {
        const old = localStorage.getItem('forecastHash');
        const current = [];
        let worker = null;

        worker = JSON.parse(old);
        worker.forEach(item => {
            if (item.id != id)
            {
                current.push(item);
            }
        });

        localStorage.setItem('forecastHash', JSON.stringify(current));
        setItems(current);
    }

    const invert = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        setLoc(window.location.origin);
        let middle = localStorage.getItem('forecastHash');
        middle = JSON.parse(middle);
        if (middle)
        {
            setItems(middle);
        }
    }, []);

    useEffect(() => {
        document.addEventListener("click", (evt) => {
            if (!(document.getElementById('navbar').clientWidth > evt.clientX) && isOpen)
            {
                invert();
            }
        });
    });


    return (
        <>
            <div className={isOpen ? styles.sandwich_open : styles.sandwich} onClick={invert}>
                <span className={isOpen ? styles.sandwich_bar_open : styles.sandwich_bar}></span>
                <span className={isOpen ? styles.sandwich_bar_open : styles.sandwich_bar}></span>
                <span className={isOpen ? styles.sandwich_bar_open : styles.sandwich_bar}></span>
            </div>
            <div id='navbar' className={isOpen ? styles.nav_div_open : styles.nav_div}>
                <img className={styles.logo_navbar} src='/img/logo.png'></img>
                <a href={loc} className={(isOpen ? styles.new_nav_item : styles.hide) + " " + search_box.className}>+Add New Forecast...</a>

                {items.map(item => {
                    return (
                        <div key={item.id} className={styles.item_wrapper}>
                            <Link href={'/weather?id=' + item.id} className={(isOpen ? styles.new_nav_item : styles.hide) + " " + styles.nav_list_item + " " + search_box.className}>{item.name + ', ' + item.country}</Link>
                            <button className={styles.delete_button} onClick={() => obliterate(item.id)}></button>
                        </div>
                    )
                })}
            </div>
        </>
    );
}