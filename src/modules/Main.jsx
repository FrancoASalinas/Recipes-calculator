import { useState, useReducer } from 'react';
import NewRecipe from './NewRecipe';
import OriginalRecipe from './OriginalRecipe';
import Calculator from './Calculator';

function reducer(state, action) {
  switch (action.type) {
    case 'name':
      return {
        ...state,
        name: action.value,
      };
      break;
    case 'quantity':
      return {
        ...state,
        quantity: action.value,
      };
      break;
    case 'magnitude':
      return {
        ...state,
        magnitude: action.value,
      };
  }
}

export default function Main() {
  const [ingredients, setIngredients] = useState([]);
  const [calc, setCalc] = useState([]);
  const [portions, setPortions] = useState('');
  const [forWhat, setForWhat] = useState('');
  const [desiredAmount, setDesiredAmount] = useState('');

  const [state, dispatch] = useReducer(reducer);

  function handleChange(e) {
    const type = e.target.id;

    dispatch({ type: type, value: e.target.value });
  }

  function handleNewIngredient() {
    setIngredients([...ingredients, state]);
  }

  function handleDeleteRecipe() {
    return;
  }

  return (
    <>
      <main className="main">
        <OriginalRecipe
          ingredients={ingredients}
          onChange={handleChange}
          onClick={handleNewIngredient}
          onDelete={() => {
            setIngredients([]);
            setPortions('');
            setDesiredAmount('');
            setForWhat('');
          }}
        />
        <Calculator
          handlePortions={(e) => setPortions(e.target.value)}
          handleForWhat={(e) => setForWhat(e.target.value)}
          handleNewAmount={(e) => setDesiredAmount(e.target.value)}
        />
        <NewRecipe values={{ ingredients, portions, desiredAmount, forWhat }} />
      </main>
    </>
  );
}
