import Header from 'header.jsx';
import SideNav from 'sidenav.jsx';
import Map from 'map.jsx';
import 'home.less';

export default class Home extends React.Component {
  render() {
    const SIDE_NAV_ID = 'side-nav';

    return (
      <div className='home-container'>
        <Header sideNavID={ SIDE_NAV_ID } />
        <SideNav sideNavID={ SIDE_NAV_ID } />
        <Map />
      </div>
    );
  }
}
