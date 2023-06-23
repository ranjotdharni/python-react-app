import NavBar from './(components)/NavBar';
import styles from './(components)/component.module.css';
import './globals.css';

export default function RootLayout({ children }) {
  return (
      <html>
        <body className={styles.background} style={{backgroundImage: "url(" + instate() + ")"}}>
          <NavBar />
          {children}
        </body>
      </html>
  )
}

function instate()
{
  return '/img/bg' + Math.floor(Math.random() * 5) + '.png';
}