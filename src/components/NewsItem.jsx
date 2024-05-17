import React, { useState, useEffect } from 'react';

function NewsList() {
    const [news, setNews] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/newsblog');
            const data = await response.json();
            setNews(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
      <div className="container">
        <h1 className="display-4 text-center">News Blog</h1>
        <ul className="list-group">
            {news.map((item, index) => (
                <li className="list-group-item" key={index}>
                    <h2 className="mb-3 text-dark-emphasis">{item.title}</h2>
                    <p className="lead fs-4">{item.shortDescription}</p>
                    <p className='fw-bold'>{item.longDescription}</p>
                    <p className="badge bg-primary">{item.category}</p>
                    {/* Display the image if imageUrl is present */}
                    {item.imageUrl && <img src={item.imageUrl} alt={item.title} style={{ maxWidth: '100%', height: 'auto' }} />}
                    <p>Post by {item.Name}</p>
                </li>
            ))}
        </ul>
    </div>
    );
}

export default NewsList;