import React from 'react';
import Banner from '../Components/Banner';
import PopularBooks from '../Components/Main container/PopularBooks';
import FeaturedCategories from '../Components/Main container/FeaturedCategories';
import TestimonialSection from '../Components/Main container/TestimonialSection';
import InfoSection from '../Components/Main container/InfoSection';
import BookSigningSection from '../Components/Main container/BookSigningSection';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PopularBooks></PopularBooks>
            <FeaturedCategories></FeaturedCategories>
            <BookSigningSection/>
            <InfoSection></InfoSection>
            <TestimonialSection></TestimonialSection>
        </div>
    );
};

export default Home;
