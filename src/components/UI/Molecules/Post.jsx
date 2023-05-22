import styled from 'styled-components';

const StyledPostDiv = styled.div`
border:1px solid black;
width:10rem;
margin:20px auto;
`;


const Post = ({ data }) => {
    return (
        <StyledPostDiv>
        <div>
            <div>
                vartotojas
            </div>
            <div>
                <h3>{data.title}</h3>
            </div>
        </div>
        </StyledPostDiv>
     );
}
 
export default Post;