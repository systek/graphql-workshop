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
      <div class="app"><${ImageBox} /></div>
    `;
  }
}

const options = ["Node", "Java", "Kotlin", ".NET Core"];

const Option = ({ name }) =>
  html`
    <div class="option">
      <div class="text">${name}</div>
      <div class="underline" />
    </div>
  `;

const Decider = () =>
  html`
    <div id="decider-wrapper">
      ${
        options.map(
          option =>
            html`
              <${Option} name="${option}" />
            `
        )
      }
    </div>
  `;

const ImageBox = () =>
  html`
    <div id="image-box"><${Decider} /><img src="./example.png" /></div>
  `;

render(
  html`
    <${App} page="All" />
  `,
  document.body
);
