import { JsonRequest } from "http-req-builder";
import { ResponseValidator } from "response-openapi-validator";
import { allure } from "allure-mocha/dist/MochaAllureReporter";
import { CONFIG } from "../config/npmConfig";

const responseValidator = new ResponseValidator({
  openApiSpecPath: CONFIG.get("petstore_swagger_url"),
  apiPathPrefix: "/api",
  ajvOptions: {
    allErrors: true,
    verbose: true,
    jsonPointers: true,
    formats: {
      double: "[+-]?\\d*\\.?\\d+",
      int32: /^\d+$/,
      int64: /^\d+$/,
    },
  },
});

export class JsonRequestWithValidation extends JsonRequest {
  constructor() {
    super();

    this.options = {
      ...this.options,
      hooks: {
        afterResponse: [
          (response) => {
            const stepName = `[${response.statusCode}] ${
              this?.options?.method ?? "GET"
            } ${this?.options?.url} | ${response?.timings?.phases?.total}ms`;
            const step = allure.createStep(stepName, () => {
              if (this?.options?.json) {
                allure.createAttachment(
                  `JSON Request Body`,
                  JSON.stringify(this?.options?.json, null, 2),
                  "application/json" as any
                );
              }
              if (response?.body) {
                allure.createAttachment(
                  `JSON Response Body`,
                  JSON.stringify(response?.body, null, 2),
                  "application/json" as any
                );
              }
            });
            step();
            return response;
          },
        ],
      },
    };
  }

  async send<T = any>() {
    const response = await super.send<T>();

    await responseValidator.assertResponse({
      method: response?.request?.options?.method,
      requestUrl: response?.request?.requestUrl,
      statusCode: response?.statusCode,
      body: response.body,
    });

    return response;
  }
}
