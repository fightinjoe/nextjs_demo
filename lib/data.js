import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets'
]

const serviceAccountAuth = new JWT({
  email: process.env.GAPI_CLIENT_EMAIL,
  key: process.env.GAPI_PRIVATE_KEY,
  scopes: SCOPES,
});

async function loadSheetAndRows( doc, title ) {
  const sheet = doc.sheetsByTitle[ title ];
  const rows = await sheet.getRows();

  return [sheet, rows];
}

// Returns an array of sellers with their products
export async function getSellerData() {
  const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID, serviceAccountAuth);
  await doc.loadInfo();
  
  let [,sellerRows] = await loadSheetAndRows(doc, 'Sellers');
  let [,productRows] = await loadSheetAndRows(doc, 'Products');
  
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
        img_src_1: prow.get('img_src_1'),
        img_alt_1: prow.get('img_alt_1'),
        title: prow.get('title'),
        price: prow.get('price'),
        description: prow.get('description'),
      }));
    
    seller.product_count = products.length;
    seller.products = products.slice(0,6);
  
    return seller;
  });

  return sellers;
}

export async function getProductData() {
  const sellers = await getSellerData();
 
    // Arrange the product array for easier printing
    let products = sellers.map( seller => {
      return seller.products
        // add the seller info to each product
        .map( (product, i) => {
          let { url, avatar_src, store, owner } = seller;
          product.seller = { url, avatar_src, store, owner };
  
          // Cleanup the price
          product.price = formatPrice(product.price);
  
          // Remove long URLs that wreck description formatting
          let d = product.description || '';
          d = d
            .replace(/<[^>]+>/g, '')
            .replace(/\S{21,}/g, '');
  
          product.description = d;
  
          // Add a search string for easier searching
          product.search = `${ product.title } ${ product.description } ${ product.img_alt_1 } ${ product.seller.store } ${ product.seller.owner }`;
    
          return product;
        });
    })
  
    // flatten to a 1 dimensional array of products
    products = products
      .reduce( (a, b) => a.concat(b) )
      .map( (product, i) => {
        // Add an id for easier lookup
        product.id = `${i}`;
        return product;
      });

    return products;
}

// Format the price to look like $1.00  
const formatPrice = (price) => {
  price = price.replace('$', '');

  let pieces = [ ...price.split('.'), '00' ];
  pieces[1] = pieces[1].padEnd(2, '0');

  return `$${ pieces[0] }.${ pieces[1].slice(0,2) }`;
}