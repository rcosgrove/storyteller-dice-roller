class Header extends HTMLElement {
  constructor() {
    super();
  }


  connectedCallback() {
    this.innerHTML = `
      <header>
        <div class="topnav">
            <div style="float:left;">
                <h4>Dice Roller WtA 20th Ed</h4>
            </div>

            <div style="float:right;">
                <!-- <button class="topbutton" name="" value="" id="" title="Reset the firms" onclick="">LINK</button> -->
                <!-- <button class="topbutton" name="" value="" id="sections" title="Reset sections" onclick="ShowAllSections()">Sections on</button> -->
                <button class="topbutton" name="" value="" id="" title="About" onclick="window.location.href='about.html';">ABOUT</button>
                <button class="topbutton" name="" value="" id="" title="Help" onclick="window.location.href='help.html';">HELP</button>
                <button class="topbutton" name="" value="" id="" title="Legal" onclick="window.location.href='legal.html';">Legal</button>

            </div>
        </div>
    </div>

    <div class="row flex header" id="maintitle">
        <div class="column centre">
            <h1 id="title">Storyteller Dice Roller <span style="font-size: 50%">v0.0.8</span></h1>
            <h3 id="subtitle">Werewolf the Apocalypse<br>
                20th Anniversary Edition</h3>
        </div>
    </div>

      </header>
    `;
  }
}

customElements.define('header-component', Header);