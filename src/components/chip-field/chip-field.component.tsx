import { useState } from 'react';
import { Button, Chip, TextField } from 'react-md';

type ChipFieldProps = {
  chips: string[];
  disabled: boolean;
  setchip: (v: string[]) => void;
};

const ChipField = ({ chips, disabled, setchip }: ChipFieldProps) => {
  const [newChip, setNewChip] = useState('');

  return chips && (
    <>
      {disabled
        ? chips.map((effect: string) => (
          <Chip key={effect} theme="outline" noninteractable>
            {effect}
          </Chip>
        ))
        :
        <>
          {chips.map((effect: string) => (
            <Chip key={effect} theme="solid" onClick={() => {
              setchip(chips.filter((chip) => chip !== effect));
            }}>
              {effect}
            </Chip>
          ))}
          <TextField
            id="chip"
            name="Chip"
            value={newChip}
            onChange={(event) => {
              setNewChip(event.currentTarget.value);
            }}
          />
          <Button themeType="outline" onClick={() => {
            setchip([...chips, newChip]);
            setNewChip('');
          }}>
            Add
          </Button>
        </>
      }
    </>
  );
};

export default ChipField;
