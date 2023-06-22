export default function NewRecipe({ values }) {
  const listItem = values.ingredients.map((ingredient, index) => {
    return (
      <>
        <li key={index}>
          {ingredient.name}{' '}
          {(ingredient.quantity * values.desiredAmount) / values.portions}
          {ingredient.magnitude}
          <button> x </button>
        </li>
      </>
    );
  });
  return (
    <>
      <h2>
        {values.desiredAmount} {values.forWhat}
      </h2>
      <ul className="main__ul">{listItem}</ul>
    </>
  );
}
