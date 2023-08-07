export class Component {
  private state: any;

  constructor(initialState = {}) {
    this.state = initialState;
  }

  public setState(newState: any) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  public render() {
    throw new Error("Method 'render' must be implemented.");
  }
}
