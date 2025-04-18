import { useEffect, useState } from 'react';
import './Loading.css'; // Create this CSS file
import logo from '../assets/logo.png'

const Loading = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loader">
      <img
        id="logo"
        src={logo}
        alt="Website Logo"
      />
      <div className="progress">
        <div
          className="progress-bar"
          style={{ width: `${progress}%` }}
        >
          {progress}%
        </div>
      </div>
    </div>
  );
};

export default Loading;