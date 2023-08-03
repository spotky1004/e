export interface ResourceOptions {
  defaultAmount?: D;
}

export default class Resource {
  name: string = "unknown";
  defaultAmount: D = D(0);

  constructor(name: string, options: ResourceOptions) {
    this.name = name;
    if (options.defaultAmount) this.defaultAmount = options.defaultAmount;
  }
}
