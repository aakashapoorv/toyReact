import { Renderer } from "../../src/renderer/Renderer";
import { VDOM } from "../../src/renderer/VDOM";
import { Patch } from "../../src/renderer/Patch";

jest.mock("../../src/renderer/VDOM");
jest.mock("../../src/renderer/Patch");

describe("Renderer", () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement("div");
    (VDOM as jest.MockedClass<typeof VDOM>).mockClear();
    (Patch as jest.MockedClass<typeof Patch>).mockClear();
    (VDOM.prototype.diff as jest.Mock).mockReturnValue([]);
  });

  it("should initialize without a root", () => {
    const renderer = new Renderer();
    expect(renderer["root"]).toBeNull();
  });

  it("should render initial VDOM to container", () => {
    const vdom = new VDOM("div");
    const renderer = new Renderer();
    renderer.render(vdom, container);
    expect(renderer["root"]).toBe(vdom);
    expect(Patch).toHaveBeenCalledWith("INIT", vdom);
    expect(Patch.prototype.apply).toHaveBeenCalledWith(container);
  });

  it("should diff and patch subsequent renders", () => {
    const vdom1 = new VDOM("div");
    const vdom2 = new VDOM("span");
    const renderer = new Renderer();
    renderer.render(vdom1, container);
    renderer.render(vdom2, container);
    expect(vdom1.diff).toHaveBeenCalledWith(vdom2);
    expect(Patch.prototype.apply).toHaveBeenCalledWith(container);
  });
});
