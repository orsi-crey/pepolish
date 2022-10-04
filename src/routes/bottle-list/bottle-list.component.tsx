import { Table, TableHeader, TableRow, TableCell, TableBody, Button } from 'react-md';
import { useNavigate } from 'react-router-dom';

import { BottleListContainer } from './bottle-list.styles';
import { getListQuery } from '../../utils/firestore/firestore.utils';
import { DocumentData } from 'firebase/firestore';

const BottleList = () => {
  const navigate = useNavigate();

  const bottleList = getListQuery('bottles').data;
  const productList = getListQuery('products').data;
  const userList = getListQuery('users').data;

  const showBottlePage = (id: string) => {
    navigate(`/bottles/${id}`);
  };

  const getName = (productId: string) => {
    if (productList && productList[productId]) {
      return `${productList[productId].brand} - ${productList[productId].name}`;
    }
    return '';
  };

  const getUser = (userId: string) => {
    if (userList && userList[userId]) {
      return userList[userId].displayName;
    }
    return '';
  };

  const addPolishRows = () => {
    return (
      bottleList &&
      Object.getOwnPropertyNames(bottleList).map((bottleId: string) => {
        const bottle = bottleList[bottleId];
        return (
          <TableRow key={bottleId} onClick={() => showBottlePage(bottleId)}>
            <TableCell>{bottle.photoUrl && <img src={bottle.photoUrl} />}</TableCell>
            <TableCell>{getName(bottle.productId)}</TableCell>
            <TableCell>{getUser(bottle.userId)}</TableCell>
            <TableCell>{getUser(bottle.locationUserId)}</TableCell>
            <TableCell>{bottle.fullPercentage} %</TableCell>
          </TableRow>
        );
      })
    );
  };

  return (
    <BottleListContainer>
      <div>filter will be here</div>
      <Button themeType="contained" onClick={() => navigate('/bottles/new')}>
        Add bottle to the list
      </Button>
      {bottleList && (
        <Table fullWidth>
          <TableHeader>
            <TableRow>
              <TableCell style={{ width: '50px' }} />
              <TableCell>productId</TableCell>
              <TableCell>userId</TableCell>
              <TableCell>locationUserId</TableCell>
              <TableCell>fullPercentage</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>{bottleList && addPolishRows()}</TableBody>
        </Table>
      )}
    </BottleListContainer>
  );
};

export default BottleList;
