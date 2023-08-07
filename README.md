# Toy React

Welcome to Toy React, an experimental project aimed to provide a simplified, educational insight into how React handles virtual DOM. Crafted using TypeScript, this project showcases how a virtual representation of the DOM can be created, and subsequently, how the actual DOM can be efficiently updated based on changes within the virtual DOM (VDOM).

Please note, this project is purely for learning purposes and doesn't possess the complete capabilities of the actual React library.

## Project Structure

The project comprises the following main elements:

- `src/`: This is where the main source code resides. The essential files include:
  - `renderer/VDOM.ts`: This file contains the `VDOM` class that symbolizes a virtual DOM node.
  - `toyReact.ts`: This file includes a function to convert JSX into a VDOM.
  - `renderer/`: This directory holds the code necessary for rendering a VDOM into an actual DOM.
  - `components/`: Here, you'll find example components that utilize the VDOM.

- `tests/`: This directory encompasses tests for various segments of the project.

## Setup

Here's a quick guide to set up the project:

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/yourrepository.git
   ```

2. Switch into the project directory:

   ```bash
   cd yourrepository
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the tests:

   ```bash
   npm test
   ```

## Usage

Here's a brief on how to use Toy React:

Firstly, import the required modules:

```typescript
import { VDOM } from './src/VDOM';
import { toyReact } from './src/toyReact';
import { Renderer } from './src/renderer/Renderer';
```

Now, these modules can be employed to create a VDOM, convert it into an actual DOM, and mount it:

```typescript
// Creating a VDOM from JSX
const vdom = toyReact('<div id="test"><span>Hello, world!</span></div>');

// Creating a renderer
const renderer = new Renderer();

// Creating a container element
const container = document.createElement('div');

// Rendering the VDOM into the container
renderer.render(vdom, container);

// Now, `container` comprises the rendered DOM
console.log(container.outerHTML);  // "<div><div id="test"><span>Hello, world!</span></div></div>"
```

Enjoy exploring and learning! Remember, it's all about enjoying the process of learning and making the most out of it!