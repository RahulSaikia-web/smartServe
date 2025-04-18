import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Loading from './components/Loading';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulating a loading delay (e.g., API calls)
    const timer = setTimeout(() => setIsLoading(false), 2000); // Set timeout for 2 seconds
    
    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, []);

  return (
    <BrowserRouter>
      {isLoading ? (
        <Loading />
      ) : (
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
