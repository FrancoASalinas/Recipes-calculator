import { useState } from 'react'
import './App.scss'
import OriginalRecipe from './modules/OriginalRecipe'
import Header from './modules/Header'

export default function App() {
  return (
    <>
      <Header />
      <Main />
    </>
  )
}

function Main(){
  const [ingredients, setIngredients] = useState([]);
  const [calc, setCalc] = useState([]);
  const [portions, setAmount] = useState('');
  const [forWhat, setForWhat] = useState('');
  const [desiredAmount, setDesiredAmount] = useState('');

  console.log(calc);

  function NewRecipe(){
    const listItem = calc.map((item) =>{
        return (
        <>
        <li key={item.id}>{item.ingredient} {item.ingredientAmount * desiredAmount / portions}{item.ingredientMagnitude}<button onClick={() =>
          setCalc(
            calc.filter((a) => a !== item)
          )}> Borrar </button></li>
          </>
          )
        })
    return(
      <>
      <h2>{desiredAmount} {forWhat}</h2>
      <ul className="main__ul">{listItem}</ul>
      </>
    )
  }

  return(
    <>
      <main className="main">
        <OriginalRecipe ingredients={ingredients} setIngredients={setIngredients} />
        <div className="main__calculator">
          <label>Rinde para <input type="number" value={portions} 
          onChange={(e) => {
            if (e.target.value === '') return
            setAmount(e.target.value)}}/></label>
          <label>(personas, porciones, etc)<input type="text" value={forWhat} onChange={(e) => setForWhat(e.target.value)}/></label>
          <label>Debe rendir para<input type="number" value={desiredAmount} onChange={(e) => setDesiredAmount(e.target.value)}/></label>
          <button onClick={() => {
            setCalc(ingredients.slice(0));
          }}>Calcular</button>
        </div>
        <NewRecipe />
      </main>
    </>
  )

  

}

let nextId = 0;