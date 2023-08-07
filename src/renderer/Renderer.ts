import { VDOM } from "./VDOM";
import { Patch } from "./Patch";

export class Renderer {
  private root: VDOM | null = null;

  public render(vdom: VDOM, container: HTMLElement) {
    const patches = this.root
      ? this.root.diff(vdom)
      : [new Patch("INIT", vdom)];
    patches.forEach((patch) => patch.apply(container));
    this.root = vdom;
  }
}
