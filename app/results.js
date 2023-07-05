'use client'

import { useState } from 'react';

import styles from './page.module.css'
import Seller from './seller';

export default function Results({ sellers }) {
  sellers = JSON.parse(sellers);

  let [page, setPage] = useState(0);

  return (
    <>
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