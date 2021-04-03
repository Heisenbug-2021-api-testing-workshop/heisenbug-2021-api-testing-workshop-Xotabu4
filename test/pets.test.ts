import { strict as assert } from 'assert'
import { definitions } from '../.temp/types'
import { ApiClient } from '../api/client'

describe('Pet', function () {
    it('can be recieved by id', async function () {
        const id = 3
        const client = ApiClient.unauthorized()
        const pet = await client.pet.getById(id)

        assert(id == pet.id, `Expected returned pet id to be ${id}`)
    })

    it('can be recieved by tag', async function () {
        const client = ApiClient.unauthorized()
        const pets = await client.pet.findByTags('tag1')

        assert(pets.length > 0)
        assert(pets.every(pet => pet.tags.some(tag => tag.name == 'tag1')))
    })

    it('can be added by admin', async function () {
        const adminClient = await ApiClient.loginAs({ username: 'admin', password: 'admin' })

        const petToCreate: Omit<definitions['Pet'], 'id'> = {
            "category": {
                "id": 0,
                "name": "string"
            },
            "name": "Cat",
            "photoUrls": [
                "http://93.126.97.71:10080"
            ],
            "tags": [
                {
                    "id": 0,
                    "name": "tag1"
                }
            ],
            "status": "available"
        }

        const addedPet = await adminClient.pet.addNew(petToCreate)

        assert.deepEqual(
            addedPet,
            {
                ...petToCreate,
                id: addedPet.id
            },
            `Expected created pet to match data used upon creation`
        )

    })
})