import { useContext } from "react";
import PostsContext from "../../contexts/PostsContext";
import UsersContext from "../../contexts/UsersContext";
import Post from "../UI/Molecules/Post";
import { Link } from "react-router-dom";

const UserPage = () => {

const { posts } = useContext(PostsContext);
const { currentUser } = useContext(UsersContext);

return (
<main>
<div className="pageContainer">

<h1>{currentUser.userName} Posts</h1>
<Link to="/newPost">
    <button>Pridėti naują klausimą</button>
    </Link>
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
</div>
</main>
    );
}

export default UserPage;