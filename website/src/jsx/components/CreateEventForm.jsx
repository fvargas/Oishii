import 'datepicker.js';
import 'datepicker.almost-flat.css';
import 'timepicker.js';
import 'autocomplete.js';
import 'autocomplete.almost-flat.css';

export default class CreateEventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      host: '',
      food: '',
      location: '',
      date: '',
      time: '',
      duration: '',
      description: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.createEvent = this.createEvent.bind(this);
  }

  handleChange() {
    this.setState({
      title: this.refs.title.value,
      host: this.refs.host.value,
      food: this.refs.food.value,
      location: this.refs.location.value,
      date: this.refs.date.value,
      time: this.refs.time.value,
      duration: this.refs.duration.value,
      description: this.refs.description.value,
    });
  }

  createEvent(e) {
    e.preventDefault();

    this.props.eventCollection.create({
      title: this.refs.title.value,
      host: this.refs.host.value,
      food: this.refs.food.value,
      location: this.refs.location.value,
      date: this.refs.date.value,
      time: this.refs.time.value,
      duration: this.refs.duration.value,
      description: this.refs.description.value,
      latitude: this.props.latitude,
      longitude: this.props.longitude,
    });
  }

  render() {
    return (
      <form className='uk-form uk-form-horizontal' onSubmit={ this.createEvent }>
        <fieldset>
          <legend>Create new event</legend>
          <div className='uk-form-row'>
            <label className='uk-form-label' htmlFor='create-event-title'>Title</label>
            <div className='uk-form-controls'>
              <input
                id='create-event-title'
                className='uk-form-large uk-width-1-1'
                type='text'
                value={ this.state.title }
                onChange={ this.handleChange }
                ref='title'
              />
            </div>
          </div>
          <div className='uk-form-row'>
            <label className='uk-form-label' htmlFor='create-event-host'>Host</label>
            <div className='uk-form-controls'>
              <input
                id='create-event-host'
                className='uk-form-large uk-width-1-1'
                type='text'
                value={ this.state.host }
                onChange={ this.handleChange }
                ref='host'
              />
            </div>
          </div>
          <div className='uk-form-row'>
            <label className='uk-form-label' htmlFor='create-event-food'>Food</label>
            <div className='uk-form-controls'>
              <input
                id='create-event-food'
                className='uk-form-large uk-width-1-1'
                type='text'
                placeholder='e.g. Pizza, sandwiches, chipotle...'
                value={ this.state.food }
                onChange={ this.handleChange }
                ref='food'
              />
            </div>
          </div>
          <div className='uk-form-row'>
            <label className='uk-form-label' htmlFor='create-event-location'>Location</label>
            <div className='uk-form-controls'>
              <input
                id='create-event-location'
                className='uk-form-large uk-width-1-1'
                type='text'
                placeholder='e.g. Rashid Auditorium, GHC 4401'
                value={ this.state.location }
                onChange={ this.handleChange }
                ref='location'
              />
            </div>
          </div>
          <div className='uk-form-row'>
            <label className='uk-form-label' htmlFor='create-event-date'>Date</label>
            <div className='uk-form-controls'>
              <input
                id='create-event-date'
                className='uk-form-large uk-width-1-1'
                type='text'
                data-uk-datepicker='{weekstart:0, format:"MM/DD/YYYY"}'
                value={ this.state.date }
                onChange={ this.handleChange }
                ref='date'
              />
            </div>
          </div>
          <div className='uk-form-row'>
            <label className='uk-form-label' htmlFor='create-event-time'>Time</label>
            <div className='uk-form-controls'>
              <input
                id='create-event-time'
                className='uk-form-large uk-width-1-1'
                type='text'
                data-uk-timepicker='{format:"12h"}'
                value={ this.state.time }
                onChange={ this.handleChange }
                ref='time'
              />
            </div>
          </div>
          <div className='uk-form-row'>
            <label className='uk-form-label' htmlFor='create-event-duration'>Duration</label>
            <div className='uk-form-controls'>
              <input
                id='create-event-duration'
                className='uk-form-large uk-width-1-1'
                type='number'
                placeholder='Number of hours'
                value={ this.state.duration }
                onChange={ this.handleChange }
                ref='duration'
              />
            </div>
          </div>
          <div className='uk-form-row'>
            <label className='uk-form-label' htmlFor='create-event-description'>Description</label>
            <div className='uk-form-controls'>
              <textarea
                id='create-event-description'
                className='uk-form-large uk-width-1-1'
                value={ this.state.description }
                onChange={ this.handleChange }
                ref='description'
              ></textarea>
            </div>
          </div>
          <div className='uk-form-row'>
            <button
              type='submit'
              className='uk-button uk-button-large uk-button-primary uk-width-1-1'
            >Create event</button>
          </div>
        </fieldset>
      </form>
    );
  }
}
