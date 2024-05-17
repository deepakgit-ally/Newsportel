// import React, { useState } from 'react';
// import Navbar from './Navbar';
// import axios from 'axios';

// function NewsForm() {
//   const [formData, setFormData] = useState({
//     title: '',
//     shortDescription: '',
//     category: '',
//     longDescription: '',
//     imageUrl:''
//   });
//   const [successMessage, setSuccessMessage] = useState('');
//   const [generatedImage, setGeneratedImage] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };
// // Assuming your backend expects an 'imageUrl' field for the image URL.
// // Update the handleSubmit function to include the imageUrl in the formData before posting.

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//           console.error('Token not found in localStorage');
//           return;
//       }

//       // Generate the image URL first
//       const imageUrl = await generateImage(formData.longDescription);
//       if (!imageUrl) {
//           console.error('Failed to generate image');
//           return; // Exit if image generation fails
//       }

//       // Include the generated image URL in the formData
//       const dataWithImage = { ...formData, imageUrl };

//       const response = await axios.post('http://localhost:5000/api/newsblog', dataWithImage, {
//           headers: {
//               Authorization: `Bearer ${token}`
//           }
//       });

//       if (response.status === 200) {
//           setSuccessMessage('News added successfully!');
//           setFormData({
//               title: '',
//               shortDescription: '',
//               category: '',
//               longDescription: '',
//               imageUrl:''
//           });
//           setGeneratedImage(imageUrl); // Optionally display the generated image
//       }
//   } catch (error) {
//       console.error('Error adding news:', error);
//     }
// };
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //         // Retrieve the token from localStorage
// //         const token = localStorage.getItem('token');

// //         // Check if token exists
// //         if (!token) {
// //             // Handle case where token is not found
// //             console.error('Token not found in localStorage');
// //             return;
// //         }

// //         // Make the API call with the token included in the headers
// //         const response = await axios.post('http://localhost:5000/api/newsblog', formData, {
// //             headers: {
// //                 Authorization: `Bearer ${token}` // Include token in the Authorization header
// //             }
// //         });

// //         // Check if the response is successful
// //         if (response.status === 200) {
// //             // Update state to show success message and reset form data
// //             setSuccessMessage('News added successfully!');
// //             setFormData({
// //                 title: '',
// //                 shortDescription: '',
// //                 category: '',
// //                 longDescription: ''
// //             });

// //             // Call the AI image generation API
// //             const imageUrl = await generateImage(formData.title, formData.longDescription);
// //             setGeneratedImage(imageUrl);
// //         }
// //     } catch (error) {
// //         console.error('Error adding news:', error);
// //     }
// // };


// // const generateImage = async (description) => {
// //   try {
// //       const response = await axios.post('https://api.deepai.org/api/text2img', {
// //           text: description,
// //       },
      
// //       {
// //           headers: {
// //               'Api-Key': 'YOUR_DEEP_AI_API_KEY' // Replace 'YOUR_DEEP_AI_API_KEY' with your actual DeepAI API key
// //           }
          
// //         }
       
// //       });

// // Function to call the DeepAI Text-to-Image API
// const generateImage = async (description) => {
//   try {
//     let data = JSON.stringify({
//       "providers": "replicate",
//       "text": description,
//       "resolution": "1024x1024",
//       "num_images": 1
//     });
    
//     let config = {
//       method: 'post',
//       maxBodyLength: Infinity,
//       url: 'https://api.edenai.run/v2/image/generation',
//       headers: { 
//         'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZmU5OTAxYzYtNzRkZi00MWUwLThhYjUtMGQ2MDZmYWExODQ3IiwidHlwZSI6ImFwaV90b2tlbiJ9.STdIPOd9y4XZh55znv56CV48yLuW8g_ADZgRyUTn5Kk', 
//         'content-type': 'application/json'
//       },
//       data : data
//     };
    
//     // Use axios.post instead of axios.request
//     const response = await axios.post(config.url, data, { headers: config.headers });
    
//     console.log(JSON.stringify(response.data));
//     return response.data.replicate.items[0].image_resource_url;
//   } catch (error) {
//     console.error('Error generating image:', error);
//     return ''; // Return empty string in case of error
//   }
// };

// // Function to call the AI image generation API
// // const generateImage = async (title, description) => {
// //     try {
// //         // Make a request to the AI image generation API
// //         const response = await axios.post('https://api.deepai.org/api/text2img', {
// //             title,
// //             description
// //         });
        
// //         // Assuming the API returns the URL of the generated image
// //         return response.data.imageUrl;
// //     } catch (error) {
// //         console.error('Error generating image:', error);
// //         return ''; // Return empty string in case of error
// //     } headers: {
// //       'Api-Key': 'YOUR_DEEP_AI_API_KEY' // Replace 'YOUR_DEEP_AI_API_KEY' with your actual DeepAI API key
// //  }
// // };

//   return (
//     <>
//       <Navbar />
//       <div className="container mt-4">
//         <div className="card">
//           <div className="card-body">
//             <h5 className="card-title">Add News</h5>
//             {successMessage && <div className="alert alert-success">{successMessage}</div>}
//             {generatedImage && <img src={generatedImage} alt="Generated Image" />}
//             <form onSubmit={handleSubmit}>
//               <div className="form-group">
//                 <label htmlFor="title">Title</label>
//                 <input type="text" className="form-control" name="title" placeholder="Title" value={formData.title} onChange={handleChange} />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="shortDescription">Short Description</label>
//                 <input type="text" className="form-control" name="shortDescription" value={formData.shortDescription} onChange={handleChange} />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="category">Category</label>
//                 <input type="text" className="form-control" name="category" value={formData.category} onChange={handleChange} />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="longDescription">Long Description</label>
//                 <textarea className="form-control" name="longDescription" value={formData.longDescription} onChange={handleChange}></textarea>
//               </div>
//               <button type="submit" className="btn btn-primary">Submit</button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default NewsForm;


import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';

function NewsForm() {
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    category: '',
    longDescription: '',
    imageUrl: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Token not found in localStorage');
          return;
        }
  
        const response = await axios.get('http://localhost:5000/api/user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
  
        if (response.data && response.data.Name) {
          setUserName(response.data.Name);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
        console.error('Error response:', error.response); // Log the full error response
      }
    };
  
    fetchUserInfo();
  }, []);
  // Empty dependency array to ensure the effect runs only once

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found in localStorage');
        return;
      }

      const imageUrl = await generateImage(formData.longDescription);
      if (!imageUrl) {
        console.error('Failed to generate image');
        return;
      }

      const dataWithImage = { ...formData, imageUrl };

      const response = await axios.post('http://localhost:5000/api/newsblog', dataWithImage, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setSuccessMessage('News added successfully!');
        setFormData({
          title: '',
          shortDescription: '',
          category: '',
          longDescription: '',
          imageUrl: ''
        });
        setGeneratedImage(imageUrl);
      }
    } catch (error) {
      console.error('Error adding news:', error);
    }
  };

  const generateImage = async (description) => {
      try {
        let data = JSON.stringify({
          "providers": "replicate",
          "text": description,
          "resolution": "1024x1024",
          "num_images": 1
        });
        
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'https://api.edenai.run/v2/image/generation',
          headers: { 
            'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZmU5OTAxYzYtNzRkZi00MWUwLThhYjUtMGQ2MDZmYWExODQ3IiwidHlwZSI6ImFwaV90b2tlbiJ9.STdIPOd9y4XZh55znv56CV48yLuW8g_ADZgRyUTn5Kk', 
            'content-type': 'application/json'
          },
          data : data
        };
        
        // Use axios.post instead of axios.request
        const response = await axios.post(config.url, data, { headers: config.headers });
        
        console.log(JSON.stringify(response.data));
        return response.data.replicate.items[0].image_resource_url;
      } catch (error) {
        console.error('Error generating image:', error);
        return ''; // Return empty string in case of error
      }
    };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Add News</h5>
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {generatedImage && <img src={generatedImage} alt="Generated Image" />}
            {userName && <p>Welcome, {userName}!</p>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type="text" className="form-control" name="title" placeholder="Title" value={formData.title} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="shortDescription">Short Description</label>
                <input type="text" className="form-control" name="shortDescription" value={formData.shortDescription} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <input type="text" className="form-control" name="category" value={formData.category} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="longDescription">Long Description</label>
                <textarea className="form-control" name="longDescription" value={formData.longDescription} onChange={handleChange}></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewsForm;

// import React, { useState } from 'react';
// import axios from 'axios';
// import Navbar from './Navbar'; // Assuming you have this component

// function NewsForm() {
//   const [formData, setFormData] = useState({
//     title: '',
//     shortDescription: '',
//     category: '',
//     longDescription: ''
//   });
//   const [successMessage, setSuccessMessage] = useState('');
//   const [generatedImage, setGeneratedImage] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Example endpoint - replace with your actual endpoint to submit the news
//       const newsSubmitUrl = 'http://localhost:5000/api/newsblog';
//       const token = localStorage.getItem('token'); // Assuming you're using token-based authentication

//       if (!token) {
//         console.error('Token not found in localStorage');
//         return;
//       }

//       const response = await axios.post('http://localhost:5000/api/newsblog', formData, {
//                      headers: {
//                          Authorization: `Bearer ${token}` // Include token in the Authorization header
//                      }
//                  });

//       if (response.status === 200) {
//         setSuccessMessage('News added successfully!');
//         setFormData({
//           title: '',
//           shortDescription: '',
//           category: '',
//           longDescription: ''
//         });

//         // Generate image after successful news submission
//         const imageUrl = await generateImage(formData.longDescription);
//         setGeneratedImage(imageUrl);
//       }
//     } catch (error) {
//       console.error('Error adding news:', error);
//     }
//   };

//   // Function to call the DeepAI Text-to-Image API
//   const generateImage = async (description) => {
//     try {
//       const response = await axios.post('https://api.deepai.org/api/text2img', {
//         text: description,
//       }, {
//         headers: {
//           'Api-Key': '7a6ca949-6f95-44d2-898d-fbd65664d9fb' // Replace with your actual DeepAI API key
//         }
//       });

//       return response.data.output_url;
//     } catch (error) {
//       console.error('Error generating image:', error);
//       return '';
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="container mt-4">
//         <div className="card">
//           <div className="card-body">
//             <h5 className="card-title">Add News</h5>
//             {successMessage && <div className="alert alert-success">{successMessage}</div>}
//             {generatedImage && <img src={generatedImage} alt="Generated" />}
//             <form onSubmit={handleSubmit}>
//               <div className="form-group">
//                 <label htmlFor="title">Title</label>
//                 <input type="text" className="form-control" name="title" placeholder="Title" value={formData.title} onChange={handleChange} />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="shortDescription">Short Description</label>
//                 <input type="text" className="form-control" name="shortDescription" value={formData.shortDescription} onChange={handleChange} />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="category">Category</label>
//                 <input type="text" className="form-control" name="category" value={formData.category} onChange={handleChange} />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="longDescription">Long Description</label>
//                 <textarea className="form-control" name="longDescription" value={formData.longDescription} onChange={handleChange}></textarea>
//               </div>
//               <button type="submit" className="btn btn-primary">Submit</button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default NewsForm;