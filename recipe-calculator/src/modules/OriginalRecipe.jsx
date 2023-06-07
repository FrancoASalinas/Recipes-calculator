import { useState } from 'react'

export default function OriginalRecipe(props){
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
            props.setIngredients(
              [
                ...props.ingredients,
                {
                  ingredient: ingredient,
                  ingredientAmount: ingredientAmount,
                  ingredientMagnitude: ingredientMagnitude
                }
              ]
            )
          }}>Añadir</button>
        </div>
      </div>
      <List />
      </>
    )
  
    function List(){
        let nextId = 0;
      const listItem = props.ingredients.map((item) =>
        <li key={nextId++}>{item.ingredient} {item.ingredientAmount} {item.ingredientMagnitude}<button onClick={() =>
          props.setIngredients(
            props.ingredients.filter((a) => a !== item)
          )}> Borrar </button></li>
      )
      return(
        <ul className='main__ul'>
          {listItem}
        </ul>
      )
    }
  }