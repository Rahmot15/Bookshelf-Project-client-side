import React from 'react';
import Banner from '../Components/Banner';
import PopularBooks from '../Components/Main container/PopularBooks';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PopularBooks></PopularBooks>
        </div>
    );
};

export default Home;