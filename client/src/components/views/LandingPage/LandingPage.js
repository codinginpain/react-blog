import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';

import "./LandingPage.css"
function LandingPage() {

  useEffect(() => {
    axios.get('/api/hello')
    .then(response => console.log(response.data))
  }, [])
  return (
    <div className='landingContainer'>
      <h2>시작 페이지</h2>
    </div>
  );
}

export default LandingPage;