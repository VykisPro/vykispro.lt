import styled from 'styled-components';
import { useContext } from 'react';
import UsersContext from '../../../contexts/UsersContext';

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
    with:50px;
    height:50px;
    border-radius:50%;
}`


const Post = ({ data }) => {

const { users } = useContext(UsersContext);
const user = users.find(a => a.id === data.userId);

    return (
        <StyledPostDiv>
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