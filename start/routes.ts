/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { controllers } from "#generated/controllers";
import { middleware } from "#start/kernel";
import router from "@adonisjs/core/services/router";

router
  .group(() => {
    // Users
    router
      .group(() => {
        router.group(() => {
          router
            .post("login", [controllers.api.v1.users.Sessions, "store"])
            .use(middleware.guest());
          router
            .post("registrations", [
              controllers.api.v1.users.Registrations,
              "store",
            ])
            .use(middleware.guest());
        });

        router
          .group(() => {
            router.delete("logout", [
              controllers.api.v1.users.Sessions,
              "destroy",
            ]);
            router.delete("registrations", [
              controllers.api.v1.users.Registrations,
              "destroy",
            ]);
          })
          .use(middleware.auth());
      })
      .prefix("users");
  })
  .prefix("api/v1");
router.get("/health", [controllers.HealthChecks, "handle"]);
