import { useContext } from 'react';
import PostsContext from "../../contexts/PostsContext";
import Post from '../UI/Molecules/Post';

const AllPosts = () => {
const { posts } = useContext(PostsContext);

return (
<div className='allPosts'>
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
