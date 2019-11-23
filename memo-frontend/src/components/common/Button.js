import React from 'react';
import styled, {css} from 'styled-components';
import palette from '../../lib/styles/palette';

const StyledButton = styled.button`
  border: none;
  border_radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;
  margin-top:1rem;
  background: ${palette.gray[8]};
  &:hover {
    background: ${palette.gray[6]};
  }
  ${props =>
    props.fullWidth && 
    css`
      padding-top :0.75rem;
      padding-bottom : 0.75rem; 
      width: 100%; 
      font-size: 1.125rem;
    `
  }
  
  ${props =>
    props.cyan && 
    css`
    background: ${palette.cyan[5]}; 
    &:hover{
      background:${palette.cyan[4]};
    } 
    `}
`;
const Button = props => <StyledButton {...props} />;
export default Button;
