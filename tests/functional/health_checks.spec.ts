import { status, json } from "#tests/functional/shared-examples/http_response";
import { test } from "@japa/runner";

test.group("#GET /health", (): void => {
  test("returns a 401 json status", async ({ client }): Promise<void> => {
    const response = await client
      .get("/health")
      .headers({ "x-monitoring-secret": "wrong-secret" });

    status(response, 401);
    json(response);
  });
});
