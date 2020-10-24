import React, { useState, useEffect, useRef } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { parseISO, getHours, getMinutes } from 'date-fns'
import './styles.scss';

function Schedule({ date, status }) {
  const formaTdate = parseISO(date)
  const hour = getHours(formaTdate)
  const minute = getMinutes(formaTdate)
  let variant;

  if (status === 'SCHEDULED') variant = 'primary'
  else if (status === 'IN_PLAY' || status === 'PAUSED') variant = 'warning'
  else variant = 'danger'

  return (
    <Badge 
      variant={variant} 
      style={{marginRight: '20px'}}>
        {`${hour}:${minute.toString().length > 1 ? minute : '0' + minute}`}
    </Badge>
  )
}

export default function Matches ({matches}) {
  const [clipboardText, setClipboardText] = useState('')
  const [buttonClicked, setButtonClicked] = useState(false)
  const target = useRef(null);

  function handleButtonClick () {
    const textField = document.createElement('textarea');
    textField.textContent = clipboardText;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
    setButtonClicked(true)
  }

  useEffect(() => {
    if (buttonClicked) {
      setTimeout(() => {
        setButtonClicked(false)
      }, 2000);
    }
  },[buttonClicked])

  useEffect(() => {
    let auxText = ''
    matches.listMatches.forEach(match => {
      if(match.status === "FINISHED") {
        auxText = `${auxText}\n${match.homeTeam.name} [${match.score.fullTime.homeTeam} vs ${match.score.fullTime.awayTeam}] ${match.awayTeam.name}`
      } else {
        auxText = `${auxText}\n${match.homeTeam.name} [{x} vs {y}] ${match.awayTeam.name}`
      }
    })
    setClipboardText(auxText)
  },[matches])

  return (
    <Card
      bg={'dark'}
      key={matches.date}
      text={'white'}
      className="mb-2"
    >
      <Card.Header>{matches.date}</Card.Header>
      <Card.Body>
        {
          matches.listMatches.map(match => {
            return (
              <Card.Text key={match.id}>
                <Schedule date={match.utcDate} status={match.status}/>
                {
                  match.status === 'FINISHED' ? (
                    <>
                      {match.homeTeam.name}
                      <Badge 
                        variant={'light'} 
                        style={{marginLeft: '10px', marginRight: '5px'}}>
                        {match.score.fullTime.homeTeam}
                      </Badge>
                      {'vs'}
                      <Badge 
                        variant={'light'} 
                        style={{marginRight: '10px', marginLeft: '5px'}}>
                        {match.score.fullTime.awayTeam}
                      </Badge>
                      {match.awayTeam.name}
                    </>
                  ) : `${match.homeTeam.name} vs ${match.awayTeam.name}`
                }
              </Card.Text>
            )
          })
        }
      </Card.Body>
      <Button
        variant={buttonClicked ? 'warning' : 'success' }
        disabled={buttonClicked ? true : false}
        style={{width: '100%'}}
        ref={target}
        onClick={() => handleButtonClick()}>{buttonClicked ? 'Jogos copiados para área de transferência' : 'Copiar'}</Button>{' '}
    </Card>
  )
}