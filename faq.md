# FAQ

**What is Emissions API?**  
Like the project slogan suggests, Emissions API is an API (application programming interface) with it you get easy access to satellite-based emissions data.  
With the [swaggerUI](https://demo.emissions-api.org/ui/) you can get a first feel for the data and submit test requests to our database (not all data imported yet from ESA-Database) and take a look on the data set.
Furthermore it is possible to set up your own database where you can download data from the ESA of your concern.

**What does Emissions API consist of?**  
The Emissions API consists of several projects that are all available on [github](https://github.com/emissions-api):
 - The [sentinel5dl](https://github.com/emissions-api/sentinel5dl) project downloads data from the ESA and stores these .nc files to your hard drive.
 - The [sentinel5algorithm](https://github.com/emissions-api/sentinel5algorithms) project pre processes the downloaded .nc files.
 - The [emissions-api](https://github.com/emissions-api/emissions-api) project uses the sentinel5dl and sentinel5algorithm and puts the data into a database and serves it via an api.

**What is the source of the data?**  
The data source is the [European Space Agency (ESA)](https://www.esa.int) satallite [Sentinel-5P](https://www.esa.int/Applications/Observing_the_Earth/Copernicus/Sentinel-5P).

**How can I participate?**  
This is an open source project hosted on github. This means everybody can bring input and help improving the project, by e.g.:
- using the API (tag the project) and create awesome use cases by visualizating the data
- forking the porject and working on issues
- collaborate on the documentation
- creating issues with new ideas
For more information about how to contribute see [here](https://github.com/emissions-api/emissions-api/blob/master/CONTRIBUTING.rst).

**How to get in contact with emissions API?**  
 Via [e-mail](mailto:info@emissions-api.org), [twitter](https://twitter.com/emissions_api), [mastodon](https://mastodon.social/@emissions_api) or by leaving a comment e.g. on an issue.

**Do I need a database on my own?**  
You can use the emissions API database by using the [project API](https://demo.emissions-api.org/ui/) and use the data for your own purpose.
Or you can set up your own [database server](https://github.com/emissions-api/emissions-api/blob/master/README.rst).

**What is the database needed for?**  
The database is used to store and serve the pre-prcessed data for [further usage](https://github.com/emissions-api/project-notes/tree/master/user-stories).

**How can I set up my own database?**  
If you want to set up your own database, you can do it by following the [project description](https://github.com/emissions-api/emissions-api/blob/master/README.rst).
