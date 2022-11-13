import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LeftSideNav = () => {
  //! Data Store
  const [categories, setCategories] = useState([]);
  //! get API data from dragon-news-server
  useEffect(() => {
    fetch("http://localhost:5000/news-categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  return (
    <div>
      <hr className="mt-0"/>
      <h4>All Category: {categories.length}</h4>
      <hr />
      {/* //! All Category with dynamic id */}
      <div>
        {categories.map((category) => (
          <p key={category.id}>
            <Link
              className="text-decoration-none btn btn-outline-primary"
              to={`/category/${category.id}`}
            >
              {category.name}
            </Link>
          </p>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default LeftSideNav;
