document.addEventListener("DOMContentLoaded", () => {
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
});
