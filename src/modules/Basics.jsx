import { Box, Typography } from '@mui/material';
import { StyledTextField } from './StyledTextField';

export default function Basics({ onSubject, onOriginalNumber, onMultiplier }) {
  return (
    <>
      <Typography variant="h4">Set first parameters</Typography>
      <StyledTextField
        label="Number of units"
        onChange={onOriginalNumber}
        required
      />
      <StyledTextField
        placeholder="People, portions."
        label="Subject"
        onChange={onSubject}
        required
      />
      <StyledTextField
        label="Desired number of units"
        onChange={onMultiplier}
        required
      />
    </>
  );
}
