import React from 'react';
import 'home.less';
import Header from 'header.jsx';
import Map from 'map.jsx';

export default class Home extends React.Component {
  render() {
    return (
      <div className='home-container'>
        <Header />
        <Map />
      </div>
    );
  }
}
