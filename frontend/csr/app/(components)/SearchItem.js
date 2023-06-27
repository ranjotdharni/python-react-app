'use client'
import { useEffect, useState } from 'react';
import styles from './component.module.css';
import { Dosis } from '@next/font/google';

const search_box = Dosis({
    subsets: ['latin'],
    weight: ['400']
  });

export default function SearchItem({id, name, country, timezone, passUp}) {
  const [checked, setChecked] = useState(false);

  const invert = () => {
    setChecked(!checked);
    passUp(id, name, country);
  }

  return (
    <>
      <div className={styles.search_list_item + " " + search_box}>
        <label className={checked ? styles.search_list_item_checked : ""}>{name}</label>
        <label className={checked ? styles.search_list_item_checked : ""}>{country}</label>
        <label className={checked ? styles.search_list_item_checked : ""}>{timezone}</label>
      </div>
      <div className={styles.wrapper}><input className={styles.checkbox} onClick={invert} type='checkbox'></input></div>
    </>
  );
}