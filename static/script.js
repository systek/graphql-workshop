import {
  html,
  Component,
  render,
} from 'https://unpkg.com/htm/preact/standalone.mjs'

const postResponse = option =>
  fetch(`/api/ans?response=${option}`, {
    method: 'POST',
    headers: {
      'x-uuid': localStorage.getItem('uuid'),
    },
  })

class App extends Component {
  render() {
    return html`
      <div class="app"><${BanderContainer} /></div>
    `
  }
}

const GraphQLLogo = props =>
  html`
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 600"
      height="200px"
      width="150px"
      color="white"
      class="glitch"
    >
      <path
        fill="currentColor"
        d="M57.47 302.66l-14.38-8.3L203.24 16.98l14.38 8.3z"
      />
      <path fill="currentColor" d="M39.8 272.2h320.3v16.6H39.8z" />
      <path
        fill="currentColor"
        d="M206.35 374.03l-160.21-92.5 8.3-14.38 160.2 92.5zM345.52 132.95l-160.2-92.5 8.3-14.38 160.2 92.5z"
      />
      <path
        fill="currentColor"
        d="M54.48 132.88l-8.3-14.37L206.4 26l8.3 14.37z"
      />
      <path
        fill="currentColor"
        d="M342.57 302.66L182.42 25.28l14.37-8.3 160.15 277.38zM52.5 107.5h16.6v185H52.5z"
      />
      <path fill="currentColor" d="M330.9 107.5h16.6v185h-16.6z" />
      <path
        fill="currentColor"
        d="M203.52 367l-7.25-12.56L335.61 274l7.25 12.56z"
      />
      <path
        fill="currentColor"
        d="M369.5 297.9c-9.6 16.7-31 22.4-47.7 12.8-16.7-9.6-22.4-31-12.8-47.7 9.6-16.7 31-22.4 47.7-12.8a34.8 34.8 0 0 1 12.8 47.7M90.9 137c-9.6 16.7-31 22.4-47.7 12.8-16.7-9.6-22.4-31-12.8-47.7 9.6-16.7 31-22.4 47.7-12.8 16.7 9.7 22.4 31 12.8 47.7M30.5 297.9c-9.6-16.7-3.9-38 12.8-47.7 16.7-9.6 38-3.9 47.7 12.8 9.6 16.7 3.9 38-12.8 47.7a34.93 34.93 0 0 1-47.7-12.8M309.1 137c-9.6-16.7-3.9-38 12.8-47.7 16.7-9.6 38-3.9 47.7 12.8 9.6 16.7 3.9 38-12.8 47.7a34.95 34.95 0 0 1-47.7-12.8M200 395.8c-19.3 0-34.9-15.6-34.9-34.9 0-19.3 15.6-34.9 34.9-34.9 19.3 0 34.9 15.6 34.9 34.9 0 19.2-15.6 34.9-34.9 34.9M200 74c-19.3 0-34.9-15.6-34.9-34.9 0-19.3 15.6-34.9 34.9-34.9 19.3 0 34.9 15.6 34.9 34.9 0 19.3-15.6 34.9-34.9 34.9"
      />
      <text x="-10" y="500" fill="white">Vi møtes.</text>
    </svg>
  `

const options = ['Node', 'Java', 'Kotlin', '.NET Core']
const Option = ({ name, style, onResponseDone }) =>
  html`
    <button
      class="option"
      style=${style}
      onClick=${
        () => {
          postResponse(name)
            .then(response => {
              if (response.status === 200) {
                onResponseDone()
              } else {
                console.error(response)
              }
            })
            .catch(e => {
              console.error(e)
            })
        }
      }
    >
      <div class="text">${name}</div>
      <div class="underline" />
    </button>
  `

const Subtitle = ({ name }) =>
  html`
    <div id="subtitle" class="subtitle-esque-text"></div>
  `

const Decider = ({ onResponseDone }) =>
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
                onResponseDone=${onResponseDone}
              />
            `,
        )
      }
    </div>
  `

const WaitingBar = () =>
  html`
    <div class="waiting-bar" />
  `

class BanderContainer extends Component {
  constructor(props) {
    super(props)

    this.mountPoint = Date.now()

    const completed = localStorage.getItem('completed') || false

    this.state = {
      loading: true,
      showInteraction: completed,
      responseComplete: completed,
    }

    this.initiateInteraction = this.initiateInteraction.bind(this)
    this.handleOnPlayThroughDone = this.handleOnPlayThroughDone.bind(this)
    this.handleOnResponseDone = this.handleOnResponseDone.bind(this)
  }

  initiateInteraction() {
    setTimeout(() => {
      this.setState({ showInteraction: true })
    }, 2000)
  }

  handleOnPlayThroughDone() {
    const timeDiff = Date.now() - this.mountPoint
    if (timeDiff < 3000) {
      setTimeout(() => {
        this.setState({ loading: false })
        this.initiateInteraction()
      }, 3000 - timeDiff)
    } else {
      this.setState({ loading: false })
      this.initiateInteraction()
    }
  }

  handleOnResponseDone() {
    this.setState({ responseComplete: true })
    localStorage.setItem('completed', true)
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
            `loading-spinner subtitle-esque-text loading-${
              this.state.loading
            } done-${this.state.responseComplete}`
          }
        >
          <${GraphQLLogo} class="glitch" />
          <div class="spinner-ripple">
            <div></div>
            <div></div>
          </div>
        </div>
        ${
          !this.state.loading &&
            !this.state.responseComplete &&
            html`
              <${Subtitle} />
            `
        }
        ${
          !this.state.loading &&
            this.state.showInteraction &&
            !this.state.responseComplete &&
            html`
              <${Decider} onResponseDone=${this.handleOnResponseDone} />
            `
        }
      </div>
    `
  }
}

render(
  html`
    <${App} page="All" />
  `,
  document.body,
)
