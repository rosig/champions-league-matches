import React from 'react';
import Matches from '../Matches';
import TitleSection from '../TitleSection';

export default function AllMatches ({ matchesByDate }) {
  return (
    <>
      <TitleSection text='Todos os jogos' />
      {
        matchesByDate.map(matches => <Matches key={matches.date} matches={matches} />)
      }
    </>
  )
}