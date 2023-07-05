import { Box } from '@mui/material';
import Recipe from './modules/Recipe';
import VerticalLinearStepper from './modules/VerticalLinearStepper';
import { useState } from 'react';
import Conversion from './modules/Conversion';
import NewRecipe from './modules/NewRecipe';
import Basics from './modules/Basics';

function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [originalRecipe, setOriginalRecipe] = useState([]);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [magnitude, setMagnitude] = useState('');
  const [multiplier, setMultiplier] = useState('');
  const [subject, setSubject] = useState('');
  const [originalNumber, setOriginalNumber] = useState('');

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
        minWidth="fit-content"
        padding="1rem"
        color="primary.main"
        display="grid"
        alignItems="center"
        gridTemplateColumns="repeat(2, minmax(20rem, 25rem))"
      >
        <VerticalLinearStepper
          onNext={handleNext}
          onBack={handleBack}
          activeStep={activeStep}
        />
        <Box display="flex" alignItems="center" flexDirection="column">
          {activeStep === 0 && (
            <Basics
              onSubject={(e) => setSubject(e.target.value)}
              onOriginalNumber={(e) => setOriginalNumber(e.target.value)}
              onMultiplier={(e) => setMultiplier(e.target.value)}
            />
          )}
          {activeStep === 1 && (
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
          {activeStep === 2 && (
            <NewRecipe
              originalRecipe={originalRecipe}
              multiplier={multiplier}
              subject={subject}
              originalNumber={originalNumber}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default App;
