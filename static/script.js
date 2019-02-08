import {
  html,
  Component,
  render
} from "https://unpkg.com/htm/preact/standalone.mjs";

class App extends Component {
  render() {
    return html`
      <div class="app"><${BanderContainer} /></div>
    `;
  }
}

const options = ["Node", "Java", "Kotlin", ".NET Core"];

const Option = ({ name, style }) =>
  html`
    <button
      class="option"
      style=${style}
      onClick=${
        () => {
          alert(`${name} is a good choice. :) // TODO`);
        }
      }
    >
      <div class="text">${name}</div>
      <div class="underline" />
    </button>
  `;

const Subtitle = ({ name }) =>
  html`
    <div id="subtitle" class="subtitle-esque-text"></div>
  `;

const Decider = () =>
  html`
    <div id="decider-wrapper">
      <${WaitingBar} />
      ${
        options.map(
          (option, i) =>
            html`
              <${Option}
                name="${option}"
                style=${{ animationDuration: `${3 + i / 2}s` }}
              />
            `
        )
      }
    </div>
  `;

const WaitingBar = () =>
  html`
    <div class="waiting-bar" />
  `;

class BanderContainer extends Component {
  constructor(props) {
    super(props);

    this.mountPoint = Date.now();

    this.state = {
      loading: true,
      showInteraction: false
    };

    this.initiateInteraction = this.initiateInteraction.bind(this);
    this.handleOnPlayThroughDone = this.handleOnPlayThroughDone.bind(this);
  }

  initiateInteraction() {
    setTimeout(() => {
      this.setState({ showInteraction: true });
    }, 2000);
  }

  handleOnPlayThroughDone() {
    const timeDiff = Date.now() - this.mountPoint;
    if (timeDiff < 3000) {
      setTimeout(() => {
        this.setState({ loading: false });
        this.initiateInteraction();
      }, 3000 - timeDiff);
    } else {
      this.setState({ loading: false });
      this.initiateInteraction();
    }
  }

  render() {
    return html`
      <div id="image-box">
        <video
          autoplay
          loop
          muted
          oncanplaythrough=${this.handleOnPlayThroughDone}
        >
          <source src="./static/clip.mp4" type="video/mp4" />
        </video>
        <div
          class=${
            `loading-spinner subtitle-esque-text loading-${this.state.loading}`
          }
        >
          <div class="spinner-ripple">
            <div></div>
            <div></div>
          </div>
        </div>
        ${
          !this.state.loading &&
            html`
              <${Subtitle} />
            `
        }
        ${
          !this.state.loading &&
            this.state.showInteraction &&
            html`
              <${Decider} />
            `
        }
      </div>
    `;
  }
}

render(
  html`
    <${App} page="All" />
  `,
  document.body
);
