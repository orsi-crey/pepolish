import { Chip } from 'react-md';

type ChipFieldProps = {
  chips: string[];
  disabled: boolean;
};

const ChipField = ({ chips, disabled }: ChipFieldProps) => {
  return chips && (
    <>
      {disabled
        ? chips.map((effect: string) => (
          <Chip key={effect} theme="outline" noninteractable>
            {effect}
          </Chip>
        ))
        : chips.map((effect: string) => (
          <Chip key={effect} theme="solid" noninteractable>
            {effect}
          </Chip>
        ))}
    </>
  );
};

export default ChipField;
