import { Table, TableHeader, TableRow, TableCell, TableBody } from 'react-md';
import { useNavigate } from 'react-router-dom';

import { UserListContainer } from './user-list.styles';
import { getListQuery } from '../../utils/firestore/firestore.utils';

const UserList = () => {
  const navigate = useNavigate();

  const userList = getListQuery('users').data;

  const showUserPage = (id: string) => {
    navigate(`/users/${id}`);
  };

  const addUserRows = () => {
    return (
      userList &&
      Object.getOwnPropertyNames(userList).map((userId: string) => (
        <TableRow key={userId} onClick={() => showUserPage(userId)}>
          <TableCell>{<img src={userList[userId].userdata?.profilePic} />}</TableCell>
          <TableCell>{userList[userId].displayName}</TableCell>
          <TableCell>{userList[userId].userdata?.city}</TableCell>
        </TableRow>
      ))
    );
  };

  return (
    <UserListContainer>
      {/* <div>filter will be here</div> */}
      {userList && (
        <Table fullWidth>
          <TableHeader>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Name</TableCell>
              <TableCell>City</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>{addUserRows()}</TableBody>
        </Table>
      )}
    </UserListContainer>
  );
};

export default UserList;
