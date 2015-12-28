export default class EventCollection extends Backbone.Collection {
  constructor() {
    super();
    this.url = '/fetch-events';
  }
}
