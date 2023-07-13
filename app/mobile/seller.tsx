'use client'

import styles from './page.module.css';

import { useCallback } from 'react';
import { usePathname } from 'next/navigation';

export function Product({ product }) {
  const pathname = usePathname();
  
  const createQueryString = useCallback( (productID: string) => {
    const params = new URLSearchParams();
    params.set('product', productID);
    return params.toString();
  }, [] )

  return (
    <li className={ styles.product }>
      <a href={ pathname + '?' + createQueryString(product.id) }>
        <img src={ product.img_src } alt={ product.title } />
        <div className={ styles.details }>
          <h1>{ product.title }</h1>
          <p className={ styles.metadata }>
            <span className={ styles.seller }>{ product.seller.owner }</span>
            <span className={ styles.price }>{ product.price }</span>
          </p>
          <p className={ styles.description }>
            { product.description }
          </p>
        </div>
      </a>
    </li>
  )
}