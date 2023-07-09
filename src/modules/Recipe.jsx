import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
  styled,
} from '@mui/material';
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
  onDelete,
}) {
  const [ingredientList, setIngredientList] = useState(false);

  return (
    <>
      {ingredientList ? (
        <>
          <Grid
            item
            xs={12}
            md={6}
            width="100%"
            height="100%"
            alignItems="center"
          >
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              Ingredients
            </Typography>
            <List>
              {originalRecipe.map((ingredient, index) => (
                <ListItem key={ingredient.name + ingredient.number}>
                  <ListItemText
                    primary={`${ingredient.name} ${ingredient.number} ${ingredient.magnitude}`}
                  />
                  <Button
                    variant="contained"
                    onClick={() => onDelete(ingredient)}
                  >
                    X
                  </Button>
                </ListItem>
              ))}
            </List>
          </Grid>
          <Button variant="contained" onClick={() => setIngredientList(false)}>
            {'<'}
          </Button>
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
              disabled={name === '' || number === ''}
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
