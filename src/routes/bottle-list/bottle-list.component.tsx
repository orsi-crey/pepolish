import { Table, TableHeader, TableRow, TableCell, TableBody, Button } from 'react-md';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import { BottleListContainer } from './bottle-list.styles';
import { getListQuery } from '../../utils/firestore/firestore.utils';
import { authState, UserContext } from '../../contexts/user.context';
import { getProductBrandAndName, getDisplayName } from '../../utils/helperFunctions';

const BottleList = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(UserContext);

  const bottleList = getListQuery('bottles').data;
  const productList = getListQuery('products').data;
  const userList = getListQuery('users').data;

  const addPolishRows = () => {
    return (
      bottleList && productList && userList &&
      Array.from(bottleList.keys()).map((bottleId: string) => {
        const bottle = bottleList.get(bottleId);
        return (
          <TableRow key={bottleId} onClick={() => navigate(`/bottles/${bottleId}`)}>
            <TableCell>{bottle?.photoUrl && <img src={bottle?.photoUrl} />}</TableCell>
            <TableCell>{getProductBrandAndName(productList, bottle?.productId)}</TableCell>
            <TableCell>{getDisplayName(userList, bottle?.userId)}</TableCell>
            <TableCell>{getDisplayName(userList, bottle?.locationUserId)}</TableCell>
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
              <TableCell>Product</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>Located at</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>{bottleList && addPolishRows()}</TableBody>
        </Table>
      )}
    </BottleListContainer>
  );
};

export default BottleList;
