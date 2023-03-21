import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('my-element')
export class MyElement extends LitElement {
  @property() allTasks: { id: string, text: string }[] = []
  @property() inputText = ''


  render() {
    return html`
      <div>
        <h1>To do list com Lit</h1>
        <input type="text" .value="${this.inputMode}" @change=${this.handleInputChange} placeholder="Escreva a sua task aqui..." />
        <button @click=${this.handleCreateButton}>Criar Tarefa</button>

        <ul>
          ${this.allTasks.map((task) => html`
            <li>
              <span @click=${this.changeTaskStatus}>${task.text}</span>
              <button @click=${this.handleDeleteButton} id="${task.id}">Deletar Task</button>
            </li>
          `)}
        </ul>
      </div>
    `
  }

  handleCreateButton() {
    const newTask = {
      id: String(new Date().getTime()),
      text: this.inputText
    }

    this.allTasks = [...this.allTasks, newTask]
  }

  handleDeleteButton(event: Event) {
    const target = event.target as HTMLButtonElement

    const newList = this.allTasks.filter((task) => task.id !== target.id)

    this.allTasks = newList
  }

  changeTaskStatus(event: Event) {
    const target = event.target as HTMLSpanElement

    target.classList.toggle('selecionado')
  }

  handleInputChange(e: Event) {
    const target = e.target as HTMLInputElement

    this.inputText = target.value
  }

  static styles = css`
    :host {
      max-width: 1280px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
    }

    .logo {
      height: 6em;
      padding: 1.5em;
      will-change: filter;
      transition: filter 300ms;
    }
    .logo:hover {
      filter: drop-shadow(0 0 2em #646cffaa);
    }
    .logo.lit:hover {
      filter: drop-shadow(0 0 2em #325cffaa);
    }

    .card {
      padding: 2em;
    }

    .read-the-docs {
      color: #888;
    }

    h1 {
      font-size: 3.2em;
      line-height: 1.1;
    }

    a {
      font-weight: 500;
      color: #646cff;
      text-decoration: inherit;
    }
    a:hover {
      color: #535bf2;
    }

    button {
      border-radius: 8px;
      border: 1px solid transparent;
      padding: 0.6em 1.2em;
      font-size: 1em;
      font-weight: 500;
      font-family: inherit;
      background-color: #1a1a1a;
      cursor: pointer;
      transition: border-color 0.25s;
    }
    button:hover {
      border-color: #646cff;
    }
    button:focus,
    button:focus-visible {
      outline: 4px auto -webkit-focus-ring-color;
    }

    @media (prefers-color-scheme: light) {
      a:hover {
        color: #747bff;
      }
      button {
        background-color: #f9f9f9;
      }
    }

    ul {
      display: flex;
      flex-direction: column;
    }

    .selecionado {
      text-decoration: line-through;
      font-weight: bold;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement
  }
}
