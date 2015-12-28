import 'map-icons.css';
import 'Map.less';

export default class Map extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Export this function to `window' so Google Maps can invoke it as a
    // callback
    window.initializeMap = this.initializeMap.bind(this);
    this.loadGoogleMaps('initializeMap');
  }

  /**
   * Asynchronously load the Google Maps API and execute the function given by
   * the callback argument upon completion. The function given by `callback'
   * must exist in the global scope.
   *
   * @param {String} callback
   */
  loadGoogleMaps(callback) {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?v=3&callback=${callback}`;
    document.head.appendChild(script);
  }

  initializeMap() {
    const DEFAULT_LATITUDE = 40.442492;
    const DEFAULT_LONGITUDE = -79.942553;

    let mapOptions = {
      center: new google.maps.LatLng(DEFAULT_LATITUDE, DEFAULT_LONGITUDE),
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: this.getMapStyles(),
      panControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      overviewMapControl: false,
    };
    // Set zoom control on or off depending on presence of touch events
    /*if (Modernizr.touch) {
        mapOptions['zoomControl'] = false;
    } else {
        mapOptions['zoomControl'] = true;
    }*/

    const map = new google.maps.Map(
      document.getElementById('map-canvas'),
      mapOptions
    );

    const infoWindow = new google.maps.InfoWindow({
      maxWidth: 250,
    });

    this.renderIcons(map, infoWindow);

    // Show event creation UI and record the latitude and longitude where the
    // user clicked on the map
    map.addListener('click', e => {
      const latLng = e.latLng;
      this.props.onLatLngSelect(latLng.lat(), latLng.lng());

      this.props.showCreateEventModal();
    });
  }

  /**
   * Get the styles to be used in the map.
   *
   * Credit: Famous Labs
   *         https://snazzymaps.com/style/61/blue-essence
   *
   * @return {Array<google.maps.MapTypeStyle>}
   */
  getMapStyles() {
    const styles = [
      {
          "featureType": "landscape.natural",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "color": "#e0efef"
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "hue": "#1900ff"
              },
              {
                  "color": "#c0e8e8"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
              {
                  "lightness": 100
              },
              {
                  "visibility": "simplified"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "labels",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "lightness": 700
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "all",
          "stylers": [
              {
                  "color": "#7dcdcd"
              }
          ]
      }
    ];

    return styles;
  }

  /**
   * Creates and renders the icons to be displayed on the map.
   *
   * @param {google.maps.Map} map
   * @param {google.maps.InfoWindow} infoWindow
   */
  renderIcons(map, infoWindow) {
    const MapIcons = require('exports?Marker,MAP_PIN!' +
      'map-icons/dist/js/map-icons.js');

    // Create markers for all events
    this.props.events.each(currentEvent => {
      const marker = new MapIcons.Marker({
        position: new google.maps.LatLng(
          currentEvent.get('latitude'),
          currentEvent.get('longitude')
        ),
        map: map,
        title: currentEvent.get('title'),
        icon: {
          path: MapIcons.MAP_PIN,
          fillColor: '#00acd1',
          fillOpacity: 0.92,
          strokeColor: '',
          strokeWeight: 0,
        },
        map_icon_label: '<span class="map-icon map-icon-restaurant"></span>',
        content: currentEvent.get('html'),
        id: currentEvent.get('id'),
      });
      google.maps.event.addListener(marker, 'click', () => {
        this.markerClickAction(marker, map, infoWindow);
      });
    });
  }

  /**
   * Updates the info window for the clicked marker. Binds event handler for
   * starring the event.
   *
   * @param {MapIcons.Marker} marker
   * @param {google.maps.Map} map
   * @param {google.maps.InfoWindow} infoWindow
   */
  markerClickAction(marker, map, infoWindow) {
    infoWindow.setContent(marker.content);
    infoWindow.open(map, marker);

    /*const eventId = this.id;
    // TODO: If a single element gets several bindings, will multiple
    // toggle operations be performed, potentially cancelling each other out?
    $(`#event_${eventId}`).click(eventId, toggleEventStar);*/
  }

  render() {
    return <div id='map-canvas'></div>;
  }
}

/*$(function() {
    var map;
    var infoWindow;

    initializeMap();

    $('.datepicker').pickadate({
        selectMonths: true,
        selectYears: 5
    });

    $('#event-form').submit(createEvent);
});*/

/**
 * Sends an AJAX request to toggle the star state of the given event.
 *
 * @param {int} id
 */
function toggleEventStar(event) {
    var eventId = event.data;
    var data = {
        event_id: eventId,
    };

    $.ajax({
        url: '/toggle-star',
        method: 'POST',
        data: data,
        dataType: 'text',
        success: success,
    });

    function success(response) {
        if (response === 'starred' || response === 'unstarred') {
            var selector = '#event_' + eventId;
            $(selector).toggleClass('starred');
            $(selector).toggleClass('unstarred');

            var currentStars = parseInt($('#event_stars_' + eventId).html());
            if (response === 'starred')
                $('#event_stars_' + eventId).html(currentStars + 1);
            else
                $('#event_stars_' + eventId).html(currentStars - 1);
        }
    }
}

/**
 * Attempts to add a new event to the database. If successful, a new event
 * marker is placed on the map at the clicked location.
 */
function createEvent() {
    var data = {
        title: $('#id_title').val(),
        host: $('#id_host').val(),
        event_description: $('#id_event_description').val(),
        menu_description: $('#id_menu_description').val(),
        location_description: $('#id_location_description').val(),
        latitude: $('#id_latitude').val(),
        longitude: $('#id_longitude').val(),
        start_date: $('#id_start_date').val(),
        end_date: $('#id_end_date').val()
    };

    $.ajax({
        url: '/create-event',
        method: 'POST',
        data: data,
        dataType: 'json',
        success: success
    });

    function success(data) {
        if ($.isEmptyObject(data)) {
            // signal error in form information
            return;
        }

        $('#create-event').closeModal();

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(data['latitude'], data['longitude']),
            map: map,
            icon: DEFAULT_ICON,
            title: data['title'],
            content: data['html'],
            id: data['id'],
            animation: google.maps.Animation.DROP
        });
        google.maps.event.addListener(marker, 'click', markerClickAction);
    }

    // Necessary to stop event propagation
    return false;
}
