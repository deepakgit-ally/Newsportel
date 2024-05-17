// ImageGenerator.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ImageGenerator({ news }) {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    // Use Unsplash API to fetch image based on news content
    axios.get('https://api.unsplash.com/photos/random?query=' + news.category + '&client_id=YOUR_UNSPLASH_ACCESS_KEY')
      .then(response => {
        setImageUrl(response.data.urls.regular);
      })
      .catch(error => {
        console.error('Error fetching image:', error);
      });
  }, [news]);

  return (
    <img src={imageUrl} alt="News" />
  );
}

export default ImageGenerator;
