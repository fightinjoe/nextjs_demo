// import Image from 'next/image'
import styles from './page.module.css'

import { getSellerData } from '../lib/data';

import Results from './results';

export default async function Home() {

  const sellers = await getSellerData();

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        { <Results sellers={ JSON.stringify(sellers) } /> }
      </div>
    </main>
  )
}
