import React, { createContext, useEffect, useReducer } from "react";

export const PostsActionTypes = {
  get: "get_all_posts",
  add: "add_new_post",
  edit: "edit_post",
  delete: "remove_specific_post",
};

const PostsContext = createContext({
  posts: [],
  isLoading: true,
  dispatch: () => {},
  setPosts: () => {},
});

const PostsProvider = ({ children }) => {
  const initialState = {
    posts: [],
    isLoading: true,
  };

  const setPosts = (action) => {
    dispatch(action);
  };

  const fetchData = async (dispatch) => {
    try {
      dispatch({ type: "FETCH_START" });

      const response = await fetch("http://localhost:3000/posts");
      const data = await response.json();

      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (error) {
      console.error("Error fetching data:", error);
      dispatch({ type: "FETCH_ERROR" });
    }
  };

  const reducer = (currentState, action) => {
    switch (action.type) {
      case "FETCH_START":
        return { ...currentState, isLoading: true };
      case "FETCH_SUCCESS":
        return { ...currentState, isLoading: false, posts: action.payload };
      case "FETCH_ERROR":
        return { ...currentState, isLoading: false };
      case PostsActionTypes.get:
        return { ...currentState, posts: action.data };
      case PostsActionTypes.add:
        const newPost = {
          id: action.data.id,
          userId: action.data.userId,
          title: action.data.title,
          avatarURL: action.data.avatarURL
        };

        fetch("http://localhost:3000/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPost),
        })
          .then((response) => response.json())
          .then((responseData) => {
            const updatedPosts = [...currentState.posts, responseData];
            dispatch({ type: PostsActionTypes.get, data: updatedPosts });
          })
          .catch((error) => {
            console.error("Nepavyko pridėti klausimo:", error);
          });
        return currentState;

      case PostsActionTypes.edit:
        const editedPostIndex = currentState.posts.findIndex(
          (post) => post.id === action.data.id
        );

        if (editedPostIndex !== -1) {
          const editedPost = {
            ...currentState.posts[editedPostIndex],
            title: action.data.title,
            edited: true,
            editedTimestamp: new Date().toISOString(),
          };

          fetch(`http://localhost:3000/posts/${action.data.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(editedPost),
          })
            .then((response) => response.json())
            .then((responseData) => {
              const updatedPosts = currentState.posts.map((post) =>
                post.id === action.data.id ? responseData : post
              );
              dispatch({ type: PostsActionTypes.get, data: updatedPosts });
            })
            .catch((error) => {
              console.error("Nepavyko redaguoti klausimo:", error);
            });
        }
        return currentState;

      case PostsActionTypes.delete:
        fetch(`http://localhost:3000/posts/${action.id}`, {
          method: "DELETE",
        })
          .then(() => {
            const updatedPosts = currentState.posts.filter(
              (post) => post.id !== action.id
            );
            dispatch({ type: PostsActionTypes.get, data: updatedPosts });
          })
          .catch((error) => {
            console.error("Nepavyko istrinti klausimo:", error);
          });

        return currentState;

      default:
        return currentState;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchData(dispatch);
  }, []);

  if (state.isLoading) {
    return <div>Loading posts...</div>;
  }

  return (
    <PostsContext.Provider value={{ ...state, dispatch, setPosts }}>
      {children}
    </PostsContext.Provider>
  );
};

export { PostsProvider };
export default PostsContext;
