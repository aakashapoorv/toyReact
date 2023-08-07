import { VDOM } from "./VDOM";

export class Patch {
  private type: string;
  private vdom: VDOM;
  private payload?: Record<string, string>;
  private index?: number;

  static INIT = "INIT";
  static TYPE_DIFF = "TYPE_DIFF";
  static ATTR_DIFF = "ATTR_DIFF";
  static CHILD_ADD = "CHILD_ADD";
  static CHILD_REMOVE = "CHILD_REMOVE";

  constructor(
    type: string,
    vdom: VDOM,
    payload?: Record<string, string>,
    index?: number,
  ) {
    this.type = type;
    this.vdom = vdom;
    this.payload = payload;
    this.index = index;
  }

  public apply(container: HTMLElement) {
    switch (this.type) {
      case Patch.INIT:
        const initElement = this.vdom.createElement();
        container.appendChild(initElement);
        break;

      case Patch.TYPE_DIFF:
        const typeDiffElement = this.vdom.createElement();
        container.innerHTML = "";
        container.appendChild(typeDiffElement);
        break;

      case Patch.ATTR_DIFF:
        if (this.payload) {
          const targetNode = container.firstChild as HTMLElement;
          for (const [attrName, value] of Object.entries(this.payload)) {
            targetNode.setAttribute(attrName, value);
          }
        }
        break;

      case Patch.CHILD_ADD:
        throw new Error(`TODO patch type ${this.type}`);

      case Patch.CHILD_REMOVE:
        throw new Error(`TODO patch type ${this.type}`);

      default:
        throw new Error(`Unknown patch type ${this.type}`);
    }
  }
}
