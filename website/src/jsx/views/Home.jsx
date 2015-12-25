import Header from 'Header.jsx';
import SideNav from 'SideNav.jsx';
import Map from 'Map.jsx';
import CreateEventModal from 'CreateEventModal.jsx';
import 'Home.less';

export default class Home extends React.Component {
  render() {
    const SIDE_NAV_ID = 'side-nav';

    return (
      <div className='home-container'>
        <Header sideNavID={ SIDE_NAV_ID } />
        <SideNav sideNavID={ SIDE_NAV_ID } />
        <Map />
        <CreateEventModal />
      </div>
    );
  }
}
