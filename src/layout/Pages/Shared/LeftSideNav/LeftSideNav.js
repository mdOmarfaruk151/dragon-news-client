import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const LeftSideNav = () => {

    //! Data Store
    const [categories, setCategories] = useState([]); 
    //! get API data from dragon-news-server
    useEffect(()=>{
        fetch('http://localhost:5000/news-categories')
        .then((res) => res.json())
        .then((data) => setCategories(data));
    },[])

    return (
        <div>
            <h4>All Category: {categories.length}</h4>
              {/* //! All Category with dynamic id */}
            <div>
                {
                    categories.map
                    (category=> 
                    <p key={category.id} >
                        <Link to={`/category/${category.id}`}>{category.name}</Link>
                    </p>)
                }
            </div>
            
        </div>
    );
};

export default LeftSideNav;