import React from 'react'

const Suggestions = (props) => {
    console.log(props)
    const options = props.results.map(r => (
      <li key={r.id}>
        {r.name}
      </li>
    ))
    console.log(options)
    return <ul>{options}</ul>
        //need the options to be rendered like TV show list component
        //options still not hitting the api correctly 

  }
  
  export default Suggestions