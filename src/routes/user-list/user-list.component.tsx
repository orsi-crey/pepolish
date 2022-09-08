import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from 'react-md';
import { useNavigate } from 'react-router-dom';

import { UserListContainer } from './user-list.styles';
import { getListQuery } from '../../utils/firestore/firestore.utils';
import { DocumentData } from 'firebase/firestore';

const UserList = () => {
  const navigate = useNavigate();

  const userListQuery = getListQuery('users');
  const userList =  userListQuery?.data?.docs;

  const showUserPage = (id: string) => {
    navigate(`/users/${id}`);
  };

  const addUserRow = (id: string, user: DocumentData) => {
    console.log(user)
    return (
      <TableRow key={id} onClick={() => showUserPage(id)}>
        <TableCell>{<img src={user.userdata?.profilePic} />}</TableCell>
        <TableCell>{user.displayName}</TableCell>
        <TableCell>{user.userdata?.city}</TableCell>
      </TableRow>
    );
  };

  return (
    <UserListContainer>
      <div>filter will be here</div>
      {userListQuery.isSuccess && (
        <Table fullWidth>
          <TableHeader>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Name</TableCell>
              <TableCell>City</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userList?.map((user) => addUserRow(user.id, user.data()))}
          </TableBody>
        </Table>
      )}
    </UserListContainer>
  );
};

export default UserList;
