// https://www.freecodecamp.org/news/reusable-html-components-how-to-reuse-a-header-and-footer-on-a-website/

const template = document.createElement('template');

template.innerHTML = `
  <h1>Hello, World!</h1>
  <p>And all who inhabit it</p>
  <p>And some other ones too</p>
`;

document.body.appendChild(template.content);
