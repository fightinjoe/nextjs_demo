'use client'

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

import styles from './page.module.css'
import { Product } from './seller';

export default function Results({ products }) {
  // Products are passed from the Server and are serialized as JSON
  products = JSON.parse(products);

  // State variables
  let [page, setPage] = useState(0);
  let [search, setSearch] = useState('');

  const searchParams = useSearchParams();
  const productID = searchParams.get('product');

  if( productID ) {
    let product = products.find( product => product.id === productID );

    return (
      <div className={ styles.productPage }>
        <a className={ styles.back } href="/mobile">X</a>

        <img src={ product.img_src } alt={ product.title } />
        <div className={ styles.product }>
          <h1>{ product.title }</h1>
          <p>{ product.description }</p>
          <div className={ styles.buy }>
            <img src={ product.seller.avatar_src } alt={ product.seller.owner } />
            <span className={ styles.owner }>{ product.seller.owner }</span>
            <button>Buy for { product.price }</button>
          </div>
        </div>
        {
          product.img_src_1
          ? <img src={ product.img_src_1 } alt={ product.img_alt_1 } />
          : null
        }
      </div>
    );
  }

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