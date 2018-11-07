import React from 'react';

import { Link } from 'react-router-dom';

const TvShow = (props) => {
  return (
    <div className="tv-inlist">
      <img alt='' src={props.tvshow.url} />
      <h2>{props.tvshow.flavor}</h2>
      <p>Rating: {props.tvshow.rating || 'N/A'}</p>
      <Link to={`/tv-show/${props.tvshow.id}`}>See More</Link>
    </div>
  )
}

export default TvShow;