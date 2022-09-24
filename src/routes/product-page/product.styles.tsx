import { MediaContainer } from 'react-md';
import styled from 'styled-components';

export const ProductContainer = styled.div`
  width: 60%;
  margin: auto;
  margin-top: 25px;
  border: 2px solid green;
  border-radius: 15px;
  padding: 20px;
  background-color: white;
`;

export const PaddedDiv = styled.div`
    padding: 5px;
`;

export const PaddedMediaContainer = styled(MediaContainer)`
  padding: 15px;
`;
