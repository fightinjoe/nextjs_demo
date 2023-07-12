'use client'

import { useState } from 'react';

import styles from './page.module.css'
import Seller, { Product } from './seller';

export default function Results({ products }) {
  products = JSON.parse(products);

  let [page, setPage] = useState(0);
  let [search, setSearch] = useState('');

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