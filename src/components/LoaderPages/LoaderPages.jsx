import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import { loaderStyle } from './LoaderPagesStyle';
import LoaderPage from './LoaderPages.json';

const LoaderPages = () => {
    const animationContainer = useRef(null);

    useEffect(() => {
        const anim = lottie.loadAnimation({
            container: animationContainer.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: LoaderPage,
        });

        return () => anim.destroy();
    }, []);

    return (
        <div style={loaderStyle.container}>
            <div ref={animationContainer} />
        </div>
    );
};

export default LoaderPages;
