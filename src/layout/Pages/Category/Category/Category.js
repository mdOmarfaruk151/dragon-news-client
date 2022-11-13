import React from "react";
import { useLoaderData } from "react-router-dom";
import NewsSummaryCard from "../../Shared/NewsSummaryCard/NewsSummaryCard";

const Category = () => {
    //! get data from category Routes
  const categoryNews = useLoaderData();

  return (
    <div>
      <hr className="mt-0"/>
      <h3 className='text-center'>This Category Has <span className="text-success">{categoryNews.length}</span> News. </h3>
      <hr />
      {
        categoryNews.map(news => <NewsSummaryCard
            key={news._id}
            news={news}
        ></NewsSummaryCard>)
      }
    </div>
  );
};

export default Category;
