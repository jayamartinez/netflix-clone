// import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="container mx-auto text-center">
                <p className="text-sm">
                    Made by {" "}
                    <a 
                        href="https://github.com/jayamartinez" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-400"> 
                        @jayamartinez
                    </a> | 
                     Source code available on{" "}
                    <a 
                        href="https://github.com/jayamartinez/netflix-clone"
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-400"> 
                        GitHub
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;