import React from 'react';

import { Link } from 'react-router-dom';

const TvSeason = (props) => {
  return (
    <div className="tv-inlist">
      <img alt='' src={props.tvshow.poster_path} />
      <h2>{props.tvshow.name}</h2>
      <h4>{props.tvshow.air_date}</h4>
      <h4>{props.tvshow.episode_count}</h4>
    </div>
  )
}

export default TvSeason;

      // <img alt='' src={props.tvshow.url} />
      // <h2>{props.tvshow.name}</h2>
      // <h3>{props.tvshow.network}</h3>
      // <h4>{props.tvshow.genre}</h4>
      // <p>Popularity: {props.tvshow.rating || 'N/A'}</p>
      // <Link to={`/tv-show/${props.tvshow.id}`}>See More</Link>
