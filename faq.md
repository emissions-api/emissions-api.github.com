<h2>FAQ</h2>

<details>
<summary><h3> > What is Emissions API?</h3></summary>
Like the project slogan suggests, Emissions API is an API (application programming interface) with it you get easy access to satellite-based emissions data.<br>
With the <a href="https://api.emissions-api.org/ui/">swaggerUI</a> you can get a first feel for the data and submit test requests to our database and take a look on the data set.<br>
Furthermore it is possible to set up your own database where you can download data from the ESA of your concern.<br>
<br></details>

<details>
<summary><h3> > What does Emissions API consist of?</h3></summary>
The Emissions API consists of several projects that are all available on <a href="https://github.com/emissions-api">github</a>:
<ul>
  <li>The <a href="https://github.com/emissions-api/sentinel5dl">sentinel5dl</a> project downloads data from the ESA and stores these .nc files to your hard drive.</li>
  <li>The <a href="https://github.com/emissions-api/sentinel5algorithms">sentinel5algorithm</a> project pre processes the downloaded .nc files.</li>
  <li>The <a href="https://github.com/emissions-api/emissions-api">emissions-api</a> project uses the sentinel5dl and sentinel5algorithm and puts the data into a database and serves it via an api.</li>
</ul>
<br></details>

<details>
<summary><h3> > What is the source of the data?</h3></summary>
The data source is the <a href="https://www.esa.int">European Space Agency (ESA)</a> satellite <a href="https://www.esa.int/Applications/Observing_the_Earth/Copernicus/Sentinel-5P">Sentinel-5P</a>.<br>
<br></details>

<details>
<summary><h3> > What is a product?</h3></summary>
The satellite Sentinel-5 monitors different gas concentrations and aerosols in the atmosphere. Those different gases are called products.<br>
<br></details>

<details>
<summary><h3> > Which products overall available via ESA?</h3></summary>
Sentinel-5 level-2 products are:
<ul>
  <li>Ozone (O3)</li>
  <li>Nitrogen dioxide (NO2)</li>
  <li>Sulfur dioxide (SO2)</li>
  <li>Formaldehyde (HCHO)</li>
  <li>Glyoxal (CHOCHO)</li>
  <li>Methane (CH4)</li>
  <li>Carbon monoxide (CO)</li>
  <li>Cloud effective fraction</li>
  <li>Aerosol UV apsorption index</li>
  <li>Surface effective albedo</li>
  <li>UV spectrally resolved irradiance at surface</li>
</ul>
<br></details>

<details>
<summary><h3> > Which products can be processed via this API?</h3></summary>
...<br>
<br></details>

<details>
<summary><h3> > Over which time of period are the data available?</h3></summary>
The life-time of that satellite is 7.5 years. A successor satellite is planned.<br>
<br></details>

<details>
<summary><h3> > Which products over what time are availabe via Emissions API?</h3></summary>
We started with one product (CO) and imported from january til september 2019. But we are continuously working on importing more products over a longer period.<br>
<br></details>

<details>
<summary><h3> > How can I participate?</h3></summary>
This is an open source project hosted on github. This means everybody can bring input and help improving the project, by e.g.:
<ul>
  <li>using the API (tag the project) and create awesome use cases by visualizing the data</li>
  <li>forking the project and working on issues</li>
  <li>collaborate on the documentation</li>
  <li>creating issues with new ideas</li>
</ul>
For more information about how to contribute see <a href="https://github.com/emissions-api/emissions-api/blob/master/CONTRIBUTING.rst">here</a>.<br>
<br></details>

<details>
<summary><h3> > How to get in contact with emissions API?</h3></summary>
 Via <a href="mailto:info@emissions-api.org">info@emissions-api.org</a>, <a href="https://twitter.com/emissions_api">twitter</a>, <a href="https://mastodon.social/@emissions_api">mastodon</a> or by leaving a comment e.g. on an issue.<br>
 <br></details>

<details>
<summary><h3> > Do I need a database on my own?</h3></summary>
You can use the emissions API database by using the <a href="https://api.emissions-api.org/ui/">project API</a> and use the data for your own purpose.
Or you can set up your own <a href="https://github.com/emissions-api/emissions-api/blob/master/README.rst">database server</a>.<br>
<br></details>

<details>
<summary><h3> > What is the database needed for?</h3></summary>
The database is used to store and serve the pre-processed data for <a href="https://github.com/emissions-api/project-notes/tree/master/user-stories">further usage</a>.<br>
<br></details>

<details>
<summary><h3> > How can I set up my own database?</h3></summary>
If you want to set up your own database, you can do it by following the <a href="https://github.com/emissions-api/emissions-api/blob/master/README.rst">project description</a>.<br>
<br></details>