import Resource, { ResourceOptions } from "./Resource";

export interface PointOptions extends ResourceOptions {}

export default class Point extends Resource {
  constructor(name: string, options: PointOptions) {
    super(name, options);
  }
}
