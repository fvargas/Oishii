import Header from 'Header.jsx';
import SideNav from 'SideNav.jsx';
import Map from 'Map.jsx';
import CreateEventModal from 'CreateEventModal.jsx';
import 'Home.less';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
    };
    this.handleLatLngSelect = this.handleLatLngSelect.bind(this);
  }

  handleLatLngSelect(lat, lng) {
    this.setState({ latitude: lat, longitude: lng });
  }

  render() {
    return (
      <div className='home-container'>
        <Header showSideNav={ () => this.refs.sideNav.showSideNav() } />
        <SideNav ref='sideNav' />
        <Map
          showCreateEventModal={ () => this.refs.createEventModal.showModal() }
          onLatLngSelect={ this.handleLatLngSelect }
        />
        <CreateEventModal
          latitude={ this.state.latitude }
          longitude={ this.state.longitude }
          ref='createEventModal'
        />
      </div>
    );
  }
}
