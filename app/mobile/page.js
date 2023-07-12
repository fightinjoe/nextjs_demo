// import Image from 'next/image'
import styles from './page.module.css'

import { getProductData } from "../../lib/data.js";

import Results from './results';

export default async function Home() {

  const products = await getProductData();

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        { <Results products={ JSON.stringify(products) } /> }
      </div>
    </main>
  )
}
