import { URLSearchParams } from 'url'
import { JsonRequest } from 'http-req-builder';

import type { definitions } from '../../.temp/types'

export class PetController {
    async getById(id: string | number) {
        return (
            await new JsonRequest()
                .url(`http://93.126.97.71:10080/api/pet/${id}`)
                .send<definitions['Pet']>()
        ).body
    }

    async findByTags(tags: string | string[]) {
        return (
            await new JsonRequest()
                .url(`http://93.126.97.71:10080/api/pet/findByTags`)
                .searchParams(new URLSearchParams({ tags }))
                .send<definitions['Pet'][]>()
        ).body
    }
}