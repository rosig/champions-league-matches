import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.scss';
import { Spinner } from 'react-bootstrap';

import Logo from './components/Logo';
import MatchesDay from './components/MatchesDay';
import AllMatches from './components/AllMatches';



function App() {
  const [matchesByDate, setMatchesByDate] = useState([])
  const [loading, setLoading] = useState(true)

  function checkDateExist(date, listMatchesByDate) {
    let output = false
    listMatchesByDate.forEach(item => {
      if(item.date === date) output = true
    })
    return output
  }

  function formatData(matches) {
    let listMatchesByDate = []

    matches.forEach(match => {
      const matchDate = match.utcDate.slice(0,10);
      if (checkDateExist(matchDate, listMatchesByDate)) {
        const auxMatchesByDate = listMatchesByDate.map(item => {
          if (item.date === matchDate) {
            item.listMatches.push(match)
          }
          return item
        })
        listMatchesByDate = [...auxMatchesByDate]
      } else {
        const newMatchesDate = {
          date: matchDate,
          listMatches: [match]
        }
        listMatchesByDate = [...listMatchesByDate, newMatchesDate]
      }
    })

    return listMatchesByDate
  }

  async function getMatches() {
    try {
      const response = await axios.get('https://api.football-data.org/v2/competitions/CL/matches', {
        headers: { 'X-Auth-Token': process.env.REACT_APP_TOKEN }
      })
      setMatchesByDate(formatData(response.data.matches))
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getMatches()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div className="app-container"> 
        <div className='app-content'>
          {
            loading ? (
              <div className='loading-container'>
                <Spinner animation="grow" variant="primary" />
                <Spinner animation="grow" variant="secondary" />
                <Spinner animation="grow" variant="success" />
                <Spinner animation="grow" variant="danger" />
              </div>
            ) :
            <>
              <Logo />
              <MatchesDay matchesByDate={matchesByDate}/>
              <AllMatches matchesByDate={matchesByDate}/>
            </>
          }
        </div>
    </div>
  );
}

export default App;
