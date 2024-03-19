// SelectBox.tsx
import React from 'react';
import styled from 'styled-components';

// Define the props for the SelectBox component
interface SelectBoxProps {
 options: { value: string; label: string }[];
 onChange: (value: string) => void;
 defaultValue?: string;
}

// Create a styled component for the select box
const StyledSelect = styled.select`
 padding: 10px;
 font-size: 16px;
 border-radius: 4px;
 border: 1px solid #ccc;
`;

// Define the SelectBox component
const SelectBox: React.FC<SelectBoxProps> = ({ options, onChange, defaultValue }) => {
    return (
       <StyledSelect onChange={(e) => onChange(e.target.value)} defaultValue={defaultValue}>
         <option value="" disabled selected>Select an option</option>
         {options.map((option, index) => (
           <option key={index} value={option.value}>
             {option.label}
           </option>
         ))}
       </StyledSelect>
    );
   };

export default SelectBox;