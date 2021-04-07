import { JsonRequest } from 'http-req-builder'
import { ResponseValidator } from 'response-openapi-validator'
import { CONFIG } from '../config/npmConfig'
import { allure } from 'allure-mocha/dist/MochaAllureReporter'

const responseValidator = new ResponseValidator({
    openApiSpecPath: CONFIG.get('petstore_swagger_url'),
    apiPathPrefix: '/api',
    ajvOptions: {
        allErrors: true,
        verbose: true,
        jsonPointers: true,
        formats: {
            int64: /^\d+$/,
            int32: /^\d+$/,
            double: "[+-]?\\d*\\.?\\d+"
        }
    }
})

export class JsonRequestWithValidation extends JsonRequest {
    constructor() {
        super()
        this.options = {
            ...this.options,
            hooks: {
                afterResponse: [
                    (response) => {
                        const stepName = `[${response.statusCode}] ${this?.options?.method ?? 'GET'} ${this?.options?.url}`

                        const step = allure.createStep(stepName, () => {
                            if(this?.options?.json) {
                                allure.createAttachment(
                                    'JSON REQUEST BODY',
                                    JSON.stringify(this?.options?.json, null, 2),
                                    'application/json' as any
                                )
                            }

                            if(response?.body) {
                                allure.createAttachment(
                                    'JSON RESPONSE BODY',
                                    JSON.stringify(response?.body, null, 2),
                                    'application/json' as any
                                )
                            }
                        })

                        step()

                        return response
                    }
                ]
            }
        }
    }

    async send<T = any>() {
        const response = await super.send<T>()

        await responseValidator.assertResponse({
            method: response?.request?.options?.method,
            requestUrl: response?.request?.requestUrl,
            statusCode: response?.statusCode,
            body: response.body
        })

        return response
    }
}