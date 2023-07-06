import { Box, Button, Typography } from '@mui/material';
import { StyledTextField } from './StyledTextField';

export default function Recipe({
  onName,
  onNumber,
  onMagnitude,
  onClick,
  onClear,
  name,
  magnitude,
  number,
}) {
  return (
    <>
      <Typography variant="h5" textAlign="center" marginBottom="2rem">
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
        >
          watch
        </Button>
        <Button
          sx={{
            marginTop: '1rem',
          }}
          variant="contained"
          onClick={(onClick, onClear)}
        >
          Add Ingredient
        </Button>
      </Box>
    </>
  );
}
