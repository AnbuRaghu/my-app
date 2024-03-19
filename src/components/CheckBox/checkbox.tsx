import React, { useState } from 'react';
import styled from 'styled-components';

interface CheckboxProps {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const CheckboxContainer = styled.label`
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
`;

const CheckboxInput = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
`;

const Checkmark = styled.span<{ checked: boolean }>`
  position: relative;
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid ${props => (props.checked ? '#007bff' : '#aaa')};
  border-radius: 4px;
  background-color: ${props => (props.checked ? '#007bff' : 'transparent')};

  &::after {
    content: '';
    position: absolute;
    display: ${props => (props.checked ? 'block' : 'none')};
    left: 6px;
    top: 2px;
    width: 4px;
    height: 8px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;

const CheckboxLabel = styled.span`
  margin-left: 30px;
`;

const Checkbox: React.FC<CheckboxProps> = ({ label, checked: checkedProp, onChange }) => {
  const [checked, setChecked] = useState(checkedProp || false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setChecked(isChecked);
    if (onChange) {
      onChange(isChecked);
    }
  };

  return (
    <CheckboxContainer>
      <CheckboxInput type="checkbox" checked={checked} onChange={handleChange} />
      <Checkmark checked={checked} />
      {label && <CheckboxLabel>{label}</CheckboxLabel>}
    </CheckboxContainer>
  );
};

export default Checkbox;
