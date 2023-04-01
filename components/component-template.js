// template based on 
// https://www.freecodecamp.org/news/reusable-html-components-how-to-reuse-a-header-and-footer-on-a-website/

// REPLACE FOLLOWING WITH UNIQUE IDS
// componentTemplate
// Component and <component></component> [must match]
// component-name [ID of custom component]

const componentTemplate = document.createElement('template');

componentTemplate.innerHTML = `
 
  // style sheet and external libraries
  // links must match links in HTML head on main page
  
  // <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" integrity="sha512-+4zCK9k+qNFUR5X+cKL9EIR+ZOhtIloNl9GIKS57V1MyNsYpYcUrUeQc9vNfzsWfV28IaLL3i96P9sdNyeRssA==" crossorigin="anonymous" />

  // CSS for component
 
  <style>

    // add to prevent CSS from main DOM leaking in

    /*

    :host {
      all: initial; 
      display: block;
    }

    */

  </style>

    // HTML for component

  <component>
  
  
  </component>

`;

class Component extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: 'closed' });

        shadowRoot.appendChild(componentTemplate.content);

    }
}

// repace component-name with name of custom component

customElements.define('component-name', Component);