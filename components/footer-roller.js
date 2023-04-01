// template based on 
// https://www.freecodecamp.org/news/reusable-html-components-how-to-reuse-a-header-and-footer-on-a-website/

const footerroller = document.createElement('template');

footerroller.innerHTML = `
 
    <!-- external css for the roller -->
    <link rel="stylesheet" href="index.css">
    <link rel="stylesheet" href="WtA20-roller.css">
    <link rel="stylesheet" href="WtA20-roller-small-screen.css" media="only screen and (max-width: 1300px)">

    <!-- Adobe fonts link -->
    <link rel="stylesheet" href="https://use.typekit.net/lyk8wbp.css">

  <style>

    :host {
      all: initial;
      display: block;
    }

  </style>

  <footer>

    <div class="flex footer" style="justify-content:space-between;align-content:center;">
        <div>
            <p style="margin-left:10px;"><a href="legal.html" style="text-decoration: none;">Copyright © 2023 Richard Cosgrove</a></p>
        </div>

        <div>
          <a style="margin-right:15px;" rel="nofollow external" referrerpolicy="no-referrer" target="_blank" href="https://www.worldofdarkness.com/dark-pack" title="World of Darkness Dark Pact – Paradox"><img class="insert-pic" src="assets/darkpack_logo1-small.png" alt="World of Darkness Dark Pact logo" width="40" height="40"></a>
        </div>
      </div>

  </footer>

`;

class Footer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadowFooter = this.attachShadow({ mode: 'closed' });

        shadowFooter.appendChild(footerroller.content);

    }
}

// repace component-name with name of custom component

customElements.define('footer-roller', Footer);