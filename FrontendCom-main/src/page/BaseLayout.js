import React from 'react';

function BaseLayout({ children }) {
    return (
        <div
            style={{
                height: '100vh',
                backgroundImage: 'url(/flowerbackground.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
            }}
        >
            {children}
        </div>
    );
}

export default BaseLayout;