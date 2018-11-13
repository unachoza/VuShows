import React from 'react';

export default function SearchResults(props) {






  function dataList(data) {
    if (data) {
      return data.map((d, i) => {
        return (
          <li className='body-list-item' key={i} onClick={() => props.handleShowClick(d.db_id)}>
            <div className='body-list-img' style={{backgroundImage: `url(${d.img})`}}/>
            <div className='body-list-info'>
              <div className='body-list-title'>{d.title}</div>
              <div className='body-list-datum'>{d.year}</div>
            </div>
          </li>
        );
      });
    };
  }

  return (
    <ul className='body-list'>
      {dataList(props.data)}
    </ul>
  );
}
