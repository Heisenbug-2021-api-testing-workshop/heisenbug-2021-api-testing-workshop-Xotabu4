import { CookieJar } from 'tough-cookie'

export class BaseController {
    protected params: { token?: string, cookies: CookieJar, prefixUrl: string }

    constructor(params: { token?: string, cookies: CookieJar, prefixUrl: string }) {
        this.params = {
            ...params
        }
    }
}