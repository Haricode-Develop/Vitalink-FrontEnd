import React from 'react';
import { List, ListItem, ListInfo, SelectButton } from './UserListStyle';

const UserList = ({ users, onSelectUser }) => {
    return (
        <List>
            {users.map((user) => (
                <ListItem key={user.ID_USUARIO}>
                    <ListInfo>{user.NOMBRE} {user.APELLIDO} - {user.EMAIL}</ListInfo>
                    <SelectButton onClick={() => onSelectUser(user.ID_USUARIO)}>Seleccionar</SelectButton>
                </ListItem>
            ))}
        </List>
    );
};

export default UserList;
