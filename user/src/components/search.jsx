import React, { useState } from "react";
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import "../assets/css/login.css";


export const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
      };
    
      const handleSearch = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/search?productName=${searchTerm}`);
          console.log(searchResults);
          setSearchResults(response.data);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      };
    


      return (
        <div className="search-page">
          <div className="left-content">
            <div className="search-bar">
              <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search for products..." />
              <button onClick={handleSearch}>Search</button>
            </div>
            <div className="body">
            <div className="search-results">
            {searchResults.length > 0 ? (
                        searchResults.map(item => (
                            <div key={item._id} className="search-item">
                                <div className="item-details">
                                    <h3>{item.productName}</h3>
                                    <p>Price: ${item.price}</p>
                                    <p>Quantity: {item.quantity}</p>
                                    <p>Brand: {item.brandName}</p>
                                    <p>Type: {item.productType}</p>
                                </div>
                                <div className="item-image">
                    <img src={`http://localhost:3001/${item.productImage}`} 
                    alt={item.productName} style={{ maxWidth: '250px', height: 'auto' }}
                        />
                        <br/>
                       <button onClick={() => navigate('/orders')}>Go to Orders Page</button>
                  </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-results">
                            No items found. Please try a different search term.
                        </div>
                    )}
            </div>
          </div>
          <div className="right-image">
            <img className="right-image" alt="Right image" src="https://c.animaapp.com/XCVI8hC1/img/right-image.png" />
            {/* <img className="re-up-logo" alt="Re up logo" src="https://c.animaapp.com/XCVI8hC1/img/re-up--logo-@2x.png" /> */}
          </div>
        </div>
        </div>
      );
    };
    
    export default Search;