import axios from 'axios'
import {useState} from 'react'


export default function () {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)

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

    console.log(resultat)
  }

  return (
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
  );
}