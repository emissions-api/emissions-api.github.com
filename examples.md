Examples
========

There are various ways of working with the satellite based emissions data we provide.
Here are some of our ideas.

<example
  name="Plotting a Country's Daily Average CO-Values"
  img="/assets/img/chart.js.png"
  href="examples/chart.js" ></example>

<example
  name="Plotting Carbon Monoxide Concentrations on a Map using deck.gl"
  img="/assets/img/deck.gl.png"
  href="examples/deck.gl" ></example>



<script>
let examples = document.getElementsByTagName('example');
for (let i = 0; i < examples.length; i++) {
  let link = document.createElement('a'),
      header = document.createElement('h2'),
      image = document.createElement('img');
  link.setAttribute('href', examples[i].getAttribute('href'));
  link.setAttribute('class', 'example');
  image.setAttribute('src', examples[i].getAttribute('img'));
  header.innerText = examples[i].getAttribute('name');
  link.appendChild(header);
  link.appendChild(image);
  examples[i].appendChild(link);
}
</script>
<style>
.example {
  display: block;
  margin: 65px auto;
}
</style>
