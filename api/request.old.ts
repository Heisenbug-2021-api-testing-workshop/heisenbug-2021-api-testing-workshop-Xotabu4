import got from 'got/dist/source'
import type { URLSearchParams } from 'url'

export class JsonRequest {
    private options: any = {
        responseType: "json"
    }

    url(url: string) {
        this.options.url = url
        return this
    }

    searchParams(searchParams: URLSearchParams) {
        this.options.searchParams = searchParams
        return this
    }

    async send() {
        return got<any>(this.options)
    }
}