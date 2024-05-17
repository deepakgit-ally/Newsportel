import React, { useState } from 'react';

function VoiceSearch() {
    const [searchResult, setSearchResult] = useState([]);
    const [searching, setSearching] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleVoiceSearch = () => {
        setSearching(true);
        const recognition = new window.webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.lang = 'en-US';

        recognition.onresult = function(event) {
            const query = event.results[0][0].transcript.trim();
            console.log(recognition)
            // Send the query to your backend API
            fetch(`http://localhost:5000/api/newsblog?q=${encodeURIComponent(query)}`)
                .then(response => response.json())
                .then(data => {
                    if (data.length > 0) {
                        setSearchResult(data);
                        setErrorMessage('');
                    } else {
                        setSearchResult([{ id: 0, title: "No matching results found." }]);
                        setErrorMessage('No matching results found.');
                    }
                })
                .catch(error => {
                    console.error(error);
                    setSearchResult([{ id: 0, title: "Error occurred while fetching data." }]);
                    setErrorMessage('Error occurred while fetching data.');
                })
                .finally(() => {
                    setSearching(false);
                });
        };

        recognition.onerror = function(event) {
            console.error('Speech recognition error:', event.error);
            setSearchResult([{ NewsId: 0, Title: "Speech recognition error occurred." }]);
            setErrorMessage('Speech recognition error occurred.');
            setSearching(false);
        };

        recognition.start();
    };
  
    return (
        <div className='container'>
            <div className='card '>
                <div className='col-md-12 d-flex row mt-4'>
                <h1 className='col-md-4 text-center'>Voice Search</h1>
                <button onClick={handleVoiceSearch} className='col-md-4 ms-auto btn btn-primary'>
                    {searching ? 'Searching...' : 'Start Voice Search'}
                </button>
                </div>
                <div className='py-4 mt-4'>
                    {errorMessage ? (
                        <div>
                            <h3>{errorMessage}</h3>
                        </div>
                    ) : (
                        searchResult.map(result => (
                            <div key={result.NewsId}>
                                <h3>{result.Title}</h3>
                                <p>{result.Category}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default VoiceSearch;
