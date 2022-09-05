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

  const bottleListQuery = getListQuery("bottles");
  const bottleList =  bottleListQuery?.data?.docs;

  const showBottlePage = (id: string) => {
    navigate(`/bottles/${id}`);
  };

  const addPolishRow = (id: string, bottle: DocumentData) => {
    return (
      <TableRow key={id} onClick={() => showBottlePage(id)}>
        <TableCell>{bottle.productId}</TableCell>
        <TableCell>{bottle.userId}</TableCell>
        <TableCell>{bottle.locationUserId}</TableCell>
        <TableCell>{bottle.fullPercentage}</TableCell>
        <TableCell>{bottle.photoUrl}</TableCell>
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
              <TableCell>Effects</TableCell>
              <TableCell>fullPercentage</TableCell>
              <TableCell>photoUrl</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bottleList?.map((bottle) => addPolishRow(bottle.id, bottle.data()))}
          </TableBody>
        </Table>
      )}
    </BottleListContainer>
  );
};

export default BottleList;
