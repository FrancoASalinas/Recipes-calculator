import { Box, Button, Typography } from '@mui/material';
import { StyledTextField } from './StyledTextField';
import { useState } from 'react';

export default function Recipe({
  onName,
  onNumber,
  onMagnitude,
  onClick,
  name,
  magnitude,
  number,
  originalRecipe,
}) {
  const [ingredientList, setIngredientList] = useState(false);

  return (
    <>
      {ingredientList ? (
        <>
          <ul>
            {originalRecipe.map((item) => (
              <li key={item.name}>
                {item.name} {item.number} {item.magnitude}
              </li>
            ))}
          </ul>
          <Button onClick={() => setIngredientList(false)}>{'<'}</Button>
        </>
      ) : (
        <>
          <Typography variant="h4" textAlign="center" marginBottom="2rem">
            Add ingredients to your new recipe
          </Typography>
          <StyledTextField
            label="Ingredient name"
            onChange={onName}
            required
            value={name}
          />
          <StyledTextField
            type="number"
            label="Number of Units"
            onChange={onNumber}
            value={number}
            required
          />
          <StyledTextField
            label="Magnitude"
            placeholder="k, g, pounds"
            onChange={onMagnitude}
            value={magnitude}
          />
          <Box display="flex" gap=".5rem">
            <Button
              sx={{
                marginTop: '1rem',
              }}
              variant="contained"
              onClick={onClick}
            >
              Add Ingredient
            </Button>
            <Button
              onClick={() => setIngredientList(true)}
              sx={{
                marginTop: '1rem',
              }}
              variant="contained"
            >
              watch {'>'}
            </Button>
          </Box>
        </>
      )}
    </>
  );
}
