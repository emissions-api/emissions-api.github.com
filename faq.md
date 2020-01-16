<h2>FAQ</h2>

<details>
<summary><h3> > What is Emissions API?</h3></summary>
  <div style="margin-left: 20px;">
    Emissions API (application programming interface) is a service like the project slogan (easy access to satellite-based emissions data) suggest. With the <a href="https://api.emissions-api.org/ui/">swaggerUI</a> you can get a feeling for the data and submit test requests.<br>
  </div>
<br></details>

<details>
<summary><h3> > What does Emissions API consist of?</h3></summary>
  <div style="margin-left: 20px;">
    The Emissions API consists of several projects that are all available on <a href="https://github.com/emissions-api">github</a>:
    <ul>
      <li>The <a href="https://github.com/emissions-api/sentinel5dl">sentinel5dl</a> project downloads data from the ESA and stores these .nc files to your hard drive.</li>
      <li>The <a href="https://github.com/emissions-api/sentinel5algorithms">sentinel5algorithm</a> project pre processes the downloaded .nc files.</li>
      <li>The <a href="https://github.com/emissions-api/emissions-api">emissions-api</a> project uses the sentinel5dl and sentinel5algorithm and puts the data into a database and serves it via an API.</li>
    </ul>
  </div>
<br></details>

<details>
<summary><h3> > What is the source of the data?</h3></summary>
  <div style="margin-left: 20px;">
    The data source is the <a href="https://www.esa.int">European Space Agency (ESA)</a> satellite <a href="https://www.esa.int/Applications/Observing_the_Earth/Copernicus/Sentinel-5P">Sentinel-5P </a>.<br>
  </div>
<br></details>

<details>
<summary><h3> > What is a product?</h3></summary>
  <div style="margin-left: 20px;">
    The satellite Sentinel-5P monitors different gas concentrations and aerosols in the atmosphere. Those different substances are called products.<br>
  </div>
<br></details>

<details>
<summary><h3> > Which products overall available via ESA?</h3></summary>
  <div style="margin-left: 20px;">
    We are focused on Sentinel-5 level-2 products:
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
  </div>
  But the ESA have <a href="https://sentinel.esa.int/web/sentinel/missions/sentinel-5/data-products">more</a>.<br>
<br></details>

<details>
<summary><h3> > Which products can be processed via this API?</h3></summary>
  <div style="margin-left: 20px;">
    Currently only carbon monoxide (CO).<br>
  </div>
<br></details>

<details>
<summary><h3> > Over which time of period are the data available?</h3></summary>
  <div style="margin-left: 20px;">
    The life-time of that satellite is 7.5 years. A successor satellite is planned.<br>
  </div>
<br></details>

<details>
<summary><h3> > Which products over, what time are availabe via Emissions API?</h3></summary>
  <div style="margin-left: 20px;">
    We started with one product (CO) and imported from january til september 2019. But we are constantly working on importing more products over a longer period.<br>
  </div>
<br></details>

<details>
<summary><h3> > How can I participate?</h3></summary>
  <div style="margin-left: 20px;">
    This is an open source project hosted on github. This means everybody can bring input and help improving the project, by e.g.:
    <ul>
      <li>using the API (tag the project) and create awesome use cases by visualizing the data</li>
      <li>forking the project and working on issues</li>
      <li>collaborate on the documentation</li>
      <li>creating issues with new ideas</li>
    </ul>
    For more information about how to contribute see <a href="https://github.com/emissions-api/emissions-api/blob/master/CONTRIBUTING.rst">here</a>.<br>
  </div>
<br></details>

<details>
<summary><h3> > How to get in contact with emissions API?</h3></summary>
  <div style="margin-left: 20px;">
    Via <a href="mailto:info@emissions-api.org">info@emissions-api.org</a>, <a href="https://twitter.com/emissions_api">twitter</a>, <a href="https://mastodon.social/@emissions_api">mastodon</a> or by leaving a comment e.g. on an issue.<br>
  </div>
 <br></details>

<details>
<summary><h3> > Do I need a database on my own?</h3></summary>
  <div style="margin-left: 20px;">
    No, because you can use the emissions API database by using the <a href="https://api.emissions-api.org/ui/">project API</a> and use the resulting data for your own purpose.<br>But if you would like to set up your own database server click <a href="https://github.com/emissions-api/emissions-api/blob/master/README.rst">here</a>.<br>
  </div>
<br></details>

<details>
<summary><h3> > What is the database needed for?</h3></summary>
  <div style="margin-left: 20px;">
    The database is used to store and serve the pre-processed data for <a href="https://github.com/emissions-api/project-notes/tree/master/user-stories">further usage</a> via the emissons API.<br>
  </div>
<br></details>