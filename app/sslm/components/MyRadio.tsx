// RadioButton.tsx
import React, { ChangeEvent } from 'react';

interface RadioButtonProps {
    label: string;
    value: string;
    checked: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({ label, value, checked, onChange }) => {
    return (
        <label>
            <input type="radio" value={value} checked={checked} onChange={onChange} />
            {label}
        </label>
    );
};

export default RadioButton;
