import { TextField } from 'react-md';
import styled from 'styled-components';

export const UserProfileContainer = styled.div`
  width: 60%;
  margin: auto;
  margin-top: 25px;
  border: 2px solid green;
  border-radius: 15px;
  padding: 20px;
  background-color: white;

  img {
    padding: 10px;
    width: 150px;
    margin: auto;
  }
`;

export const StyledTextField = styled(TextField)`

`;
