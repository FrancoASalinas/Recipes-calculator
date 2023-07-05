import { Box } from '@mui/material';
import { StyledTextField } from './StyledTextField';

export default function Basics({ onSubject, onOriginalNumber, onMultiplier }) {
  return (
    <Box>
      <StyledTextField label="Number of units" onChange={onOriginalNumber} />
      <StyledTextField
        placeholder="People, portions."
        label="Subject"
        onChange={onSubject}
      />
      <StyledTextField
        label="Desired number of units"
        onChange={onMultiplier}
      />
    </Box>
  );
}
