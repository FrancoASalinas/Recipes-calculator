import { Box } from '@mui/material';
import Recipe from './modules/Recipe';
import VerticalLinearStepper from './modules/VerticalLinearStepper';
import { useState } from 'react';
import Conversion from './modules/Conversion';
import NewRecipe from './modules/NewRecipe';

function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [originalRecipe, setOriginalRecipe] = useState('');

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  return (
    <Box
      bgcolor="#000"
      minWidth="100vw"
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        bgcolor="#333"
        width="200px"
        height="200px"
        borderRadius="20px"
        minHeight="28rem"
        minWidth="80%"
        padding="1rem"
        color="primary.main"
        display="grid"
        alignItems="center"
        gridTemplateColumns="1fr 1fr"
      >
        <VerticalLinearStepper
          onNext={handleNext}
          onBack={handleBack}
          activeStep={activeStep}
        />
        <Box display="flex" alignItems="center" flexDirection="column">
          {activeStep === 0 && <Recipe />}
          {activeStep === 1 && <Conversion />}
          {activeStep === 2 && <NewRecipe />}
        </Box>
      </Box>
    </Box>
  );
}

export default App;
