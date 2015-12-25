import 'datepicker.js';
import 'datepicker.almost-flat.css';
import 'timepicker.js';
import 'autocomplete.js';
import 'autocomplete.almost-flat.css';

export default class CreateEventModal extends React.Component {

  /**
   * Binds an event handler for the `show.uk.modal' event on `ref' that
   * focuses the first child empty input field.
   *
   * @param {DOM Element} ref
   */
  autoFocus(ref) {
    $(ref).on('show.uk.modal', () => {
      const emptyFields = $(ref).find('input, textarea').filter((idx, el) => {
        return el.value === '';
      });

      if (emptyFields.length > 0) {
        emptyFields[0].focus();
      }
    });
  }

  render() {
    return (
      <div id='create-event' className='uk-modal' ref={ this.autoFocus }>
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
                  <textarea id='create-event-description' className='uk-form-large uk-width-1-1'></textarea>
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
