// Loader.jsx
import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import { loaderStyle, overlayStyle } from './LoaderStyle';
import HeartLoaderData from './HeartLoader.json';

const Loader = () => {
    const animationContainer = useRef(null);

    useEffect(() => {
        const anim = lottie.loadAnimation({
            container: animationContainer.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: HeartLoaderData,
        });

        return () => anim.destroy();
    }, []);

    return (
        <div style={overlayStyle}>
            <div style={loaderStyle.container} ref={animationContainer} />
        </div>
    );
};

export default Loader;