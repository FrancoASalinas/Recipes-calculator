import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const steps = [
  {
    label: 'Set the first parameters for the new recipe.',
    description:
      'Set the desired conversion, e.g.: for 20 people if the original recipe was for 4 people.',
  },
  {
    label: 'Set the ingredients.',
    description: `Write your recipe adding all the ingredients you are given.`,
  },
  {
    label: 'Enjoy!',
    description: `And don't forget to cook with love <3.`,
  },
];

export default function VerticalLinearStepper({
  onNext,
  onBack,
  activeStep,
  error,
}) {
  return (
    <Box padding="2rem" height="24rem" width="25rem">
      <Stepper activeStep={activeStep} orientation="vertical" height="100%">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={onNext}
                    sx={{ mt: 1, mr: 1 }}
                    disabled={error}
                  >
                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={onBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
