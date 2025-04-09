// template based on 
// https://www.freecodecamp.org/news/reusable-html-components-how-to-reuse-a-header-and-footer-on-a-website/

const headerroller = document.createElement('template');

headerroller.innerHTML = `
 
    <!-- external css for the roller -->
    <link rel="stylesheet" href="index.css">

    <!-- Adobe fonts link -->
    <link rel="stylesheet" href="https://use.typekit.net/lyk8wbp.css">

  <style>

    :host {
      all: initial;
      display: block;
    }

  </style>

  <header>
      <div class="topnav">

          <div id="DarkPact-header">
              <a rel="nofollow external" referrerpolicy="no-referrer" target="_blank" href="https://www.worldofdarkness.com/dark-pack" title="World of Darkness Dark Pact – Paradox"><img src="assets/darkpack_logo1-small.png" alt="World of Darkness Dark Pact logo" width="30" height="30"></a>
          </div>

          <div>
              <h4 id="title-topnav">Storyteller Dice Roller</h4>
          </div>

          <div>
              <div style=" justify-self:right;">
                  <button type="button" class="topbutton" name="" value="" id="" title="HelpButton" onclick="window.location.href='help.html';">Help</button>

                  <button type="button" class="topbutton" name="" value="" id="AboutButton" title="About" onclick="window.location.href='about.html';">About</button>

                  <button type="button" class="topbutton" id="BackButton" title="Go back" onclick="history.back()">Back</button>

                  <button type="button" class="topbutton" name="" value="" id="HomeButton" title="Home" onclick="window.location.href='index.html';">Home</button>
              </div>
          </div>
      </div>

  </header>

`;

class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadowTopnav = this.attachShadow({ mode: 'closed' });

        shadowTopnav.appendChild(headerroller.content);

    }
}

// repace component-name with name of custom component

customElements.define('header-roller', Header);