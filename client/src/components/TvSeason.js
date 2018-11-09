import React from 'react';

const TvSeason = (props) => {
  let base = props.tvshow.poster_path
  let base1 = "https://image.tmdb.org/t/p/w500"
  let base2 = base1 + base

  return (
    <div className="tv-inlist">
      <img alt='' src= {base2} />
      <h2>{props.tvshow.name}</h2>
      <h4>Premiered On: &nbsp;{props.tvshow.air_date}</h4>
      <h4>Number of episodes: &nbsp;{props.tvshow.episode_count}</h4>
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
