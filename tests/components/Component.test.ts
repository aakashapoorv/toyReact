import { Component } from "../../src/components";

class TestComponent extends Component {
  render() {
    return "Test";
  }
}

describe("Component", () => {
  it("should initialize with default state", () => {
    const component = new TestComponent();
    expect(component["state"]).toEqual({});
  });

  it("should initialize with given initial state", () => {
    const initialState = { testKey: "testValue" };
    const component = new TestComponent(initialState);
    expect(component["state"]).toEqual(initialState);
  });

  it("should update state and re-render", () => {
    const component = new TestComponent();
    const newState = { testKey: "testValue" };

    const renderSpy = jest.spyOn(component, "render");
    component.setState(newState);

    expect(component["state"]).toEqual(newState);
    expect(renderSpy).toHaveBeenCalled();
  });

  it("should throw error when render is not implemented", () => {
    const component = new Component();
    expect(() => component.render()).toThrowError(
      "Method 'render' must be implemented.",
    );
  });
});
