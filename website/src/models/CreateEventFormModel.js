import Moment from 'moment';

export default class CreateEventFormModel extends Backbone.Model {
  validate(attrs) {
    // TODO: Implement validation logic
  }

  getNormalizedModel() {
    const moment = Moment(`${this.get('date')} ${this.get('time')}`,
      'MM/DD/YYYY hh:mm A');
    const start = moment.format('M/D/YYYY HH:mm');
    moment.add(this.get('duration'), 'hours');
    const end = moment.format('M/D/YYYY HH:mm');

    const normalizedModel = new Backbone.Model({
      title: this.get('title'),
      host: this.get('host'),
      food: this.get('food'),
      location: this.get('location'),
      start: start,
      end: end,
      description: this.get('description'),
      latitude: this.get('latitude'),
      longitude: this.get('longitude'),
    });

    return normalizedModel;
  }
}
