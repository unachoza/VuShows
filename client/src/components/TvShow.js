import React from 'react';
import { Link } from 'react-router-dom';

const TvShow = (props) => {
	//console.log(props.tvshow)
  return (
		<div>
			<div className="tv-inlist">
				<img alt='' src={props.tvshow.url} />
				<h2>{props.tvshow.name}</h2>
				<p>Genre: {props.tvshow.genre}</p>
				<p>Network: {props.tvshow.network}</p>
				<p>Seasons: {/*{props.tvshow.#}*/}</p> 
				<p>Rating: {props.tvshow.rating || 'N/A'}</p>
				<Link to={`/tv-show/${props.tvshow.id}`}>See More</Link>
			</div>
		</div>
  )
}

export default TvShow;

// const TvShow = (props) => {
//   return (
//     <div className="tv-inlist">
//       <div class="backgroundimage"></div>
//       <div class="show-heading">
//         <div class="show-poster"></div>
//         <div class="info">
//         <h2>Friends</h2>
//       </div>
//     </div>
//   )
// }

// export default TvShow;
