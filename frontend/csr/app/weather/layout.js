import styles from './weather.module.css'
import NavBar from './(components)/NavBar';

export default function RootLayout({ children }) {
  return (
      <>
        <body className={styles.background} style={{backgroundImage: "url(" + instate() + ")"}}>
          <NavBar />
          {children}
        </body>
      </>
  )
}
   
function instate()
{
  return '/img/bg' + Math.floor(Math.random() * 5) + '.png';
}