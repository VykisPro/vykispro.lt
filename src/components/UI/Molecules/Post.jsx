import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import UsersContext from '../../../contexts/UsersContext';
import PostsContext from '../../../contexts/PostsContext';

const StyledPostDiv = styled.div`
  border: 1px solid black;
  max-width: 80%;
  margin: 20px auto;
  padding: 10px;
`;

const StyledUserInfoDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  > img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
`;

const Post = ({ data }) => {
  const { users, currentUser } = useContext(UsersContext);
  const { setPosts, PostsActionTypes } = useContext(PostsContext);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const foundUser = users.find((user) => user.id === data.userId);
    if (foundUser) {
      setUser(foundUser);
      setIsLoadingUser(false);
    }
  }, [users, data.userId]);

  return (
    <StyledPostDiv>
      {currentUser && data.userId === currentUser.id && (
        <button
          onClick={() =>
            setPosts({
              type: PostsActionTypes.delete,
              id: data.id,
            })
          }
        >
          Ištrinti klausimą
        </button>
      )}
      {isLoadingUser ? (
        <p> Vartotojas kraunamas, prieš keliant post perkrauti puslapį ir  prisijungti iš naujo </p>
      ) : user ? (
        <StyledUserInfoDiv>
          <img src={user.avatarURL} alt="Paskyros avataras" />
          <p>{user.userName}</p>
        </StyledUserInfoDiv>
      ) : (
        <p> Vartotojas nerastas </p>
      )}
      <div>
        <h3>{data.title}</h3>
      </div>
    </StyledPostDiv>
  );
};

export default Post;
