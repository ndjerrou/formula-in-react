function Product({product, onDelete}){
    return (
            <div>
                <div class="products">
                <li>{product.name} - {product.price} €</li> -
                <i 
                class="fa-solid fa-trash-can" 
                onClick={()=>onDelete(product.id)}>
                </i>
                </div>
          </div>
    )
}

export default Product