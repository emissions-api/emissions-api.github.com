Carbon Monoxide Highscore of Cities
===================================

In this example, we will be using the
[Statistics API](https://api.emissions-api.org/ui/#/default/emissionsapi.web.get_statistics)
to request a daily average for a number of cities which we will then put on a highscore
based on their carbon monoxide measurements.

<center>
<table id="highscore" style="max-width: 400px;">
<tr style="font-weight: 800;">
<td>City</td>
<td>Carbon Monoxide
<sup style="cursor: help;"
title="Average value of carbon monoxide particles per square meter
in a horizontal column between sattelite and ground">[mol/m²]</sup></td>
</tr>
<tr id="loading"><td><i>loading…</i></td><td></td></tr>
</table>
</center>

This is the finished highscore for a few cities on Feb 01, 2019, listing them in descending order (city with least carbon monoxide first)
along with the average value of carbon monoxide particles per square meter in the specified area.


Statistical Data
----------------

First, let's take a look at the data we want to use.
For this, we [request the statistical carbon monoxide data of a specific day and location
](https://api.emissions-api.org/api/v1/statistics.json?interval=day&begin=2019-02-01&end=2019-02-02&point=13.4050,52.5200)
using the parameters *begin*, *end*, *interval* and *point*.

```
https://api.emissions-api.org/api/v1/statistics.json
    ?interval=day
    &begin=2019-02-01
    &end=2019-02-02
    &point=13.4050,52.5200
```

Here we request the daily statistical values for Feb 01, 2019 for a specific location.
Feb 02, 2019 is specified as end date since the end date is non-inclusive,
meaning that this actually specified the first point in time which will not be considered for this request.
The location we specified asks for results in approximately 22km radius around the point.
This is an easy way of getting data for and around a specific location like a city.

The response should look like this:

```json
[
  {
    "time": {
      "interval_start": "2019-02-01T00:00:00Z",
      "max": "2019-02-01T11:36:02.274000Z",
      "min": "2019-02-01T11:35:56.874000Z"
    },
    "value": {
      "average": 0.032417881116271,
      "count": 10,
      "max": 0.03433907777071,
      "min": 0.0306992959231138,
      "standard deviation": 0.00105975037840409
    }
  }
]
```

For this specific example, we are only interested in the average value.


Requesting Data
---------------

We now know what data to expect.
The next step is to request this data via JavaScript.

For this, we first specify the URL we want to request as combination of a base-URL and the coordinates for a city.
After all, we want to specify multiple cities in the end.

```js
const berlin = '13.4050,52.5200',
      baseurl = 'https://api.emissions-api.org/api/v1/statistics.json'
        + '?interval=day&begin=2019-02-01&end=2019-02-02&point=';
```

Then, we use the [JavaScript Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to request the data.

```js
fetch(baseurl + berlin).then(response => response.json());
```

This will give us only the data for a single location.
But we want to request data for multiple cities.
For that we build a list of all URLs we want to request and then combine all those requests:


```js
const baseurl = …
      berlin = '13.4050,52.5200',
      newyork = '74.0060,40.7128',
      urls = [berlin, newyork, …].map(city => baseurl + city),

Promise.all(
  urls.map(url => fetch(url).then(response => response.json()))
).then(responses => {
  console.log(responses)
}
```


Building a Highscore Table
--------------------------

Now that we got all the data we need, we just need to sort it according to the carbon monoxide values
and put it into a highscore table. For this, we start by adding a simple HTML table we can then add content to:

```html
<table id="highscore"></table>
```

To be able to easily reference this table, we next get and store this HTML node:

```js
const table = document.getElementById('highscore');
```

Finally, we add the responses into an array, sort them and create a new table row for each result:

```js
Promise.all(
  urls.map(url => fetch(url).then(response => response.json()))
).then(responses => {
  [
    [responses[0][0].value.average, 'Berlin'],
    [responses[1][0].value.average, 'New York'],
    [responses[2][0].value.average, 'Beijing'],
    [responses[3][0].value.average, 'Tokyo']
  ].sort().forEach(city => {
    var tr = document.createElement('tr'),
        td_l = document.createElement('td'),
        td_r = document.createElement('td');
    td_l.innerText = city[1];
    td_r.innerText = city[0].toFixed(4);
    tr.appendChild(td_l);
    tr.appendChild(td_r);
    table.appendChild(tr);
  });
});
```

This will fill the table with cities and their carbon monoxide data.

Depending on the amount of cities to request, it might make sense to not hard-code all the results based on a fixed list of cities
and you would certainly want to add error handling.
Still, this already gives you a fully functional highscore you can now expand for your purposes.


<script>

const baseurl = 'https://api.emissions-api.org/api/v1/statistics.json?interval=day&begin=2019-02-01&end=2019-02-02&point=',
      berlin = '13.4050,52.5200',
      newyork = '74.0060,40.7128',
      beijing = '116.4074,39.9042',
      tokyo = '139.6503,35.6762',
      urls = [berlin, newyork, beijing, tokyo].map(city => baseurl + city),
      table = document.getElementById('highscore'),
      loading = document.getElementById('loading');

Promise.all(
  urls.map(url => fetch(url).then(response => response.json()))
).then(responses => {
  [
    [responses[0][0].value.average, 'Berlin'],
    [responses[1][0].value.average, 'New York'],
    [responses[2][0].value.average, 'Beijing'],
    [responses[3][0].value.average, 'Tokyo']
  ].sort().forEach(city => {
    var tr = document.createElement('tr'),
       td_l = document.createElement('td'),
       td_r = document.createElement('td');
    td_l.innerText = city[1];
    td_r.innerText = city[0].toFixed(4);
    tr.appendChild(td_l);
    tr.appendChild(td_r);
    table.appendChild(tr);
  });
  loading.remove();
});

</script>
