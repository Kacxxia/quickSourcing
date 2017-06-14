import React from 'react';

const Footer = () => {
    const footerStyle = {
        width: `100%`,
        heigt: `4rem`
    }
    return (
        <foot className="page-footer" style={footerStyle}>
            <div className="footer-copyright" >
                <div className="container">
                © 2017 Copyright 
                <a className="grey-text text-lighten-4 right" href="#!">More Links</a>
                </div>
            </div>
        </foot>
    );
};

export default Footer;