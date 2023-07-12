import { getProductData } from "../../../lib/data.js";
import styles from "./page.module.css";

export default async function ProductPage({ params }: { params: { product: string } }) {
  
  const products = await getProductData();
  const product = products.find( product => product.id === params.product );
  
  return (
    <div className={ styles.page }>
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