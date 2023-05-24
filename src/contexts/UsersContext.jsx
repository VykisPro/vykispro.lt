import React, { createContext, useReducer, useEffect, useState } from "react";

const UsersContext = createContext();
const UsersActionTypes = {
  get: 'get_all_users'
};

const reducer = (state, action) => {
  switch (action.type) {
    case UsersActionTypes.get:
      return action.data;
    default:
      return state;
  }
}

const UsersProvider = ({ children }) => {
  const [users, setUsers] = useReducer(reducer, []);
  const [currentUser, setCurrentUser] = useState(null);
  const [isUsersLoaded, setIsUsersLoaded] = useState(false); 

  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then(res => res.json())
      .then(data => {
        setUsers({
          type: UsersActionTypes.get,
          data: data
        });
        setIsUsersLoaded(true); 
      });
  }, []);

  return (
    <UsersContext.Provider
      value={{
        users,
        setUsers,
        UsersActionTypes,
        currentUser,
        setCurrentUser
      }}
    >
      {isUsersLoaded ? ( 
        children
      ) : (
        <p>Vartotojai kraunami...</p>
      )}
    </UsersContext.Provider>
  );
}

export { UsersProvider };
export default UsersContext;
