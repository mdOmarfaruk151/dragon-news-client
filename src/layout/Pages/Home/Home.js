import React from "react";
import { useLoaderData } from "react-router-dom";
import NewsSummaryCard from "../Shared/NewsSummaryCard/NewsSummaryCard";

const Home = () => {
  //! get API data from Routes
  const allNews = useLoaderData();
  return (
    <div>
      <hr />
      <h3 className="text-center">
        Dragon News Home: <span className="text-success">{allNews.length}</span>
      </h3>
      <hr />
      {allNews.map((news) => (
        <NewsSummaryCard key={news._id} news={news}></NewsSummaryCard>
      ))}
    </div>
  );
};

export default Home;
