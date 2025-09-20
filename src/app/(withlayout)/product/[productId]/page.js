import { getProductById } from "@/actions/productActions";
import Product from "@/screens/product";

export const revalidate = 60;

const ProductPage = async ({params})=>{
    const {productId} = params;
    const product = await getProductById(productId);

    return(
        <>
            <Product product={product?.data}/>
        </>
    )
}

export default ProductPage;