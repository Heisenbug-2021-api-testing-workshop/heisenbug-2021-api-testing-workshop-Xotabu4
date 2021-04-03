

export class BaseController {
    protected params: { token?: string, baseUrl: string }

    constructor(params: { token?: string, baseUrl: string }) {
        this.params = {
            ...params
        };
    }
}