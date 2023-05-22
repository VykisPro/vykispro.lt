import styled from 'styled-components';
import { useContext } from 'react';
import UsersContext from '../../../contexts/UsersContext';

const StyledPostDiv = styled.div`
border:1px solid black;
max-width:80%;
margin:20px auto;
padding:50px;
`;


const Post = ({ data }) => {

const { users } = useContext(UsersContext);
const user = users.find(a => a.id === data.userId);

    return (
        <StyledPostDiv>
            { users ?
             <div>
                <img src={user.avatarURL} alt="Paskyros avataras" />
                <p>{user.userName}</p>
            </div>: <p> Vartotojas kraunamas </p>
            }
            <div>
                <h3>{data.title}</h3>
            </div>
        </StyledPostDiv>
     );
}
 
export default Post;