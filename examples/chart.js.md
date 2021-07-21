Plotting a Country's Daily Average CO-Value
===========================================

In this example, we will be using the
[Average API V2](https://api.v2.emissions-api.org/ui/#/default/emissionsapi.web.get_average)
to request data for a given country,
then we will plot this data using [Chart.js](https://chartjs.org).
The result should look somewhat like this:


<canvas id="average-example"></canvas>


Average Data
------------

First, let's take a look at the data.
For this, we [request the average carbon monoxide data of Germany for February 2019
](https://api.v2.emissions-api.org/api/v2/carbonmonoxide/average.json?country=DE&begin=2019-02-01&end=2019-03-01)
using the parameters *begin*, *end* and *country*.

```
https://api.v2.emissions-api.org/api/v2/carbonmonoxide/average.json
    ?country=DE
    &begin=2019-02-01
    &end=2019-03-01
```

Note that *country* is just a convenient way of specifying a geographic bounding box for a specific country,
and we could also specify a polygon manually.
Further, note that we specify March 1st as end date
since *end* represents the first date not being included in the resulting data.

The response should look like this:

```json
[
  {
    "average": 0.0330089744766232,
    "end": "2019-02-01T14:17:51.014000Z",
    "start": "2019-02-01T12:34:43.435000Z"
  },
  {
    "average": 0.032249495510353,
    "end": "2019-02-02T13:58:41.698000Z",
    "start": "2019-02-02T12:15:55.960000Z"
  },
  …
]
```

What we get is a response in JSON format,
listing the average value of carbon monoxide particles per square meter
in the specified area.

We also get the time of the first and last measurement made on each day in that area telling us during what time of day the measurements where taken.
But we can mostly ignore the specific time for our use-case.


Requesting Data
---------------

We now know what data to expect and what we might be able to do using this.
The next step is to request this data via JavaScript.

For this, we first specify the URL we want to request:

```js
const api_url = 'https://api.v2.emissions-api.org'
        + '/api/v2/carbonmonoxide/average.json'
        + '?country=DE&begin=2019-02-01&end=2019-03-01'
```

Then, we use the [JavaScript Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to request the data.
For plotting, we can map the average values of the response objects to a simple list of floats:

```js
fetch(API_URL)
.then(response => response.json())
.then(data => {
    let values = data.map(x => x.average);
    console.log(values);
    // logs:
    // (28) [0.0330089744766232, 0.032249495510353, 0.0360124611289537, …
})
```

In addition to the carbon monoxide values, we can use the same data to also prepare labels for our chart.
For that, we use the start value, cutting out only the day:

```js
let labels = data.map(x => x.start.substring(8, 10)),
console.log(labels);
// logs:
// (28) ["01", "02", "03", "04", …
```

This should be all the data preparation we need.


Plotting Data
-------------

Before we start plotting, we need to load Chart.js and define an HTML-canvas used for plotting.
Here we use the [jsdeliver](https://jsdelivr.com/package/npm/chart.js?path=dist) CDN to get the library:

```html
<canvas id="average-example"></canvas>
<script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.2/dist/Chart.min.js">
</script>
```

We can now create a simple bar-chart with just a few lines of code.
Here we supply the chart with both data and labels simply by using a fixed array of values.
This is where our requested data will be used later.

```js
let ctx = document.getElementById('average-example').getContext('2d');
new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['a', 'b', 'c'],
        datasets: [{
            label: 'some values',
            backgroundColor: '#93bd20',
            data: [1, 3, 4]
        }]
    }
});
```

Running this will already render an interactive chart with the given data.
Nevertheless, you might want to do some additional configuration.
For a complete list of all configuration options, take a look at the [Chart.js documentation](https://chartjs.org/docs).
Here, we just add axes labels and make the y-axes start at zero:


```js
new Chart(ctx, {
    // …
    options: {
        scales: {
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'carbon monoxide [mol/m²]'
                },
                ticks: {
                    beginAtZero: true
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'day'
                }
            }]
        }
    }
});
```


Bringing It All Together
------------------------

Finally, let's take all the parts and bring them together.
For this, we can just copy most of the code we already have.

The basic idea now is to:

1. Request carbon monoxide data from the API using the JavaScript `fetch()` method
   and preparing values and labels as a single list each.
2. Create a chart and use these lists as data source for the chart.


The resulting code should look somewhat like this:

```js
const api_url = 'https://api.v2.emissions-api.org'
        + '/api/v2/carbonmonoxide/average.json'
        + '?country=DE&begin=2019-02-01&end=2019-03-01'
window.onload = function () {
    fetch(api_url)
    .then(response => response.json())
    .then(data => {
        let ctx = document.getElementById('average-example').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                // use start times contained in the requested data as labels
                labels: data.map(x => x.start.substring(8, 10)),
                datasets: [{
                    label: 'Germany',
                    backgroundColor: '#93bd20',
                    // use the average values as data
                    data: data.map(x => x.average),
                }]
            },

            // add a few sensible configuration options
            options: {
                scales: {
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'carbon monoxide [mol/m²]'
                        },
                        ticks: {
                            beginAtZero: true
                        }
                    }],
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'day'
                        }
                    }]
                }
            }
        });
    })
}
```

That's it!



<script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.2/dist/Chart.min.js"></script>
<script>
const api_url = 'https://api.v2.emissions-api.org'
        + '/api/v2/carbonmonoxide/average.json'
        + '?country=DE&begin=2019-02-01&end=2019-03-01'
window.onload = function () {
    fetch(api_url)
    .then(response => response.json())
    .then(data => {
        let ctx = document.getElementById('average-example').getContext('2d');
        new Chart(ctx, {
            // The type of chart we want to create
            type: 'bar',

            // The data for our dataset
            data: {
                labels: data.map(x => x.start.substring(8, 10)),
                datasets: [{
                    label: 'Germany',
                    backgroundColor: '#93bd20',
                    data: data.map(x => x.average),
                }]
            },

            // Configuration options go here
            options: {
                scales: {
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'carbon monoxide [mol/m²]'
                        },
                        ticks: {
                            beginAtZero: true
                        }
                    }],
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'day'
                        }
                    }]
                }
            }
        });
    })
}
</script>
