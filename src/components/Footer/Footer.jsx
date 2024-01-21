// Footer.js
import React from 'react';
import { FaTwitter, FaInstagram, FaPinterest, FaFacebookF } from 'react-icons/fa';
import { FooterContainer, FooterText, BrandName, SocialMediaIcons, FooterRights } from './FooterStyle';

const Footer = React.forwardRef((props, ref) => {

    return (
        <FooterContainer ref={ref}>
            <SocialMediaIcons>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer"><FaPinterest /></a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            </SocialMediaIcons>
            <FooterRights>
                <FooterText>
                    Todos los derechos reservados a
                    <BrandName href="https://www.haricode.com" target="_blank" rel="noopener noreferrer">
                        Haricode
                    </BrandName>
                </FooterText>
            </FooterRights>
        </FooterContainer>
    );
});

export default Footer;
