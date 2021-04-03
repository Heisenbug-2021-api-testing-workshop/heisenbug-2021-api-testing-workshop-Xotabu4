import { URLSearchParams } from 'url'
import { definitions } from "../../.temp/types"
import { BaseController } from './base.controller'
import { JsonRequestWithValidation } from '../request'

export class PetController extends BaseController {


    async getById(id: number | string) {
        return (
            await new JsonRequestWithValidation()
                .prefixUrl(this.params.baseUrl)
                .url(`api/pet/${id}`)
                .headers({ token: this.params.token })
                .send<definitions['Pet']>()
        ).body
    }

    async findByTags(tags: string | string[]) {
        return (
            await new JsonRequestWithValidation()
                .prefixUrl(this.params.baseUrl)
                .url(`api/pet/findByTags`)
                .headers({ token: this.params.token })
                .searchParams(new URLSearchParams({ tags }))
                .send<definitions['Pet'][]>()
        ).body
    }

    async addNew(petToCreate: Omit<definitions['Pet'], 'id'>) {
        return (
            await new JsonRequestWithValidation()
                .prefixUrl(this.params.baseUrl)
                .url(`api/pet`)
                .method('POST')
                .body(petToCreate)
                .headers({ token: this.params.token })
                .send<definitions['Pet']>()
        ).body
    }

}