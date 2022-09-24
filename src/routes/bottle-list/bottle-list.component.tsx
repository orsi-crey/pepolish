import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from 'react-md';
import { useNavigate } from 'react-router-dom';

import { BottleListContainer } from './bottle-list.styles';
import { getListQuery } from '../../utils/firestore/firestore.utils';
import { DocumentData } from 'firebase/firestore';

const BottleList = () => {
  const navigate = useNavigate();

  const bottleListQuery = getListQuery('bottles');
  const bottleList = bottleListQuery?.data?.docs;
  type indexableData = {
    [key: string]: DocumentData;
  };

  const productListQuery = getListQuery('products');
 
  const productList: indexableData = {};
  productListQuery?.data?.docs.forEach((doc) => {
    Object.defineProperty(productList, doc.id, { value: doc.data() });
  });

  const userListQuery = getListQuery('users');
  const userList: indexableData = {};
  userListQuery?.data?.docs.forEach((doc) => {
    Object.defineProperty(userList, doc.id, { value: doc.data() });
  });

  const showBottlePage = (id: string) => {
    navigate(`/bottles/${id}`);
  };

  const getName = (productId: string) => {
    if (productId && productList[productId]) {
      return `${productList[productId].brand} - ${productList[productId].name}`;
    }
    return '';
  };

  const getUser = (userId: string) => {
    if (userId && userList[userId]) {
      return userList[userId].displayName;
    }
    return '';
  };

  const addPolishRow = (id: string, bottle: DocumentData) => {
    return (
      <TableRow key={id} onClick={() => showBottlePage(id)}>
        <TableCell>{getName(bottle.productId)}</TableCell>
        <TableCell>{getUser(bottle.userId)}</TableCell>
        <TableCell>{getUser(bottle.locationUserId)}</TableCell>
        <TableCell>{bottle.fullPercentage} %</TableCell>
        <TableCell>{<img src={bottle.photoUrl} />}</TableCell>
      </TableRow>
    );
  };

  return (
    <BottleListContainer>
      <div>filter will be here</div>
      <Button themeType="contained" onClick={() => navigate('/bottles/new')}>
        Add bottle to the list
      </Button>
      {bottleListQuery.isSuccess && (
        <Table fullWidth>
          <TableHeader>
            <TableRow>
              <TableCell>productId</TableCell>
              <TableCell>userId</TableCell>
              <TableCell>locationUserId</TableCell>
              <TableCell>fullPercentage</TableCell>
              <TableCell>photoUrl</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bottleList?.map((bottle) =>
              addPolishRow(bottle.id, bottle.data())
            )}
          </TableBody>
        </Table>
      )}
    </BottleListContainer>
  );
};

export default BottleList;
