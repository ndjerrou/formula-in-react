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

  function handleSubmit(e){
    e.preventDefault() // stop the default request being emitted by the browser

    console.log(name, price)

   // EXO : make an http request to our products API

    // installer axios

    // démarrer son serveur back 

    // lancer une requête POST vers le endpoint nécessaire pour créer un produit

    axios.post() // cf ici : https://axios-http.com/docs/post_example

    // observer la réponse
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