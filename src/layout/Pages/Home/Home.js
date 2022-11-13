import React from 'react';
import { useLoaderData } from 'react-router-dom';
import NewsSummaryCard from '../Shared/NewsSummaryCard/NewsSummaryCard';

const Home = () => {
    //! get API data from Routes
    const allNews = useLoaderData();
    return (
        <div>
            <h2>Dragon News Home: {allNews.length}</h2>
            {
             allNews.map(news => <NewsSummaryCard
             key={news._id}
             news={news}
             ></NewsSummaryCard>) 
            }
        </div>
    );
};

export default Home;