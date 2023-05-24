import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import UsersContext from "../../../contexts/UsersContext";
import PostsContext, { PostsActionTypes } from "../../../contexts/PostsContext";

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

const EditedIndicator = styled.span`
  color: red;
  font-weight: bold;
`;

const Post = ({ data }) => {
  const { users, currentUser, isLoading } = useContext(UsersContext);
  const { setPosts } = useContext(PostsContext);
  const user = users.find((user) => user.id === data.userId);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(data.title);

  useEffect(() => {
    setEditedTitle(data.title);
  }, [data.title]);

  const handleEdit = () => {
    if (isEditing) {
      const editedPost = {
        ...data,
        title: editedTitle,
        edited: true,
        timestamp: new Date().toLocaleString(),
      };
      setPosts({
        type: PostsActionTypes.edit,
        data: editedPost,
      });
    }
    setIsEditing(!isEditing);
  };

  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value);
  };

  const isCurrentUserPostOwner = currentUser && data.userId === currentUser.id;

  if (isLoading || !user) {
    return <p>Loading user...</p>;
  }

  return (
    <StyledPostDiv>
      {isCurrentUserPostOwner && (
        <>
          <button onClick={handleEdit}>{isEditing ? "Save" : "Edit"}</button>
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
        </>
      )}
      <StyledUserInfoDiv>
        <img src={user.avatarURL} alt="Paskyros avataras" />
        <p>{user.userName}</p>
      </StyledUserInfoDiv>
      <div>
        {isEditing ? (
          <input
            type="text"
            name="title"
            value={editedTitle}
            onChange={handleTitleChange}
          />
        ) : (
          <h3>
            {isCurrentUserPostOwner && data.edited && (
              <EditedIndicator> </EditedIndicator>
            )}
            {data.title}
          </h3>
        )}
        {isCurrentUserPostOwner && data.edited && (
          <p>Koreguota: {data.editedTimestamp}</p>
        )}
      </div>
    </StyledPostDiv>
  );
};

export default Post;
