import styles from './page.module.css';

export default function Seller({ seller }) {
  return (
    <div className={ styles.seller }>
      
      <div className={ styles.avatar }>
        <a href={ seller.url } target="_blank">
          <img src={ seller.avatar_src } alt={ seller.owner } />
          <div className={ styles.store }>
            <span>{ seller.owner } <small>{ seller.username }</small></span>
            <span>{ seller.store }</span>
          </div>
          <div className={ styles.summary }>
            <span>{ seller.products.length } products</span>
            <span>{ seller.location }</span>
          </div>
        </a>
      </div>

      <ul className={ styles.products }>
        { seller.products.map( (product, i) => <Product key={i} product={product} /> ) }
      </ul>
    </div>
  )
}

export function Product({ product }) {
  return (
    <li className={ styles.product }>
      <a href={ product.link_href } target="_blank">
        <img src={ product.img_src } alt={ product.title } />
        <div className={ styles.description }>
          <h1>{ product.title }</h1>
          <span className={ styles.price }>{ product.price }</span>
        </div>
      </a>
    </li>
  )
}