import {
  html,
  Component,
  render
} from "https://unpkg.com/htm/preact/standalone.mjs";

class App extends Component {
  addTodo() {
    const { todos = [] } = this.state;
    this.setState({ todos: todos.concat(`Item ${todos.length}`) });
  }
  render() {
    return html`
      <div class="app"><${BanderContainer} /></div>
    `;
  }
}

const options = ["Node", "Java", "Kotlin", ".NET Core"];

const Option = ({ name, style }) =>
  html`
    <div class="option" style=${style}>
      <div class="text">${name}</div>
      <div class="underline" />
    </div>
  `;

const Subtitle = ({ name }) =>
  html`
    <div id="subtitle" class="subtitle-esque-text"></div>
  `;

const Decider = () =>
  html`
    <div id="decider-wrapper">
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

class BanderContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
  }

  render() {
    return html`
      <div id="image-box">
        <video
          autoplay
          loop
          muted
          oncanplaythrough=${
            () => {
              this.setState({ loading: false });
            }
          }
        >
          <source src="./static/clip.mp4" type="video/mp4" />
        </video>
        ${
          this.state.loading &&
            html`
              <div class="loading-spinner subtitle-esque-text">Loading...</div>
            `
        }
        ${
          !this.state.loading &&
            html`
              <${Subtitle} />
            `
        }
        ${
          !this.state.loading &&
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
