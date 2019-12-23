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
We request all measured carbon monoxide values from Germany from – let's say – the fourth and fifth of February using the [geo.json](https://api.emissions-api.org/ui/#/default/emissionsapi.web.get_data) API endpoint and the URL query parameters *begin*, *end* and *polygon*:

```
https://api.emissions-api.org/api/v1/geo.json
    ?begin=2019-02-04
    &end=2019-02-06
    &polygon=9.921906365609232,54.983104153048025,9.9395797054529,54.596641954153256,…,9.921906365609232,54.983104153048025
```

We are using the *polygon* url query parameter to receive carbon monoxide values from within the border of Germany.
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
// A polygon describing the vague form of Germany
const GERMANY = 'polygon=9.921906365609232,54.983104153048025,' +
    '9.9395797054529,54.596641954153256,' +
    '10.950112338920519,54.363607082733154,' +
    …
    '8.526229282270208,54.96274363872516,' +
    '9.282048780971136,54.83086538351631,' +
    '9.921906365609232,54.983104153048025';

// API URL
const API_URL = 'https://api.emissions-api.org/api/v1/geo.json?' +
    GERMANY + '&begin=2019-02-04&end=2019-02-06';
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
// A polygon describing the vague form of Germany
const GERMANY = 'polygon=9.921906365609232,54.983104153048025,' +
    '9.9395797054529,54.596641954153256,' +
    '10.950112338920519,54.363607082733154,' +
    '10.939466993868448,54.00869334575258,' +
    '11.956252475643282,54.19648550070116,' +
    '12.518440382546714,54.47037059184799,' +
    '13.647467075259499,54.0755109727059,' +
    '14.119686313542559,53.75702912049103,' +
    '14.353315463934168,53.248171291713106,' +
    '14.074521111719434,52.98126251892535,' +
    '14.4375997250022,52.624850165408304,' +
    '14.685026482815713,52.089947414755216,' +
    '14.607098422919648,51.745188096719964,' +
    '15.016995883858781,51.10667409932171,' +
    '14.570718214586122,51.00233938252438,' +
    '14.307013380600665,51.11726776794137,' +
    '14.056227654688314,50.92691762959435,' +
    '13.338131951560397,50.73323436136428,' +
    '12.96683678554325,50.48407644306917,' +
    '12.240111118222671,50.26633779560723,' +
    '12.415190870827473,49.96912079528062,' +
    '12.521024204161336,49.54741526956275,' +
    '13.031328973043514,49.30706818297324,' +
    '13.595945672264577,48.877171942737164,' +
    '13.243357374737116,48.41611481382903,' +
    '12.884102817443873,48.28914581968786,' +
    '13.025851271220517,47.63758352313595,' +
    '12.932626987366064,47.467645575544,' +
    '12.620759718484521,47.672387600284424,' +
    '12.141357456112871,47.70308340106578,' +
    '11.426414015354851,47.52376618101306,' +
    '10.544504021861597,47.5663992376538,' +
    '10.402083774465325,47.30248769793916,' +
    '9.896068149463188,47.580196845075704,' +
    '9.594226108446376,47.5250580918202,' +
    '8.522611932009795,47.83082754169135,' +
    '8.317301466514095,47.61357982033627,' +
    '7.466759067422288,47.62058197691192,' +
    '7.593676385131062,48.33301911070373,' +
    '8.099278598674855,49.01778351500343,' +
    '6.658229607783709,49.20195831969164,' +
    '6.186320428094177,49.463802802114515,' +
    '6.242751092156993,49.90222565367873,' +
    '6.043073357781111,50.128051662794235,' +
    '6.156658155958779,50.80372101501058,' +
    '5.988658074577813,51.851615709025054,' +
    '6.589396599970826,51.852029120483394,' +
    '6.842869500362383,52.22844025329755,' +
    '7.092053256873896,53.14404328064489,' +
    '6.905139601274129,53.48216217713064,' +
    '7.100424838905268,53.69393219666267,' +
    '7.936239454793962,53.74829580343379,' +
    '8.121706170289485,53.52779246684429,' +
    '8.800734490604668,54.020785630908904,' +
    '8.572117954145368,54.39564647075405,' +
    '8.526229282270208,54.96274363872516,' +
    '9.282048780971136,54.83086538351631,' +
    '9.921906365609232,54.983104153048025';

// API URL
const API_URL = 'https://api.emissions-api.org/api/v1/geo.json?' +
    GERMANY + '&begin=2019-02-04&end=2019-02-06';

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
// A polygon describing the vague form of Germany
const GERMANY = 'polygon=9.921906365609232,54.983104153048025,' +
    '9.9395797054529,54.596641954153256,' +
    '10.950112338920519,54.363607082733154,' +
    '10.939466993868448,54.00869334575258,' +
    '11.956252475643282,54.19648550070116,' +
    '12.518440382546714,54.47037059184799,' +
    '13.647467075259499,54.0755109727059,' +
    '14.119686313542559,53.75702912049103,' +
    '14.353315463934168,53.248171291713106,' +
    '14.074521111719434,52.98126251892535,' +
    '14.4375997250022,52.624850165408304,' +
    '14.685026482815713,52.089947414755216,' +
    '14.607098422919648,51.745188096719964,' +
    '15.016995883858781,51.10667409932171,' +
    '14.570718214586122,51.00233938252438,' +
    '14.307013380600665,51.11726776794137,' +
    '14.056227654688314,50.92691762959435,' +
    '13.338131951560397,50.73323436136428,' +
    '12.96683678554325,50.48407644306917,' +
    '12.240111118222671,50.26633779560723,' +
    '12.415190870827473,49.96912079528062,' +
    '12.521024204161336,49.54741526956275,' +
    '13.031328973043514,49.30706818297324,' +
    '13.595945672264577,48.877171942737164,' +
    '13.243357374737116,48.41611481382903,' +
    '12.884102817443873,48.28914581968786,' +
    '13.025851271220517,47.63758352313595,' +
    '12.932626987366064,47.467645575544,' +
    '12.620759718484521,47.672387600284424,' +
    '12.141357456112871,47.70308340106578,' +
    '11.426414015354851,47.52376618101306,' +
    '10.544504021861597,47.5663992376538,' +
    '10.402083774465325,47.30248769793916,' +
    '9.896068149463188,47.580196845075704,' +
    '9.594226108446376,47.5250580918202,' +
    '8.522611932009795,47.83082754169135,' +
    '8.317301466514095,47.61357982033627,' +
    '7.466759067422288,47.62058197691192,' +
    '7.593676385131062,48.33301911070373,' +
    '8.099278598674855,49.01778351500343,' +
    '6.658229607783709,49.20195831969164,' +
    '6.186320428094177,49.463802802114515,' +
    '6.242751092156993,49.90222565367873,' +
    '6.043073357781111,50.128051662794235,' +
    '6.156658155958779,50.80372101501058,' +
    '5.988658074577813,51.851615709025054,' +
    '6.589396599970826,51.852029120483394,' +
    '6.842869500362383,52.22844025329755,' +
    '7.092053256873896,53.14404328064489,' +
    '6.905139601274129,53.48216217713064,' +
    '7.100424838905268,53.69393219666267,' +
    '7.936239454793962,53.74829580343379,' +
    '8.121706170289485,53.52779246684429,' +
    '8.800734490604668,54.020785630908904,' +
    '8.572117954145368,54.39564647075405,' +
    '8.526229282270208,54.96274363872516,' +
    '9.282048780971136,54.83086538351631,' +
    '9.921906365609232,54.983104153048025';

// API URL
const API_URL = 'https://api.emissions-api.org/api/v1/geo.json?' +
    GERMANY + '&begin=2019-02-04&end=2019-02-06';

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
