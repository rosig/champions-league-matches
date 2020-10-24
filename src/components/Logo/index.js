import React from 'react';
import logo from '../../assets/img/champions_logo.png';

export default function Logo () {
  return (
    <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <img src={logo} alt='Champions-League-Logo' style={{width: '150px', height: '150px'}}/>
    </div>
  )
}