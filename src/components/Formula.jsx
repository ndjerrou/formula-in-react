import axios from 'axios'
import {useState, useEffect} from 'react'





export default  function () {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)

  const [products, setProducts] = useState(null)


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

  console.log('render formula C')


  function handleChangeName(e){
    setName(e.target.value)
  }
  function handleChangePrice(e){
    setPrice(e.target.value)
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
        <h2>Mes produits à vendre</h2>
        {products && <ul>
          { products.map((product)=><li>{product.name} - {product.price} €</li>)}
      </ul>
      }
      </div>
    </div>
  );
}

// EX - supprimer un produit affiché

// Ajouter un bouton/icone à côté de mon produit

// Récupérer le clic sur ce bouton/icone

// Déclencher une requête vers le back pour supprimer ce produit

// Question : le produit est supprimé du back, comment refléter ça côté front ?