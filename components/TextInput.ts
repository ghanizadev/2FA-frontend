import styled from "styled-components";

const TextInput = styled.input`
  background-color: whitesmoke;
  padding: 2px;
  border: none;
  border-radius: 3px;
  height: 30px;
  width: 100%;

  font-size: 12pt;
  text-align: center;
  margin: 3px 0;

  transition: all 250ms ease-in-out;

  &:hover {
    transform: scale(1.01);
  }
`;

export default TextInput