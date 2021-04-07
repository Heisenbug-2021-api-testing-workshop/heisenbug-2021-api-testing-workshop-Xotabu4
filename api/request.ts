import { JsonRequest } from 'http-req-builder'
import { ResponseValidator } from 'response-openapi-validator'
import { CONFIG } from '../config/npmConfig'

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