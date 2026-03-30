import React from 'react';

const Greeting = ({ name, roll }) => {
    return (
        <div style={{
            background: 'linear-gradient(135deg, #667eea 20%, #9939b9 80%)',
            padding: '20px',
            borderRadius: '8px',
            color: 'white',
            margin: '10px',
        }}>
            <h2>Hello, {name}</h2>
            <p>{roll}</p>
        </div>
    );
};

export default Greeting;