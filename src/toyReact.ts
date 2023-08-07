import { JSDOM } from "jsdom";
import { VDOM } from "./renderer/VDOM";
import { Renderer } from "./renderer";

function createVDOM(element: Node): VDOM {
  let vdom = new VDOM("");

  if (element.nodeType === Node.ELEMENT_NODE) {
    const elem = element as Element;
    vdom = new VDOM(elem.tagName.toLowerCase());

    for (const { name, value } of Array.from(elem.attributes)) {
      vdom.setAttribute(name, value);
    }
  } else if (element.nodeType === Node.TEXT_NODE) {
    const text = element as Text;
    vdom.setTextContent(text.nodeValue || "");
  }

  if (element.childNodes && element.childNodes.length > 0) {
    for (const child of Array.from(element.childNodes)) {
      const childVDOM = createVDOM(child);
      vdom.appendChild(childVDOM);
    }
  }

  return vdom;
}

export function createElement(
  type: string,
  props: Record<string, string> | null,
  ...children: VDOM[]
): VDOM {
  const vdom = new VDOM(type);

  if (props) {
    for (const [name, value] of Object.entries(props)) {
      vdom.setAttribute(name, value);
    }
  }

  for (const child of children) {
    vdom.appendChild(child);
  }

  return vdom;
}

export function render(vdom: VDOM, container: HTMLElement): void {
  const renderer = new Renderer();
  renderer.render(vdom, container);
}

export function toyReact(jsx: string): VDOM {
  const { window } = new JSDOM(jsx);
  const { document } = window;
  const vdom = createVDOM(document.body.firstChild as Element);

  return vdom;
}
