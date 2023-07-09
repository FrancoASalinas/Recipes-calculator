import { Box, Typography } from '@mui/material';
import { StyledTextField } from './StyledTextField';

export default function Basics({
  onSubject,
  onOriginalNumber,
  onMultiplier,
  onRecipeName,
}) {
  return (
    <>
      <Typography variant="h4">Set first parameters</Typography>
      <StyledTextField
        label="Number of units"
        onChange={onOriginalNumber}
        required
        type="number"
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
        type="number"
      />
      <StyledTextField label="Recipe name" onChange={onRecipeName} />
    </>
  );
}
