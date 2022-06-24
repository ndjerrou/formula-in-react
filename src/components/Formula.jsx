import axios from 'axios'
import {useState, useEffect} from 'react'

import './Formula.css'
import Products from './Products'




function Formula() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)

  const [products, setProducts] = useState([])


  useEffect( ()=>{
    // with the [], get fired once the component is mounted into the DOM
    console.log('after mounted into the dom')

  // // getting the products...

  async function getProducts(){
    try{
      const result = await axios.get("http://localhost:3001/reseller/list-products") //side-effects
      setProducts(result.data) // provquer un re-render = la fonction du composant s'éxécute à nouveau
    }
    catch(err){
      console.error(err.message)
    }
  }

  getProducts()
  }, [])

  function handleChangeName(e){
    setName(e.target.value)
  }
  function handleChangePrice(e){
    setPrice(e.target.value)
  }

  async function handleDelete(id){
    await axios.delete(`http://localhost:3001/reseller/delete-product/${id}`)

    // const filteredProducts = products.filter(product=>{
    //   const bool = product.id !== id // true si le produit durant ce tour possède un id différent // false sinon

    //   return bool
    // })
    const filteredProducts = products.filter(product => product.id !== id)

    // provoquer un rerender ==> modifier un state
    setProducts(filteredProducts)
  }


  async function handleSubmit(e){
    e.preventDefault() // stop the default request being emitted by the browser

    const resultat = await axios.post("http://localhost:3001/reseller/add-product",{
    name,
    price
    }) 
  }


  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom du produit<input value={name} onChange={handleChangeName}/>
          </label>
          </div>
        <div>
          <label>Prix du produit<input value={price} onChange={handleChangePrice} type="number" />
          </label>
          </div>
        <button>Créer mon produit</button>
      </form>
      <div> 
        {products.length ? <ul>{<Products products={products} onDelete={handleDelete}/>}</ul> : <p>Plus de stock disponible</p>}
      </div>
    </div>
  );
}

export default Formula