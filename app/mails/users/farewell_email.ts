import User from "#models/user";
import env from "#start/env";
import i18nManager from "@adonisjs/i18n/services/main";
import { BaseMail } from "@adonisjs/mail";

export default class FarewellEmail extends BaseMail {
  constructor(private user: User) {
    super();
  }

  prepare() {
    this.message
      .from(env.get("DEFAULT_FROM_EMAIL"))
      .to(this.user.email)
      .subject(
        i18nManager
          .locale(i18nManager.defaultLocale)
          .formatMessage("emails.users.farewell_email.subject"),
      )
      .htmlView("emails/farewell_email", { user: this.user });
  }
}
