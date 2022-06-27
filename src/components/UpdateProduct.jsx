import { useState } from 'react'

function UpdateProduct({ product, formData, onChange, onSubmit }) {

    return (
        <form onSubmit={onSubmit}>
            Nom du produit<input type="text" name="name" value={formData.name} onChange={onChange} />
            Prix du produit<input type="number" name="price" value={formData.price} onChange={onChange} />
            <button>Modifier le produit</button>
        </form>
    )
}

export default UpdateProduct