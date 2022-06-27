import axios from 'axios'
import {useState, useEffect} from 'react'
import env from "react-dotenv";

import './Formula.css'
import Products from './Products'
import UpdateProduct from './UpdateProduct';

function Formula() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [isUpdate, setIsUpdate] = useState(false)

  const [products, setProducts] = useState([])
  const [product, setProduct] = useState({})

    //state for UpdateProduct
    const [formData, setFormData] = useState({
      name: "",
      price: ""
  })

  const client = axios.create({
    baseURL: `http://localhost:${env.PORT_SERVER}`,
    timeout: 1000,
  });


  useEffect( ()=>{
    // with the [], get fired once the component is mounted into the DOM

  // // getting the products...

  async function getProducts(){
    try{
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
    e.target.selectedIndex ? setIsUpdate(true) : setIsUpdate(false)

    const product = products.find(product=>product.id === +e.target.value)

    setProduct(product)
    setFormData(product)
  }

    const handleChangeToUpdate = (e) => {
        console.log(e.target.name)
        console.log(e.target.value)
        setFormData(
            prevState => (
                {
                    ...prevState,
                    [e.target.name]: e.target.value
                }
            )
        )
    }

    const handleSubmitToUpdate = (e) => {
        e.preventDefault()

        console.log('handle submit')
        console.log(formData)
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom du produit<input value={name} onInput={handleChangeName}/>
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
        <option defaultValue>--Choisir un produit--</option>
        {
          products.map((product)=>{
            return <option value={product.id} key={product.id}>{product.name}</option>
          }) 
        }
      {/* 
        {
          products.map((product)=><option>{product.name}</option>)
        } */
      }
      </select>
      {isUpdate && <UpdateProduct 
        product={product}
        formData={formData}
        onChange={handleChangeToUpdate}
        onSubmit={handleSubmitToUpdate}
      />}
    </div>
  );
}

export default Formula