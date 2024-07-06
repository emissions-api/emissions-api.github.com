> End of Life
> -----------
>
> tl;dr: This service will shut down in July 2024.
>
> We started in 2019 with halve a year of financial support but a goal of
> having the service run for at least two years. We far exceeded that goal.
> This was possible due to Osnabrück University supporting us with
> infrastructure to run Emissions API. Thank you!. Unfortunately, the ESA
> changed their satellite data API which would need another major development
> effort. At the same time, we would need to migrate the our infrastructure due
> to the current size of data we accumulated over the years. This isn't
> something we can handle with a few volunteers. We already far exceeded our
> expectations when it comes to supporting this project, therefor we decided to
> “let it be” and shut down the operation in July 2024. The infrastructure is
> still available on GitHub for anyone wanting to run this on their own. It was
> a good time. We had fun developing and running this. But all good things need
> to come to an end. Goodbye.

---

<center style="padding-bottom: 25px;">
<table id="statistics">
  <tr style="font-weight: 800;">
    <td>Product</td>
    <td>First Data</td>
    <td>Latest Data</td>
  </tr>
  <tr id="loading"><td><i>loading…</i></td><td></td></tr>
</table>

<!--
<a class="button" href="examples.html">
  <i class="fas fa-book"></i> Try our examples</a>
-->

</center>


> The European Space Agency's Sentinel-5P satellite is built to
> monitor air quality data (carbon hydroxide, sulfur monoxide, ozone, …). All data
> gathered are publicly available …if you know what to do with those data sets – great.
> But if not:
>
> Emissions API's mission is to provide easy access to this data without the
> need of being an expert in satellite data analysis and without having to
> process terabytes of data yourself.
>
> This way, we hope to empower others to easily build apps that use this data –
> e.g. visually showing emissions of countries over time.


Our Goals
---------

Achievements of climate goals are so far only verifiable by a very small group
of people with specialized know-how. As a result, public discussion remains
abstract and elusive for many people. Easy access to emissions data provides a
more general audience with the opportunity to form a fact-based opinion. For example,
one could evaluate the effectiveness of environmental regulations – such as
diesel driving bans in inner cities or new sulfur limits in shipping – by
comparing actual measurements from before and after on a map.

Emissions API is a solution that provides simple access to emissions data of
climate-relevant gases. For this purpose, data of the European Space Agency's
Sentinel-5P earth observation satellite will be prepared in such a way that it
allows programmers easy access without the need to have a scientific background
in the field.

The project strives to create an application interface which lowers the barrier
to use the data for visualization and/or analysis.


Our Approach
------------

The project's core is an API which can be used to query the processed data.
For this purpose we develop a cloud service which queries the freely
accessible data of Sentinel-5P, aggregates it, stores it in a cache and makes
it available.


Who is the API for?
-------------------

This project targets developers who want to build their own services based on
the satellite data of the Copernicus program, but who do not want to work with
huge amounts of scientific data directly. We will provide examples and
libraries to quickly get you started without having to become an expert in
satellite data analysis yourself.

Media
-----

 - [Short introductory talk held at 36C3](https://media.ccc.de/v/36c3-10525-lightning_talks_day_3#t=1146)
 - [Talk with a little bit of backstory about the project held at FOSDEM 2020](https://fosdem.org/2020/schedule/event/emissions_api/)
 - [FLOSS Weekly podcast episode 555: Emissions API](https://twit.tv/shows/floss-weekly/episodes/555)



<script>

const base_url = 'https://api.v2.emissions-api.org/api/v2/',
      products_url = base_url + 'products.json',
      data_range_postfix = '/data-range.json',
      table = document.getElementById('statistics'),
      loading = document.getElementById('loading');

fetch(products_url)
.then(r => r.json())
.then(response => {
  var products = response.map(p => p.name),
      urls = products.map(p => base_url + p + data_range_postfix);

  Promise.all(
    urls.map(url => fetch(url).then(response => response.json()))
  ).then(responses => {
    responses.map((range, i) => {
      var tr = document.createElement('tr');
      [
        products[i],
        new Date(range.first).toDateString(),
        new Date(range.last).toDateString()
      ].forEach(txt => {
        td = document.createElement('td');
        td.innerText = txt;
        tr.appendChild(td);
      })
      table.appendChild(tr);
      loading.remove();
    })
  })
})
</script>
