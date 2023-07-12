import styles from './page.module.css';

export function Product({ product }) {
  return (
    <li className={ styles.product }>
      <a href={ `/mobile/${ product.id }` }>
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