'use client'
import { useEffect, useState } from 'react';
import styles from './component.module.css';
import { Dosis } from '@next/font/google';

const search_box = Dosis({
    subsets: ['latin'],
    weight: ['400']
  });

export default function SearchItem({id, name, country, region, lat, lon, passUp}) {
  const [checked, setChecked] = useState(false);

  const invert = () => {
    setChecked(!checked);
    passUp(id, name, country, lat, lon);
  }

  return (
    <>
      <div className={styles.search_list_item + " " + search_box + " " + (checked ? styles.search_list_item_ready : "")} onClick={invert}>
        <p className={styles.location_label}>City</p>
        <p className={styles.country_label}>Country</p>
        <label className={checked ? styles.search_list_item_checked : ""}>{name + ', ' + (region || 'N/A')}</label>
        <label className={(checked ? styles.search_list_item_checked : "") + " " + styles.country_code}>{country}</label>
        <div className={search_box.className + " " + styles.checkbox + " " + (checked ? styles.checked : "")}>
          <div className={styles.bar1}></div>
          <div className={styles.bar2}></div>
        </div>
      </div>
    </>
  );
}