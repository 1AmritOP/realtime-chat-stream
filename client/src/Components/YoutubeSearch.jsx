import axios from 'axios';
import { useState } from 'react';
import socket from '../socket';


// const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

const YouTubeSearch = ({ roomId }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

//   const handleSearch = async () => {
//     const res = await axios.get(
//       `https://www.googleapis.com/youtube/v3/search`, {
//         params: {
//           part: 'snippet',
//           maxResults: 8,
//           q: query,
//           type: 'video',
//           key: YOUTUBE_API_KEY,
//         },
//       }
//     );

//     setResults(res.data.items);
//   };

const handleSearch =async ()=>{
    try {
        
        const res= await axios.get(`${import.meta.env.VITE_BACKEND_URL}/search?q=${query}`);
        const data= res.data;
        console.log(data);
        
        setResults(data);
    } catch (error) {
        console.log(error);
        
    }
}

  const handleVideoSelect = (videoId) => {
    socket.emit('load-video', { roomId, videoId });
    console.log("video selected");
    
  };

  return (
    <div>
        <div className=' my-2'>
        <input className='outline-none max-[400px]:w-full px-8 py-2.5 border border-gray-300 rounded-2xl mr-2'
            placeholder="Search YouTube"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
        <button className=' cursor-pointer px-8 py-2.5 bg-indigo-600  rounded-2xl mt-6' onClick={handleSearch}>Search</button>
        </div>

      <div className="video-results">
        {results.map((video) => (
          <div className=' my-2 flex items-center gap-2' key={video.id} onClick={() => handleVideoSelect(video.id)}>
            <img className=' rounded-2xl h-40 w-52 '  src={video.bestThumbnail.url} alt="thumb" />
            <div>{video.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YouTubeSearch;
