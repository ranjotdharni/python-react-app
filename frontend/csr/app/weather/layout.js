import styles from './weather.module.css'

export default function RootLayout({ children }) {
    return (
         <body className={styles.background} style={{backgroundImage: "url(" + instate() + ")"}}>{children}</body>
     )
   }
   
   function instate()
   {
     return '/img/bg' + Math.floor(Math.random() * 5) + '.png';
   }