import { Box } from '@mui/material';
import Recipe from './modules/Recipe';
import VerticalLinearStepper from './modules/VerticalLinearStepper';
import { useState } from 'react';
import Conversion from './modules/Conversion';
import NewRecipe from './modules/NewRecipe';

function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [originalRecipe, setOriginalRecipe] = useState([]);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [magnitude, setMagnitude] = useState('');
  const [multiplier, setMultiplier] = useState('');
  const [subject, setSubject] = useState('');
  const [conversion, setConversion] = useState([]);

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
          {activeStep === 0 && (
            <Recipe
              onName={(e) => setName(e.target.value)}
              onNumber={(e) => setNumber(e.target.value)}
              onMagnitude={(e) => setMagnitude(e.target.value)}
              onClick={() => {
                setOriginalRecipe([
                  ...originalRecipe,
                  {
                    name: name,
                    number: number,
                    magnitude: magnitude,
                  },
                ]);
              }}
            />
          )}
          {activeStep === 1 && (
            <Conversion
              onMultiplier={(e) => setMultiplier(e.target.value)}
              onSubject={(e) => setSubject(e.target.value)}
              onClick={() => setConversion([{ multiplier, subject }])}
            />
          )}
          {activeStep === 2 && (
            <NewRecipe
              conversion={conversion[0]}
              originalRecipe={originalRecipe}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default App;
