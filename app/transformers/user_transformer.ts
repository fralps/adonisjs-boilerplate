import User from "#models/user";
import { BaseTransformer } from "@adonisjs/core/transformers";

export default class UserTransformer extends BaseTransformer<User> {
  toObject() {
    return this.pick(this.resource, ["email", "firstName", "lastName", "id"]);
  }
}
