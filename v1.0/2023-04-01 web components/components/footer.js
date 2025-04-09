class Footer extends HTMLElement {
  constructor() {
    super();
  }
}

  connectedCallback() {
    footer.innerHTML = `
    <footer>
    <div class="footer">
        <div style="float:left;margin-left:5px;margin-top:5px;">
            <p>Copyright © 2023 Richard Cosgrove</p>
        </div>
        <div style="float:left;margin-left:50px;transform: translateY(15px);">
            <a href="legal.html">Legal notices</a>
        </div>
        <div style="float:right;margin:10px;transform: translateY(-5px);">
            <img class="insert-pic" src="assets/darkpack_logo1-small.png" alt="World of Darkness Dark Pact logo" width="40px" height="40px">
        </div>
                <div style="float:right;margin:10px;transform: translateY(5px);">
            <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/80x15.png" /></a>
        </div>
    </div>
    </footer>
    `;
  }

customElements.define("footer-component", Footer);


/*
const footer = document.createElement("footer");

footer.innerHTML = `
    <div class="footer">
        <div style="float:left;margin-left:5px;margin-top:5px;">
            <p>Copyright © 2023 Richard Cosgrove</p>
        </div>
        <div style="float:left;margin-left:50px;transform: translateY(15px);">
            <a href="legal.html">Legal notices</a>
        </div>
        <div style="float:right;margin:10px;transform: translateY(-5px);">
            <img class="insert-pic" src="assets/darkpack_logo1-small.png" alt="World of Darkness Dark Pact logo" width="40px" height="40px">
        </div>
                <div style="float:right;margin:10px;transform: translateY(5px);">
            <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/80x15.png" /></a>
        </div>
    </div>

 `;

document.body.appendChild(footer.content);
*/