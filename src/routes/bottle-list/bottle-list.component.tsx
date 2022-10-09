import { Table, TableHeader, TableRow, TableCell, TableBody, Button } from 'react-md';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import { BottleListContainer } from './bottle-list.styles';
import { getListQuery } from '../../utils/firestore/firestore.utils';
import { authState, UserContext } from '../../contexts/user.context';

const BottleList = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(UserContext);

  const bottleList = getListQuery('bottles').data;
  const productList = getListQuery('products').data;
  const userList = getListQuery('users').data;

  // ezek nem annyira kellenek ha csak ilyen kis dolgot csinál
  const showBottlePage = (id: string) => {
    navigate(`/bottles/${id}`);
  };

  const getName = (productId: string) => {
    if (productList) {
      return `${productList?.get(productId)?.brand} - ${productList?.get(productId)?.name}`;
    }
    return '';
  };

  // userid alapján usernév: más fv-be
  // fvben react queryzni?
  const getUser = (userId: string) => {
    if (userList && userList.get(userId)) {
      return userList?.get(userId)?.displayName;
    }
    return '';
  };

  const addPolishRows = () => {
    return (
      bottleList &&
      Array.from(bottleList.keys()).map((bottleId: string) => {
        const bottle = bottleList.get(bottleId);
        return (
          <TableRow key={bottleId} onClick={() => navigate(`/bottles/${bottleId}`)}>
            <TableCell>{bottle?.photoUrl && <img src={bottle?.photoUrl} />}</TableCell>
            <TableCell>{getName(bottle?.productId)}</TableCell>
            <TableCell>{getUser(bottle?.userId)}</TableCell>
            <TableCell>{getUser(bottle?.locationUserId)}</TableCell>
            <TableCell>{bottle?.fullPercentage} %</TableCell>
          </TableRow>
        );
      })
    );
  };

  return (
    <BottleListContainer>
      {/* <div>filter will be here</div> */}
      {isLoggedIn === authState.SignedIn && (
        <Button themeType="contained" onClick={() => navigate('/bottles/new')}>
          Add bottle to the list
        </Button>
      )}
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
