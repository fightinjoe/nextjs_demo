// import Image from 'next/image'
import styles from './page.module.css'

import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

import Results from './results';

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
  let [,productRows] = await loadSheetAndRows('Products');

  let sellers = sellerRows.map( row => {
    let seller = {
      avatar_src: row.get('avatar_src'),
      owner: row.get('owner'),
      username: row.get('username'),
      store: row.get('store'),
      location: row.get('location')
    };

    let products = productRows
      .filter( product => product.get('username') === row.get('username') )
      .map( prow => ({
        link_href: prow.get('link_href'),
        img_src: prow.get('img_src'),
        title: prow.get('title'),
        price: prow.get('price'),
        description: prow.get('description'),
      }));
    
    seller.product_count = products.length;
    seller.products = products.slice(0,6);

    return seller;
  });

  sellers = sellers.map( seller => {
    seller.search = [
      seller.owner,
      seller.username,
      seller.store,
      seller.products.map( product => ([
        product.title,
        product.description
      ].join("\n")))
    ].join("\n");

    return seller;
  });

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>{`${sellerRows.length} sellers`}</h1>
        <h2>{`${productRows.length} products`}</h2>
        { <Results sellers={ JSON.stringify(sellers) } /> }
      </div>
    </main>
  )
}
