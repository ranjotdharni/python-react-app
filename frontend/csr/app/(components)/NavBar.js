'use client'
import { useEffect, useState } from 'react';
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
    const [items, setItems] = useState([])

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
                <a href={loc} className={(isOpen ? styles.new_nav_item : styles.hide) + " " + search_box.className}>+Add New Forecast...</a>

                {items.map(item => {
                    return <a key={item.id} href={loc + '/weather?id=' + item.id} className={(isOpen ? styles.new_nav_item : styles.hide) + " " + styles.nav_list_item + " " + search_box.className}>{item.name + ', ' + item.country}</a>
                })}
            </div>
        </>
    );
}