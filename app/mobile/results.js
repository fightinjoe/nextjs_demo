'use client'

import { useState } from 'react';

import styles from './page.module.css'
import Seller, { Product } from './seller';

export default function Results({ sellers }) {
  sellers = JSON.parse(sellers);

  let [page, setPage] = useState(0);
  let [search, setSearch] = useState('');

  // Format the price to look like $1.00  
  const formatPrice = (price) => {
    price = price.replace('$', '');

    let pieces = [ ...price.split('.'), '00' ];
    pieces[1] = pieces[1].padEnd(2, '0');

    return `$${ pieces[0] }.${ pieces[1].slice(0,2) }`;
  }

  // Arrange the product array for easier printing
  let products = sellers.map( seller => {
    return seller.products
      // take the first two products from each seller
      .slice(0,2)
      // add the seller info to each product
      .map( product => {
        let { url, avatar_src, store, owner } = seller;
        product.seller = { url, avatar_src, store, owner };

        // Cleanup the price
        product.price = formatPrice(product.price);

        // Remove long URLs that wreck description formatting
        product.description = product.description || '';
        product.description = product.description.replace(/https?:\/\/[^\s]+/g, '');

        return product;
      });
  })

  // flatten to a 1 dimensional array of products
  products = products.reduce( (a, b) => a.concat(b) );

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(0);
  }

  return (
    <>
      <header className={ styles.header }>
        <h1>LocalBy</h1>

        <div className={ styles.search }>
          <input type="text" placeholder="Search" onChange={ handleSearch } />
        </div>

        <div className={ styles.pagination }>
          { page > 0
            ? <button onClick={ () => setPage(page - 1) }>&lt;</button>
            : null
          }
          <span>Page { page + 1 } / { Math.ceil(products.length / 10) }</span>
          {
            page < products.length - 1
            ? <button onClick={ () => setPage(page + 1) }>&gt;</button>
            : null
          }
        </div>  
      </header>

      <div id={ styles.products }>
        { products.slice(page*10, page*10+10).map(
          (product, i) => (<Product key={i} product={ product } />)
        )}
      </div>
    </>

  )
}