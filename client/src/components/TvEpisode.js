import React from 'react';

const TvEpisode = (props) => {
  let base = props.episodes.still_path
  let base1 = "https://image.tmdb.org/t/p/w500"
  let base2 = base1 + base
  return (
    <div className="tv-inlist">
      <img alt='' src= {base2} />
      <h2>{props.episodes.name}</h2>
    </div>
  )
}

export default TvEpisode;
