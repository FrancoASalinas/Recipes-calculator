import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';

function NewRecipe({ originalRecipe, conversion }) {
  const Ingredients = originalRecipe.map((ingredient, i) => (
    <li key={i}>
      {ingredient.name}{' '}
      {Number(ingredient.number) * Number(conversion.multiplier)}
      {ingredient.magnitude}
    </li>
  ));

  return (
    <>
      <Typography variant="h2">Your Recipe is Ready!</Typography>
      <Accordion>
        <AccordionSummary>
          <Typography>
            Recipe name for {conversion.multiplier} {conversion.subject}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>{Ingredients}</AccordionDetails>
      </Accordion>
    </>
  );
}

export default NewRecipe;
