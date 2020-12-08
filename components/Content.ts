import styled from "styled-components";

const Content = styled.div`
  background-color: #fff;
  padding: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;

  & section {
    margin: 8px;
  }

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

export default Content