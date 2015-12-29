import CreateEventForm from 'CreateEventForm.jsx';

export default class CreateEventModal extends React.Component {
  showModal() {
    const modal = UIkit.modal('#create-event-modal');
    modal.show();
  }

  /**
   * Binds an event handler for the `show.uk.modal' event on `ref' that
   * focuses the first empty, child input.
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
      <div id='create-event-modal' className='uk-modal' ref={ this.autoFocus }>
        <div className='uk-modal-dialog'>
          <a className='uk-modal-close uk-close'></a>
          <CreateEventForm
            eventCollection={ this.props.eventCollection }
            latitude={ this.props.latitude }
            longitude={ this.props.longitude }
          />
        </div>
      </div>
    );
  }
}
