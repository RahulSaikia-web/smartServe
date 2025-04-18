import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost/backend/api.php')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Data from PHP Backend</h1>
      <ul>
        {data.map((item, index) => (
           <li key={index}>
          Id: {item.id} | Name: {item.username} | Email: {item.email} | Phone: {item.phone}
         </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
