import { Patch } from "./Patch";

class VDOM {
  type: string;
  props: Record<string, string>;
  children: VDOM[];
  textContent: string | null;

  constructor(type: string, textContent: string | null = null) {
    this.type = type;
    this.props = {};
    this.children = [];
    this.textContent = textContent;
  }

  setAttribute(name: string, value: string): void {
    this.props[name] = value;
  }

  appendChild(vdom: VDOM): void {
    this.children.push(vdom);
  }

  setTextContent(text: string) {
    this.textContent = text;
  }

  diff(vdom: VDOM): Patch[] {
    const patches: Patch[] = [];

    // Compare tag names
    if (this.type !== vdom.type) {
      patches.push(new Patch(Patch.TYPE_DIFF, vdom));
    }

    if (this.type !== vdom.type) {
      console.log("Detected TYPE_DIFF:", this.type, "->", vdom.type);
      patches.push(new Patch("TYPE_DIFF", vdom));
    }

    const allAttributes = new Set([
      ...Object.keys(this.props),
      ...Object.keys(vdom.props),
    ]);
    const attrChanges: Record<string, string> = {};
    for (let attr of allAttributes) {
      if (this.props[attr] !== vdom.props[attr]) {
        attrChanges[attr] = vdom.props[attr] || "";
      }
    }
    if (Object.keys(attrChanges).length > 0) {
      patches.push(new Patch(Patch.ATTR_DIFF, vdom, attrChanges));
    }

    const length = Math.max(this.children.length, vdom.children.length);
    for (let i = 0; i < length; i++) {
      if (this.children[i] && vdom.children[i]) {
        patches.push(...this.children[i].diff(vdom.children[i]));
      } else if (vdom.children[i]) {
        patches.push(
          new Patch(Patch.CHILD_ADD, vdom.children[i], undefined, i),
        );
      } else {
        patches.push(
          new Patch(Patch.CHILD_REMOVE, this.children[i], undefined, i),
        );
      }
    }

    return patches;
  }

  createElement(): Node {
    // Handle the creation of text nodes separately
    if (this.textContent) {
      return document.createTextNode(this.textContent || "");
    }

    // Standard HTML element creation
    const element = document.createElement(this.type);

    // Set element attributes
    for (const [name, value] of Object.entries(this.props)) {
      if (name === "classname") element.setAttribute("class", value);
      else element.setAttribute(name, value);
    }

    // Append children elements
    for (const child of this.children) {
      element.appendChild(child.createElement());
    }

    return element;
  }
}

export { VDOM };
