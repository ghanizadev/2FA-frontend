
import styled from "styled-components";

const Button = styled.button`
  background-color: rgba(152,12,156,1);
  padding: 8px;
  border-radius: 5px;
  border: none;
  height: 40px;
  width: 100%;

  color: #fff;
  font-size: 12pt;
  margin: 8px;

  transition: all 250ms ease-in-out;

  &:hover {
    filter: brightness(1.1);
    transform: scale(1.01);
  }
`;

export default Button