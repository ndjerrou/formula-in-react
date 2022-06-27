import axios from 'axios'
import {useState, useEffect} from 'react'
import env from "react-dotenv";

import './Formula.css'
import Products from './Products'

function Formula() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)

  const [products, setProducts] = useState([])

  const client = axios.create({
    baseURL: `http://localhost:${env.PORT_SERVER}`,
    timeout: 1000,
  });


  useEffect( ()=>{
    // with the [], get fired once the component is mounted into the DOM
    console.log('after mounted into the dom')

  // // getting the products...

  async function getProducts(){
    try{
      console.log(`/reseller/list-products`)
      const result = await client.get(`/reseller/list-products`) //side-effects
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
    await client.delete(`/reseller/delete-product/${id}`)

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
    console.log(`/reseller/add-product`)
    const resultat = await client.post(`/reseller/add-product`,{
    name,
    price
    }) 
  }

  function handleSelect(e){
    console.log(e.target.value)
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
      <h3>Updater un produit</h3>
      <select onChange={handleSelect}>
        <option name="produit" value="Nissim">P1</option>
        <option name="produit" value="Marie">P2</option>
        <option name="produit" value="Pierre">P3</option>
      </select>
    </div>
  );
}

export default Formula