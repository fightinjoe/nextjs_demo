import { getProductData } from "../../../lib/data.js";

export default async function ProductPage({ params }: { params: { product: string } }) {
  
  const products = await getProductData();
  const product = products.find( product => product.id === params.product );
  
  return (
    <div className="page">
      <h1>{ product.title }</h1>
    </div>
  );
}