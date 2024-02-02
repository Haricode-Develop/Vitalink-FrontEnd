// Footer.js
import React from 'react';
import {FaTwitter, FaInstagram, FaPinterest, FaFacebookF, FaMailBulk} from 'react-icons/fa';
import { FooterContainer, FooterText, BrandName, SocialMediaIcons, FooterRights } from './FooterStyle';

const Footer = React.forwardRef((props, ref) => {

    return (
        <FooterContainer ref={ref}>
            <SocialMediaIcons>
                <a href="mailto:soporte@vitalink.es" target="_blank" rel="noopener noreferrer"><FaMailBulk /></a>

            </SocialMediaIcons>
            <FooterRights>
                <FooterText>
                    Todos los derechos reservados a
                    <BrandName href="https://haricode.com" target="_blank" rel="noopener noreferrer">
                        Haricode
                    </BrandName>
                </FooterText>
            </FooterRights>
        </FooterContainer>
    );
});

export default Footer;
