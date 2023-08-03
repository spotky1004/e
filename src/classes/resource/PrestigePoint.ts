import Resource, { ResourceOptions } from "./Resource";

export interface PrestigePointOptions extends ResourceOptions {}

export default class PrestigePoint extends Resource {
  constructor(name: string, options: PrestigePointOptions) {
    super(name, options);
  }
}
