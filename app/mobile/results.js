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
      // add the seller info to each product
      .map( product => {
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
        product.search = `${ product.title } ${ product.description } ${ product.seller.store } ${ product.seller.owner }`;

        return product;
      });
  })

  // flatten to a 1 dimensional array of products
  products = products.reduce( (a, b) => a.concat(b) );

  if (search) {
    products = products
      .map( (product) => {
        const match = product.search.match(new RegExp(search, 'ig')) || [];
        product.match = match.length;
        return product;
      })
      .filter( product => product.match )
      .sort( (a, b) => b.match - a.match );
    
    
    products.filter( (product) => (
      product.search.indexOf(search) > -1
    ));
  }

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(0);
  }

  const SIZE = 20;

  return (
    <>
      <header className={ styles.header }>
        <div className={ styles.search }>
          <input type="text" placeholder="Search" onChange={ handleSearch } />
        </div>

        <div className={ styles.pagination }>
          { page > 0
            ? <button onClick={ () => setPage(page - 1) }>&lt;</button>
            : null
          }
          <span>{ page + 1 } / { Math.ceil(products.length / SIZE) }</span>
          {
            page < products.length - 1
            ? <button onClick={ () => setPage(page + 1) }>&gt;</button>
            : null
          }
        </div>  
      </header>

      <div id={ styles.products }>
        { products.slice(page*SIZE, (page+1)*SIZE).map(
          (product, i) => (<Product key={i} product={ product } />)
        )}
      </div>
    </>

  )
}