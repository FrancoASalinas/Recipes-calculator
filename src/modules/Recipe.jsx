import { Box, Button, TextField, Typography, styled } from '@mui/material';
import { useState } from 'react';
import { StyledTextField } from './StyledTextField';

export default function Recipe({ onName, onNumber, onMagnitude, onClick }) {
  return (
    <>
      <Typography variant="h5" textAlign="center" marginBottom="2rem">
        Add ingredients to your new recipe
      </Typography>
      <StyledTextField label="Ingredient name" onChange={onName} required />
      <StyledTextField
        type="number"
        label="Number of Units"
        onChange={onNumber}
        required
      />
      <StyledTextField
        label="Magnitude"
        placeholder="k, g, pounds"
        onChange={onMagnitude}
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
          onClick={onClick}
        >
          Add Ingredient
        </Button>
      </Box>
    </>
  );
}

