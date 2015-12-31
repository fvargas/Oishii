export default class EventCollection extends Backbone.Collection {
  constructor(...args) {
    super(...args);
    this.url = '/events';
  }
}
