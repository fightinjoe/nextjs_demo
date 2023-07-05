'use client'

import { useState } from 'react';

import styles from './page.module.css'
import Seller from './seller';

export default function Results({ sellers }) {
  sellers = JSON.parse(sellers);

  let [page, setPage] = useState(0);
  let [search, setSearch] = useState('');

  if (search) {
    sellers = sellers
      .map( (seller) => {
        const match = seller.search.match(new RegExp(search, 'ig')) || [];
        seller.match = match.length;
        return seller;
      })
      .filter( seller => seller.match )
      .sort( (a, b) => b.match - a.match );
    
    
    sellers.filter( (seller) => (
      seller.search.indexOf(search) > -1
    ));
  }

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(0);
  }

  return (
    <>
      <input type="text" placeholder="Search" onChange={ handleSearch } />

      { page > 0
        ? <button onClick={ () => setPage(page - 1) }>Previous</button>
        : null
      }
      <span>Page { page + 1 } / { Math.ceil(sellers.length / 10) }</span>
      {
        page < sellers.length - 1
        ? <button onClick={ () => setPage(page + 1) }>Next</button>
        : null
      }

      <div id={ styles.sellers }>
        { sellers.slice(page*10, page*10+10).map( (seller, i) => (<Seller key={i} seller={ seller } />) )}
      </div>
    </>

  )
}