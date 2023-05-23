import { useContext } from 'react';
import PostsContext from "../../contexts/PostsContext";
import Post from '../UI/Molecules/Post';
import { Link } from 'react-router-dom';
import UsersContext from '../../contexts/UsersContext';

const AllPosts = () => {
const { posts } = useContext(PostsContext);
const { currentUser } = useContext(UsersContext);

return (
<div className='allPosts'>
    {
        currentUser &&
<Link to="/newPost">
    <button>Pridėti naują klausimą</button>
    </Link>
}
<h1>Visi pasidalinimai</h1>
<div>
{
    posts.map(post =>
    <Post
        key={post.id}
        data={post} 
        />
)
}
</div>
</div>
);
}

export default AllPosts;
