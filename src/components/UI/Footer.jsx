import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import styled from 'styled-components';

const StyledFooter = styled.footer`
background-color: #f8f8f8;
padding: 20px;
text-align: center;
position: fixed;
left: 0;
bottom: 0;
width: 100%;
display:flex;
justify-content:space-evenly;
`;

const SocialIcons = styled.div`
margin-top: 10px;

> a {
margin-right: 10px;
color: #333;
font-size: 20px;
transition: color 0.3s ease;

&:hover {
color: #888;
}
}
`;

const Footer = () => {
const funnyUrls = [
'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 
'https://www.youtube.com/watch?v=9bZkp7q19f0', 
'https://www.youtube.com/watch?v=ZZ5LpwO-An4', 
'https://www.youtube.com/watch?v=_ovdm2yX4MA', 
'https://www.youtube.com/watch?v=9bZkp7q19f0', 
'https://www.youtube.com/watch?v=oavMtUWDBTM',
'https://www.youtube.com/watch?v=O4bqSlM3j5A', 
'https://www.youtube.com/watch?v=3GRSbr0EYYU', 
];

const [randomUrl, setRandomUrl] = useState('');

const handleIconClick = () => {
const randomIndex = Math.floor(Math.random() * funnyUrls.length);
const selectedUrl = funnyUrls[randomIndex];
setRandomUrl(selectedUrl);

// Open the URL in a new tab
window.open(selectedUrl, '_blank');
};

return (
<StyledFooter>
<p>&copy; {new Date().getFullYear()} Apeland. All rights reserved.</p>
<SocialIcons>
<a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
<FontAwesomeIcon icon={faFacebook} onClick={handleIconClick} />
</a>
<a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
<FontAwesomeIcon icon={faTwitter} onClick={handleIconClick} />
</a>
<a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
<FontAwesomeIcon icon={faInstagram} onClick={handleIconClick} />
</a>
</SocialIcons>
</StyledFooter>
);
};

export default Footer;
