> **tl;dr** The European Space Agency's Sentinel-5P satellite is built to
> monitor air quality data (carbon hydroxide, sulfur monoxide, ozone, …). All data
> gathered are publicly available …if you know what to do with those data sets,
> great, but if not:
>
> Emissions API's mission is to provide easy access to this data without the
> need of being an expert in satellite data analysis and without having to
> process terabytes of data.
>
> This way, we hope to empower others to easily build apps that use this data –
> e.g. visually showing emissions of countries over time.


Social challenge we want to address
-----------------------------------

Achievements of climate goals are so far only verifiable for a very small group
of people with specialized know-how. As a result, public discussion remains
abstract and elusive for many people. Easy access to emissions data provides a
more general audience with the opportunity to form a fact-based opinion. For example,
one could evaluate the effectiveness of environmental regulations – such as
diesel driving bans in inner cities or new sulfur limits in shipping–by
comparing actual measurements from before and after on a map.

Emissions API is a solution that provides simple access to emissions data of
climate-relevant gases. For this purpose, data of the European Space Agency's
Sentinel-5P earth observation satellite will be prepared in such a way that it
allows programmers easy access without the need to have a scientific background
in the field.

The project strives to create an application interface which lowers the barrier
to use the data for visualization and/or analysis.


Tackling the problem
--------------------

The project's core is an API, which can be used to query the processed data.
For this purpose, we develop a cloud service which queries the freely
accessible data of Sentinel-5P, aggregates it, stores it in a cache and makes
it available.


Target audience
---------------

This project targets developers who want to build their own services based on
the satellite data of the Copernicus program, but who do not want to work with
huge amounts of scientific data directly. We will provide examples and
libraries to quickly get you started without being an expert in satellite data
analysis.

Publications
------------

 - [FLOSS Weekly podcast episode 555: Emissions API](https://twit.tv/shows/floss-weekly/episodes/555)
