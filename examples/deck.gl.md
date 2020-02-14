3d-Visualizing Carbon Monoxide Concentrations
=============================================

In this example we explain how to use [deck.gl](https://deck.gl/#/) –
a WebGL-powered framework for data visualization created by [Uber](https://www.uber.com) –
to visualize the amount of carbon monoxide in Germany from a couple of days.

The result will look somewhat like this:

<div id="container" style="height: 500px;"></div>

We are mostly following the [scripting get-started](https://github.com/uber/deck.gl/blob/7.3-release/examples/get-started/scripting/mapbox/index.html) from deck.gl.

## GeoJSON Data

Let's take a look at the data first.
We request all measured carbon monoxide values from Germany from – let's say – the fourth and fifth of February 2019 using the [geo.json](https://api.emissions-api.org/ui/#/default/emissionsapi.web.get_data) API endpoint and the URL query parameters *begin*, *end* and *country*:

```
https://api.emissions-api.org/api/v1/geo.json
    ?country=DE
    &begin=2019-02-04
    &end=2019-02-06
```

We are using the *country* url query parameter to receive carbon monoxide values from within the border of Germany.
Further, note that we specify February 6th as end date since end represents the first date not being included in the resulting data.

The response should look like this:

```json
{
  "features": [
    {
      "geometry": {
        "coordinates": [
          14.129653,
          53.374462
        ],
        "type": "Point"
      },
      "properties": {
        "carbonmonoxide": 0.0349522158503532,
        "timestamp": "2019-02-05T11:21:47.923000Z"
      },
      "type": "Feature"
    },
    {
      "geometry": {
        "coordinates": [
          13.63431,
          53.800873
        ],
        "type": "Point"
      },
      "properties": {
        "carbonmonoxide": 0.0341427326202393,
        "timestamp": "2019-02-05T11:21:56.562000Z"
      },
      "type": "Feature"
    },
    …
  ],
  "type": "FeatureCollection"
}
```

The result is a [GeoJSON FeatureCollection](https://geojson.org).
GeoJSON objects are often used for handling geographic data structures and are supported by a variety of different tools.

## Requesting Data

So now that we know how the data is structured and where we can find it, we have to figure out how to retrieve it.
Luckily enough, the deck.gl object we will be using later is able to handle the request itself and just take the URL as a parameter.
So we only have to construct the URL:

```javascript
// API URL
const API_URL = 'https://api.emissions-api.org/api/v1/geo.json' +
    '?country=DE&begin=2019-02-04&end=2019-02-06';
```

## Plotting Data

deck.gl offers [Mapbox](https://www.mapbox.com/) support and we will use it for the base map of our plot.
Therefore, we have to include the Mapbox script and stylesheet:

```html
<script src='https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.js'></script>
<link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.css' rel='stylesheet' />
```

and generate a [Mapbox Token](https://docs.mapbox.com/help/how-mapbox-works/access-tokens/) for later use.

deck.gl itself offers a [JavaScript scripting interface](https://deck.gl/#/documentation/deckgl-api-reference/scripting-interface/deckgl).
see [DeckGL (Scripting Interface)](https://deck.gl/#/documentation/deckgl-api-reference/scripting-interface/deckgl).
To use this we additionally include:

```html
<script src="https://unpkg.com/deck.gl@7.3/dist.min.js"></script>
```

We also need to define a HTML-container used from deck.gl to work on:

```html
<div id="container" style="height: 500px;"></div>

<script src="https://unpkg.com/deck.gl@7.3/dist.min.js"></script>
```

Now we can start to write our JavaScript code.

deck.gl will combine points in the same hexagon and lets you define how elevation and color of this hexagon is calculated.
For this example, we use the average carbon monoxide amount of all points in a hexagon for this.

Now let's define the visualization layer we have seen above:

```javascript
new deck.HexagonLayer({
    extruded: true,
    radius: 5000,
    data: API_URL,
    dataTransform: d => d.features,
    elevationScale: 100,
    getColorValue: points => points.reduce((sum, point) => sum + point.properties.carbonmonoxide, 0) / points.length,
    getElevationValue: points => points.reduce((sum, point) => sum + point.properties.carbonmonoxide, 0) / points.length,
    getPosition: d => d.geometry.coordinates,
}),
```

We can pass the API URL directly to the *HexagonLayer* and can extract the array of the different points with *dataTransform*.
With *getPosition* we calculate the coordinates for every point and with *getElevationValue* and *getColorValue* we can directly map the array of points in a hexagon to its elevation and color.
For more details, see [API Reference HexagonLayer](https://deck.gl/#/documentation/deckgl-api-reference/layers/hexagon-layer).

Finally, we create the *DeckGL* scripting object:

```javascript
new deck.DeckGL({
    container: 'container',
    mapboxApiAccessToken: '<your mapbox token>',
    mapStyle: "mapbox://styles/mapbox/dark-v9",
    longitude: 10,
    latitude: 50,
    zoom: 5,
    pitch: 50,
    layers: [
        …
    ]
});
```

Most parameters control the initial view and the underlying map.
*container* is the HTML-element we defined earlier and the visualization layers are in *layers*.
For details about the different parameters, take a look at [API Reference for DeckGL](https://deck.gl/#/documentation/deckgl-api-reference/scripting-interface/deckgl).

## Bringing It All Together

Finally, let’s take all the parts and bring them together.

For this, we can just copy most of the code we already have.

### HTML

```html
<script src='https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.js'></script>
<link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.css' rel='stylesheet' />
<script src="https://unpkg.com/deck.gl@7.3/dist.min.js"></script>

<div id="container" style="height: 500px;"></div>
```

### JavaScript

```javascript
// API URL
const API_URL = 'https://api.emissions-api.org/api/v1/geo.json' +
    '?country=DE&begin=2019-02-04&end=2019-02-06';

new deck.DeckGL({
    container: 'container',
    mapboxApiAccessToken: '<your mapbox token>',
    mapStyle: "mapbox://styles/mapbox/dark-v9",
    longitude: 10,
    latitude: 50,
    zoom: 5,
    pitch: 50,
    layers: [
        new deck.HexagonLayer({
            extruded: true,
            radius: 5000,
            data: API_URL,
            dataTransform: d => d.features,
            elevationScale: 100,
            getColorValue: points => points.reduce((sum, point) => sum + point.properties.carbonmonoxide, 0) / points.length,
            getElevationValue: points => points.reduce((sum, point) => sum + point.properties.carbonmonoxide, 0) / points.length,
            getPosition: d => d.geometry.coordinates,
        }),
    ]
});
```

That's it!

<script src='https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.js'></script>
<link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.css' rel='stylesheet' />
<script src="https://unpkg.com/deck.gl@7.3/dist.min.js"></script>
<script>

// API URL
const API_URL = 'https://api.emissions-api.org/api/v1/geo.json' +
    '?country=DE&begin=2019-02-04&end=2019-02-06';

new deck.DeckGL({
    container: 'container',
    mapboxApiAccessToken: 'pk.eyJ1Ijoic2hhYXJkaWUiLCJhIjoiY2szbjlicnE0MHVoYzNjdDV2am10aW1lcSJ9.5bevFIGGAqXzH5hZX3EQWQ',
    mapStyle: "mapbox://styles/mapbox/dark-v9",
    longitude: 10,
    latitude: 50,
    zoom: 5,
    pitch: 50,
    layers: [
        new deck.HexagonLayer({
            extruded: true,
            radius: 5000,
            data: API_URL,
            dataTransform: d => d.features,
            elevationScale: 100,
            getColorValue: points => points.reduce((sum, point) => sum + point.properties.carbonmonoxide, 0) / points.length,
            getElevationValue: points => points.reduce((sum, point) => sum + point.properties.carbonmonoxide, 0) / points.length,
            getPosition: d => d.geometry.coordinates,
        }),
    ]
});
</script>
