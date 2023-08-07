import { toyReact } from "../src/toyReact";
import { Renderer } from "../src/renderer/Renderer";
import { htmlToElement } from "../src/htmlToElement";

describe("JSX Tests", () => {
  let container: HTMLElement;
  let renderer: Renderer;

  beforeEach(() => {
    container = document.createElement("div");
    renderer = new Renderer();
  });

  it("should render JSX correctly", () => {
    const jsx = `<div id="test"><span>Hello, world!</span></div>`;
    const vdom = toyReact(jsx);
    renderer.render(vdom, container);

    const expectedDOM = htmlToElement(
      '<div id="test"><span>Hello, world!</span></div>',
    );

    expect((container.firstChild as Element).outerHTML).toEqual(
      expectedDOM.outerHTML,
    );
  });

  it("should render nexted JSX correctly", () => {
    const jsx = `<div><h1>Hello, World!</h1><p>Welcome to our website.</p></div>`;
    const vdom = toyReact(jsx);
    renderer.render(vdom, container);

    const expectedDOM = htmlToElement(
      "<div><h1>Hello, World!</h1><p>Welcome to our website.</p></div>",
    );

    expect((container.firstChild as Element).outerHTML).toEqual(
      expectedDOM.outerHTML,
    );
  });

  it("should render JSX with className correctly", () => {
    const jsx = `<div id="greeting" className="highlight"><h1>Hello, World!</h1></div>`;
    const vdom = toyReact(jsx);
    renderer.render(vdom, container);

    const expectedDOM = htmlToElement(
      '<div id="greeting" class="highlight"><h1>Hello, World!</h1></div>',
    );

    expect((container.firstChild as Element).outerHTML).toEqual(
      expectedDOM.outerHTML,
    );
  });

  it("should handle TYPE_DIFF correctly", () => {
    const initialJSX = `<span>Test content</span>`;
    const updatedJSX = `<div>Test content</div>`;

    let vdom = toyReact(initialJSX);
    renderer.render(vdom, container);

    vdom = toyReact(updatedJSX);
    renderer.render(vdom, container);
    console.log("Container content post render:", container.innerHTML);

    const expectedDOM = htmlToElement(updatedJSX);
    expect((container.firstChild as Element).outerHTML).toEqual(
      expectedDOM.outerHTML,
    );
  });

  it("should handle ATTR_DIFF correctly", () => {
    const initialJSX = `<div class="old-class">Content</div>`;
    const updatedJSX = `<div class="new-class">Content</div>`;

    let vdom = toyReact(initialJSX);
    renderer.render(vdom, container);

    vdom = toyReact(updatedJSX);
    renderer.render(vdom, container);

    const expectedDOM = htmlToElement(updatedJSX);
    expect((container.firstChild as Element).outerHTML).toEqual(
      expectedDOM.outerHTML,
    );
  });
});
