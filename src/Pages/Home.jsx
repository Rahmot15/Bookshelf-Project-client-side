import React from 'react';
import Banner from '../Components/Banner';
import PopularBooks from '../Components/Main container/PopularBooks';
import FeaturedCategories from '../Components/Main container/FeaturedCategories';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PopularBooks></PopularBooks>
            <FeaturedCategories></FeaturedCategories>
        </div>
    );
};

export default Home;