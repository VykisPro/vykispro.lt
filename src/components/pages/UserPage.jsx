import { useContext } from "react";
import PostsContext from "../../contexts/PostsContext";
import UsersContext from "../../contexts/UsersContext";
import Post from "../UI/Molecules/Post";

const UserPage = () => {

const { posts } = useContext(PostsContext);
const { currentUser } = useContext(UsersContext);

return (
<main>
<h1>{currentUser.userName} Posts</h1>
<h1>{currentUser.userName} Posts</h1>
<h1>{currentUser.userName} Posts</h1>
<h1>{currentUser.userName} Posts</h1>
<div>
    {
        posts.map(post => 
            post.userId === currentUser.id &&
                <Post 
                    key={post.id}
                    data={post}
                />
        )
    }
</div>
</main>
    );
}

export default UserPage;