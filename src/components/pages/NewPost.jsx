import { useState, useContext } from "react";
import UsersContext from "../../contexts/UsersContext";
import PostsContext from "../../contexts/PostsContext";
import { useNavigate } from "react-router-dom";
import { v4 as generateId } from "uuid";

const NewPost = () => {

    const navigate = useNavigate();
    const { currentUser } = useContext(UsersContext);
    const { setPosts, PostsActionTypes } = useContext(PostsContext);
    const [formInputs, setFormInputs] = useState({
        title:''
    });

    const inputHandler = e => {
        setFormInputs({
            ...formInputs,
        [e.target.name]:e.target.value
        });
    }

    const formHandler = e => {
        e.preventDefault();
        const newPost = {
            id: generateId(),
            userId: currentUser.id, 
            title: formInputs.title
        }
        setPosts({
            type: PostsActionTypes.add,
            data: newPost
        });
        navigate(-1);
    }

    return (
<div class="pageContainer">
    <h1>Sukurti naują klausimą</h1>
    <form onSubmit={(e) => {formHandler(e)}}>
        <div> 
            <label htmlFor="title">Pavadinimas:</label>
            <input type="text"
            name="title" id="title"
            value={formInputs.title}
            onChange={(e) => {inputHandler(e)}}
            />
        </div>
        <input type="submit" value="Sukurti klausimą" />
    </form>
</div>
      );
}
 
export default NewPost;