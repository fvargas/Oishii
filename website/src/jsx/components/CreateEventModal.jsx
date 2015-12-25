import 'datepicker.js';
import 'datepicker.almost-flat.css';
import 'timepicker.js';
import 'autocomplete.js';
import 'autocomplete.almost-flat.css';
import 'CreateEventModal.less';

export default class CreateEventModal extends React.Component {
  render() {
    return (
      <div id='create-event' className='uk-modal'>
        <div className='uk-modal-dialog'>
          <a className='uk-modal-close uk-close'></a>
          <form className='uk-form uk-form-horizontal'>
            <fieldset>
              <legend>Create new event</legend>
              <div className='uk-form-row'>
                <label className='uk-form-label' htmlFor='create-event-title'>Title</label>
                <div className='uk-form-controls'>
                  <input
                    id='create-event-title'
                    className='uk-form-large uk-width-1-1'
                    type='text'
                    placeholder='Title'
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
                    placeholder='Host'
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
                    placeholder='Food'
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
                    placeholder='Location'
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
                    placeholder='Date'
                    data-uk-datepicker='{weekstart:0, format:"MM/DD/YYYY"}'
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
                    placeholder='Time'
                    data-uk-timepicker='{format:"12h"}'
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
                  />
                </div>
              </div>
              <div className='uk-form-row'>
                <label className='uk-form-label' htmlFor='create-event-description'>Description</label>
                <div className='uk-form-controls'>
                  <textarea id='create-event-description' className='uk-width-1-1' placeholder='Description'></textarea>
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
        </div>
      </div>
    );
  }
}
