import React from 'react';
import { Button, Stack } from '@mui/material';

export type Choice<T = unknown> = {
  text: string;
  next: T; // générique pour typer correctement le "next"
};

interface ChoiceButtonsProps<T = unknown> {
  choices: Choice<T>[];
  onChoice: (next: T) => void;
}

const ChoiceButtons = <T,>({ choices, onChoice }: ChoiceButtonsProps<T>) => (
  <Stack direction="column" spacing={1} mt={2}>
    {choices.map((choice, idx) => (
      <Button
        key={idx}
        variant="contained"
        color="primary"
        onClick={() => onChoice(choice.next)}
        fullWidth
      >
        {choice.text}
      </Button>
    ))}
  </Stack>
);

export default ChoiceButtons;
