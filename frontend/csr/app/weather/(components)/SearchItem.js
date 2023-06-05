'use client'
import { useState } from 'react';
import styles from '../weather.module.css';
import { Dosis } from '@next/font/google';

const search_box = Dosis({
    subsets: ['latin'],
    weight: ['400']
  });

export default function SearchItem({name, country, timezone}) {
    return (<div className={styles.search_list_item + " " + search_box}><label>{name}</label><label>{country}</label><label>{timezone}</label></div>);
}