import React from 'react';
import './footer.css';

const Footer = () => (
    <div className="footer">
        &copy; Company {new Date().getFullYear()}
    </div>
);

export default Footer;