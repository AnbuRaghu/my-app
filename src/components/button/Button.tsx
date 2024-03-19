// Button.tsx
import React from 'react';
import styled from 'styled-components';

// Update the ButtonProps interface to include the new variants
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
 children: React.ReactNode;
 href?: string; // Optional href prop for links
 variant?: 'primary' | 'secondary' | 'success' | 'danger'; // Updated variant prop
}

// Update the styled components to include styles for the new variants
const StyledButton = styled.button<{ variant?: 'primary' | 'secondary' | 'success' | 'danger' }>`
 padding: 10px 20px;
 font-size: 16px;
 border-radius: 4px;
 border: none;
 cursor: pointer;
 transition: background-color 0.3s ease, color 0.3s ease;

 ${props => props.variant === 'primary' && `
   background-color: #007bff;
   color: white;
 `}

 ${props => props.variant === 'secondary' && `
   background-color: #6c757d;
   color: white;
 `}

 ${props => props.variant === 'success' && `
   background-color: #28a745;
   color: white;
 `}

 ${props => props.variant === 'danger' && `
   background-color: #dc3545;
   color: white;
 `}

 &:hover {
    background-color: ${props => {
      switch (props.variant) {
        case 'primary': return '#0056b3';
        case 'secondary': return '#5a6268';
        case 'success': return '#1e7e34';
        case 'danger': return '#c82333';
        default: return 'initial';
      }
    }};
 }

 &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
 }
`;

const StyledLink = styled.a<{ variant?: 'primary' | 'secondary' | 'success' | 'danger' }>`
 padding: 10px 20px;
 font-size: 16px;
 border-radius: 4px;
 border: none;
 cursor: pointer;
 text-decoration: none;
 transition: background-color 0.3s ease, color 0.3s ease;

 ${props => props.variant === 'primary' && `
   background-color: #007bff;
   color: white;
 `}

 ${props => props.variant === 'secondary' && `
   background-color: #6c757d;
   color: white;
 `}

 ${props => props.variant === 'success' && `
   background-color: #28a745;
   color: white;
 `}

 ${props => props.variant === 'danger' && `
   background-color: #dc3545;
   color: white;
 `}

 &:hover {
    background-color: ${props => {
      switch (props.variant) {
        case 'primary': return '#0056b3';
        case 'secondary': return '#5a6268';
        case 'success': return '#1e7e34';
        case 'danger': return '#c82333';
        default: return 'initial';
      }
    }};
 }

 &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
 }
`;

// The Button component remains the same
const Button: React.FC<ButtonProps> = ({ children, href, variant, ...props }) => {
    // Destructure button-specific props
    const { onCopy, ...rest } = props;
   
    if (href) {
       // Filter out properties that are not compatible with an anchor element else we get typescript error
       const anchorProps = Object.fromEntries(
         Object.entries(rest).filter(([key]) => !key.startsWith('on') || key === 'onCopyCapture')
       );
       return (
         <StyledLink href={href} variant={variant} {...anchorProps}>
           {children}
         </StyledLink>
       );
    } else {
       return (
         <StyledButton variant={variant} {...props}>
           {children}
         </StyledButton>
       );
    }
};

export default Button;