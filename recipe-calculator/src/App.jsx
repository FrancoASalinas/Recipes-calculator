import { useState } from 'react'
import './App.scss'

export default function App() {
  return (
    <>
      <Header />
      <Main />
    </>
  )
}

function Header(){
  return(
    <>
      <div className="header">
        <h1 className='header__title'>Recipes Calculator</h1>
      </div>
    </>
  )
}

function Main(){
  return(
    <>
      <main className="main">
        <OriginalRecipe />
        <label>Rinde para <input type='number'/></label>
        <label>(personas, porciones, etc)<input type='text'/></label>
        <label>Debe rendir para<input type='number'/>Personas</label>
        <button>Calcular</button>
      </main>
    </>
  )
}

let nextId = 0;

function OriginalRecipe(){

  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState('');
  const [ingredientAmount, setIngredientAmount] = useState('');
  const [ingredientMagnitude, setIngredientMagnitude] = useState('');

  return (
    <>
    <div className='main__original-recipe'>
      <h2>Añadir ingrediente:(como aparece en la receta)</h2>
      <div id="form" className="main__form">
        <input value={ingredient} onChange={e => setIngredient(e.target.value)}/>
        <input value={ingredientAmount} onChange={e => setIngredientAmount(e.target.value)}/>
        <input value={ingredientMagnitude} onChange={e => setIngredientMagnitude(e.target.value)}/>
        <button onClick={() => {
          if(ingredient !== '' && ingredientAmount !== ''){
            setIngredients([
              ...ingredients,
            {
              id: nextId++,
              ingredient: ingredient,
              ingredientAmount: ingredientAmount,
              ingredientMagnitude: ingredientMagnitude
            }
            ]);
            console.log([ingredients])
          }
          }}>Añadir</button>
      </div>
    </div>
    <List />
    </>
  )

  function List(){
    const listItems = ingredients.map(ingredient =>
      <>
          <li key={ingredient.id}>{ingredient.ingredient} {ingredient.ingredientAmount}{ingredient.ingredientMagnitude} <button onClick={() => 
          setIngredients(
            ingredients.filter((a) => a.id !== ingredient.id)
          )}>Borrar</button></li>
      </>
    );

    return(
      <ul className='main__ul'>{listItems}</ul>
    )
  }
}