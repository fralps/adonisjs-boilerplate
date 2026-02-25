import { UserSchema } from "#database/schema";
import { withAuthFinder } from "@adonisjs/auth/mixins/lucid";
import { compose } from "@adonisjs/core/helpers";
import hash from "@adonisjs/core/services/hash";

export default class User extends compose(UserSchema, withAuthFinder(hash)) {}
