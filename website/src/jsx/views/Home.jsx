import Header from 'Header.jsx';
import SideNav from 'SideNav.jsx';
import Map from 'Map.jsx';
import CreateEventModal from 'CreateEventModal.jsx';
import EventCollection from 'EventCollection.js';
import 'Home.less';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventCollection: new EventCollection(),
      latitude: 0,
      longitude: 0,
    };
    this.handleLatLngSelect = this.handleLatLngSelect.bind(this);
  }

  componentWillMount() {
    this.state.eventCollection.fetch();
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
          eventCollection={ this.state.eventCollection }
          showCreateEventModal={ () => this.refs.createEventModal.showModal() }
          onLatLngSelect={ this.handleLatLngSelect }
        />
        <CreateEventModal
          eventCollection={ this.state.eventCollection }
          latitude={ this.state.latitude }
          longitude={ this.state.longitude }
          ref='createEventModal'
        />
      </div>
    );
  }
}
