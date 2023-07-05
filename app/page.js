import Image from 'next/image'
import styles from './page.module.css'

import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export default async function Home() {

  // Returns the sheet and rows for the given title
  async function loadSheetAndRows( title ) {
    const sheet = doc.sheetsByTitle[ title ];
    const rows = await sheet.getRows();

    return [sheet, rows];
  }

  const SCOPES = [
    'https://www.googleapis.com/auth/spreadsheets'
  ]
  
  const serviceAccountAuth = new JWT({
    email: process.env.GAPI_CLIENT_EMAIL,
    key: process.env.GAPI_PRIVATE_KEY,
    scopes: SCOPES,
  });
  
  const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID, serviceAccountAuth);
  await doc.loadInfo();

  let [,sellerRows] = await loadSheetAndRows('Sellers');
  let [productSheet,productRows] = await loadSheetAndRows('Products');

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>{`${sellerRows.length} sellers`}</h1>
        <h2>{`${productRows.length} products`}</h2>
      </div>
    </main>
  )
}
