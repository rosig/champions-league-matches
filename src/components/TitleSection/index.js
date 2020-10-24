import React from 'react';
import { Card } from 'react-bootstrap';

export default function TitleSection ({ text }) {
  return (
    <Card
    bg={'dark'}
    text={'white'}
    className="mb-2"
    style={{width: '100%', textAlign: 'center', margin: '10px 0 10px 0'}}
  >
    <Card.Header style={{fontWeight: 'bold', fontSize: '20px'}}>{text}</Card.Header>
  </Card>
  )
}