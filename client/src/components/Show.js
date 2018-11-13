import React from 'react';

export default function Show(props) {

  function getYears(episodes) {
    if (episodes) {
      const start = episodes[0].air_date.slice(0,4);
      const end = episodes[episodes.length - 1].air_date.slice(0,4);
      return `${start} - ${end}`;
    };
  }

  return (
    <div className='show'>
      <div className='show-header'>
        <div className='show-title'>{props.data.title}</div>
        <div className='show-datum'>{getYears(props.data.episode_list)}</div>
      </div>
      <div className='show-img' style={{backgroundImage: `url(${props.data.img_bg})`}}/>
      <div className='show-info-container'>
        <div className='show-datum'>{props.data.episodes} Episodes ({props.data.seasons} Seasons)</div>
      </div>
      <div className='show-summary'>{props.data.summary}</div>
      <button onClick={() => props.handleAddFave(props.data.id)}>Add To Watchlist</button>
    </div>
  );
}
