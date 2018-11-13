import React from 'react';

export default function Favorites(props) {

  function getYears(show) {
    if (show) {
      const start = show.air_start.slice(0,4);
      const end = show.air_end.slice(0,4);
      return `${start} - ${end}`;
    };
  }

  function dataList(data) {
    if (data) {
      return data.map((d, i) => {
        return (
          <li className='body-list-item' key={i} onClick={() => props.handleShowClick(d.db_id)}>
            <div className='body-list-img' style={{backgroundImage: `url(${d.img})`}}/>
            <div className='body-list-info'>
              <div className='body-list-title'>{d.title}</div>
              <div className='body-list-datum'>{getYears(d)}</div>
            </div>
          </li>
        );
      });
    };
  }

  return (
    <ul className='body-list'>
      <li key='body-list-title'>
        <h2>Watch List</h2>
      </li>
      {dataList(props.data)}
    </ul>
  );
}
