import { uniqueRule } from "#validators/rules/unique";
import vine from "@vinejs/vine";

/**
 * Validates the user's creation action
 */
export const createUserValidator = vine.create({
  email: vine
    .string()
    .email()
    .use(uniqueRule({ table: "users", column: "email" })),
  password: vine.string().minLength(8).confirmed(),
  firstName: vine.string(),
  lastName: vine.string(),
});
