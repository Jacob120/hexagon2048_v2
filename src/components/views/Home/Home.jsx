import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Home.module.scss';

const Home = () => {
  const [hostname, setHostname] = useState('test');
  const [port, setPort] = useState(80);
  const [radius, setRadius] = useState(2);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new URLSearchParams();
    params.set('hostname', hostname);
    params.set('port', port);
    params.set('radius', radius);
    navigate(`/hexagongrid?${params.toString()}`);
  };

  return (
    <div className='container'>
      <form onSubmit={handleSubmit} className={styles.wrapper}>
        <label htmlFor='hostname'>Hostname:</label>
        <input
          type='text'
          id='hostname'
          value={hostname}
          onChange={(event) => setHostname(event.target.value)}
        />
        <br />
        <label htmlFor='port'>Port:</label>
        <input
          type='number'
          id='port'
          value={port}
          onChange={(event) => setPort(event.target.value)}
        />
        <br />
        <label htmlFor='radius'>Radius:</label>
        <span>{radius}</span>
        <input
          type='range'
          min='2'
          max='6'
          id='radius'
          value={radius}
          onChange={(event) => setRadius(event.target.value)}
        />
        <br />
        <button type='submit'>Start game</button>
      </form>
    </div>
  );
};

export default Home;
