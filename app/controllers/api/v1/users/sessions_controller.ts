import type { HttpContext } from "@adonisjs/core/http";

import User from "#models/user";
import UserTransformer from "#transformers/user_transformer";

export default class SessionsController {
  async store({ request, auth, serialize }: HttpContext) {
    const { email, password } = request.only(["email", "password"]);

    const user = await User.verifyCredentials(email, password);

    await auth.use("web").login(user);

    return serialize(UserTransformer.transform(user));
  }

  async destroy({ auth }: HttpContext) {
    await auth.use("web").logout();
  }
}
