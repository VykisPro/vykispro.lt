import React, { useContext } from "react";
import { PostsActionTypes } from "../../contexts/PostsContext";
import PostsContext from "../../contexts/PostsContext";
import UsersContext from "../../contexts/UsersContext";

const NewPost = () => {
  const { dispatch } = useContext(PostsContext);
  const { currentUser } = useContext(UsersContext);

  const formHandler = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const title = formData.get("title");

    dispatch({
      type: PostsActionTypes.add,
      data: {
        id: Date.now().toString(), 
        userId: currentUser.id, 
        title,
      },
    });
    event.target.reset();
  };

  return (
    <div className="pageContainer">
      <h1>Sukurti naują klausimą</h1>
      <form onSubmit={formHandler}>
        <label htmlFor="title">Klausimas:</label>
        <input type="text" name="title" required />
    
        <button type="submit">Pridėti klausimą</button>
      </form>
    </div>
  );
};

export default NewPost;
