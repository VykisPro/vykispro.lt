import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PostsContext, { PostsActionTypes } from "../../contexts/PostsContext";
import Post from '../UI/Molecules/Post';
import UsersContext from '../../contexts/UsersContext';
import { PostsProvider } from "../../contexts/PostsContext";

const AllPosts = () => {
  const { posts } = useContext(PostsContext);
  const { currentUser } = useContext(UsersContext);

  return (
    <div className='allPosts'>
      {currentUser && (
        <Link to="/newPost">
          <button>Pridėti naują klausimą</button>
        </Link>
      )}
      <h1>Visi pasidalinimai</h1>
      <div>
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map(post => (
            <Post key={post.id} data={post} />
          ))
        ) : (
          <p>Klausimai negalimi</p>
        )}
      </div>
    </div>
  );
}

export default () => (
  <PostsProvider>
    <AllPosts />
  </PostsProvider>
);
