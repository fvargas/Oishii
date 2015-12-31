export default class CreateEventFormModel extends Backbone.Model {
  validate(attrs) {
    // TODO: Implement validation logic
  }

  getNormalizedModel() {
    const start = new Date();
    const end = new Date();

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
