import React, { useEffect, useState } from 'react';
import useFetch from './hooks/useFetch';

function App() {
  const { data, loading, error } = useFetch('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=DEMO_KEY');
  const [pokemonDetails, setPokemonDetails] = useState([]);

  useEffect(() => {
    console.log('Fetched data:', data); // Log the fetched data
    const fetchAllDetails = async () => {
      if (!data?.photos) {
        console.log('No photos found in data');
        return;
      }
      const details = await Promise.all( //use Promise.all to fetch all details and for future async calls
        data.photos.map(photo => ({ img_src: photo.img_src })) // Adjust mapping logic
      );
      console.log('Fetched details:', details); // Log the details
      setPokemonDetails(details);
    };

    fetchAllDetails();
  }, [data]);

  return (
    <div className="app">
      <h1 className="heading">Mars Rover</h1>

      {loading && <p className="info">Loading...</p>}
      {error && <p className="error">Error: {error}</p>}

      <div className="grid">
        {pokemonDetails.map((detail, index) => (
          <img key={index} src={detail.img_src} alt="Mars Rover" />
        ))}
      </div>
    </div>
  );
}
export default App;