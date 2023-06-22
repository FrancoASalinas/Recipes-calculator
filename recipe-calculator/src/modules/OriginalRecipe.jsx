import { useState } from 'react';

export default function OriginalRecipe({
  ingredients,
  onChange,
  onClick,
  onDelete,
  onDeleteIndividual,
}) {
  return (
    <>
      <div className="main__original-recipe">
        <h2>Añadir ingrediente:(como aparece en la receta)</h2>
        <div id="form" className="main__form">
          <input onChange={onChange} id="name" />
          <input onChange={onChange} id="quantity" />
          <input onChange={onChange} id="magnitude" />
          <button onClick={onClick}>Añadir</button>
          <button onClick={onDelete}>Borrar receta</button>
        </div>
      </div>
      <List ingredients={ingredients} onDeleteIndividual={onDeleteIndividual} />
    </>
  );
}

function List({ ingredients, onDeleteIndividual }) {
  const listItem = ingredients.map((ingredient, index) => (
    <li key={index}>
      {ingredient.name} {ingredient.quantity} {ingredient.magnitude}
      <button onClick={() => onDeleteIndividual}>x</button>
    </li>
  ));
  return <ul className="main__ul">{listItem}</ul>;
}
