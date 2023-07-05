import { Box, Button, TextField, Typography, styled } from '@mui/material';
import { StyledTextField } from './StyledTextField';

function Conversion({ onSubject, onMultiplier, onClick }) {
  return (
    <>
      <Typography variant="h5" textAlign="center" marginBottom="2rem">
        Set the conversion values
      </Typography>
      <StyledTextField
        type="number"
        required
        label="Conversion multiplier"
        onChange={onMultiplier}
      />
      <StyledTextField
        label="Subject"
        placeholder="People, portions, units"
        onChange={onSubject}
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
      </Box>
    </>
  );
}

export default Conversion;
