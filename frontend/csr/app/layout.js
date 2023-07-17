import React from 'react';
import NavBar from './(components)/NavBar';
import styles from './(components)/component.module.css';
import './globals.css';
import { Dosis } from '@next/font/google';
import DynamicWall from './(components)/DynamicWall';

const page_font = Dosis({
    subsets: ['latin'],
    weight: ['400']
});

export default async function RootLayout({ children }) {
  return (
    <html className={page_font}>
      <body>
        <NavBar />
        <DynamicWall />
        {children}
      </body>
    </html>
  );
}