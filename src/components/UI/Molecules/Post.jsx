import styled from 'styled-components';
import { useContext } from 'react';
import UsersContext from '../../../contexts/UsersContext';
import PostsContext from '../../../contexts/PostsContext';

const StyledPostDiv = styled.div`
border:1px solid black;
max-width:80%;
margin:20px auto;
padding:10px;
`;
const StyledUserInfoDiv = styled.div`
display:flex;
align-items:center;
gap:20px;
>img{
    width:50px;
    height:50px;
    border-radius:50%;
}`

const Post = ({ data }) => {

const { users, currentUser } = useContext(UsersContext);
const { setPosts, PostsActionTypes } = useContext(PostsContext);
const user = users.find(a => a.id === data.userId);

    return (
        <StyledPostDiv>
            {
              currentUser && data.userId === currentUser.id &&
                <button onClick={ () => setPosts({
                    type: PostsActionTypes.delete,
                    id: data.id 
                }) }
                >Ištrinti klausimą</button>
            }
            { users.length ?
             <StyledUserInfoDiv>
                <img src={user.avatarURL} alt="Paskyros avataras" />
                <p>{user.userName}</p>
                </StyledUserInfoDiv>: <p> Vartotojas kraunamas </p>
            }
            <div>
                <h3>{data.title}</h3>
            </div>
        </StyledPostDiv>
     );
}
 
export default Post;