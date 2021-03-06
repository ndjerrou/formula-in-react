import Product from "./Product"

function Products({products, onDelete}){
    return (
        <div>
            <h2>Mes produits à vendre</h2>
                { 
                 products.map(
                    (product)=> (
                        <Product 
                            key={product.id}
                            product={product}
                            onDelete={onDelete}
                        />))
                }
        </div>
    )
}       

export default Products