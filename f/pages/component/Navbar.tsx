import Link from 'next/link'
import styles from '../../styles/nav.module.css'
import button from '../../styles/button.module.css'
import { ConnectButton } from '@rainbow-me/rainbowkit';
export default function Navbar() {
 return (
  <>
   <div>
   <div className={button.button}><ConnectButton /> </div>
   <br />
  <nav className={styles.nav}>
    <ul>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/about">About</Link>
      </li>
      <li>
        <Link href="/blog/hello-world">Meme NFT</Link>
      </li>
    </ul>
    </nav>
    </div>
   </>
  )
}