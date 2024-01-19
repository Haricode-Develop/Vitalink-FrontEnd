// Loader.jsx
import React from 'react';
import { loaderStyle } from './LoaderStyle';

const Loader = () => {
    return (
        <div style={loaderStyle.container}>
            <div style={loaderStyle.loader}></div>
            <style>
                {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
            </style>
        </div>
    );
};

export default Loader;
