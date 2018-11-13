import React from 'react';

export default function Footer(props) {
  return(
    <div className='footer'>
      <button onClick={props.handleBack}>&larr;</button>
      <button onClick={props.handleLogout}>Log Out</button>
    </div>
  )
}
