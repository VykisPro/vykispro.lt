import { createContext, useReducer, useEffect } from "react";


const PostsContext = createContext();
const PostsActionTypes = {
  get: "get_all_posts",
  add: "add_new_post",
  edit: "edit_post",
  delete: "remove_specific_post",
};

const reducer = (state, action) => {
  switch (action.type) {
    case PostsActionTypes.get:
      return action.data;
    case PostsActionTypes.add:
      fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(action.data),
      });
      return [...state, action.data];
    case PostsActionTypes.edit:
      const editedPostIndex = state.findIndex((post) => post.id === action.data.id);
      if (editedPostIndex !== -1) {
        const editedPost = {
          ...state[editedPostIndex],
          title: action.data.title,
          edited: true,
          timestamp: new Date().toISOString(),
        };
        fetch(`http://localhost:3000/posts/${action.data.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedPost),
        })
          .then((res) => res.json())
          .then((updatedPost) => {
            const updatedState = [...state];
            updatedState[editedPostIndex] = updatedPost;
            return updatedState;
          });
      }
      return state;
    case PostsActionTypes.delete:
      fetch(`http://localhost:3000/posts/${action.id}`, {
        method: "DELETE",
      });
      return state.filter((el) => el.id !== action.id);
    default:
      return state;
  }
};

const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useReducer(reducer, []);

  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then((res) => res.json())
      .then((data) =>
        setPosts({
          type: PostsActionTypes.get,
          data: data,
        })
      );
  }, []);

  return (
    <PostsContext.Provider
      value={{
        posts,
        setPosts,
        PostsActionTypes,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export { PostsProvider };
export default PostsContext;
