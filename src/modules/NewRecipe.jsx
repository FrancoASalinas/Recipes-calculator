import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';

function NewRecipe({
  originalRecipe,
  multiplier,
  subject,
  originalNumber,
  recipeName,
}) {
  const Ingredients = originalRecipe.map((ingredient) => (
    <li key={ingredient.name}>
      {ingredient.name}{' '}
      {(Number(ingredient.number) * Number(multiplier)) /
        Number(originalNumber)}{' '}
      {ingredient.magnitude}
    </li>
  ));

  return (
    <>
      <Typography variant="h4">Your Recipe is Ready!</Typography>
      <Accordion>
        <AccordionSummary>
          <Typography>
            {recipeName !== '' ? recipeName : 'Recipe'} for {Number(multiplier)}{' '}
            {subject}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>{Ingredients}</AccordionDetails>
      </Accordion>
    </>
  );
}

export default NewRecipe;
