import { Box, styled, Grid } from '@mui/material';
import Recipe from './modules/Recipe';
import VerticalLinearStepper from './modules/VerticalLinearStepper';
import { useState } from 'react';
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
      width="100%"
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <StyledGrid
        container
        bgcolor="#333"
        color="primary.main"
        alignItems="center"
        direction="row"
        justifyContent="center"
      >
        <VerticalLinearStepper
          onNext={handleNext}
          onBack={handleBack}
          activeStep={activeStep}
          xs={1}
        />
        <Box xs={1}>
          <AnimatedBox activeStep={activeStep} step={0}>
            <Basics
              onSubject={(e) => setSubject(e.target.value)}
              onOriginalNumber={(e) => setOriginalNumber(e.target.value)}
              onMultiplier={(e) => setMultiplier(e.target.value)}
            />
          </AnimatedBox>
          <AnimatedBox activeStep={activeStep} step={1}>
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
                setName('');
                setNumber('');
                setMagnitude('');
              }}
              name={name}
              number={number}
              magnitude={magnitude}
              originalRecipe={originalRecipe}
            />
          </AnimatedBox>
          <AnimatedBox activeStep={activeStep} step={2}>
            <NewRecipe
              originalRecipe={originalRecipe}
              multiplier={multiplier}
              subject={subject}
              originalNumber={originalNumber}
            />
          </AnimatedBox>
        </Box>
      </StyledGrid>
    </Box>
  );
}

const AnimatedBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'activeStep' && prop !== 'step',
})(({ theme, activeStep, step }) => ({
  transition: 'transform .5s, opacity .5s',
  transitionDelay: 'width 2s, height 2s',
  visibility: activeStep === step ? 'visible' : 'hidden',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '.5rem',
  padding: '.5rem',
  transform:
    activeStep < step
      ? 'translateX(150%)'
      : activeStep > step
      ? 'translateX(-150%)'
      : activeStep === step
      ? 'translateX(0)'
      : '',
  height: activeStep !== step ? '0px' : '25rem',
  width: activeStep !== step ? '0px' : '15rem',
  justifyContent: 'center',
  [theme.breakpoints.up('sm')]: {
    width: activeStep !== step ? '0px' : '28rem',
    transform:
      activeStep < step
        ? 'translateY(150%)'
        : activeStep > step
        ? 'translateY(-150%)'
        : activeStep === step
        ? 'translateY(0)'
        : '',
    opacity: activeStep === step ? '100%' : '0%',
  },
}));

const StyledGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.up('xs')]: {
    height: '100%',
    minHeight: '100vh',
    borderRadius: 'none',
    padding: '1rem',
    overflow: 'hidden',
  },
}));

export default App;
