import { strict as assert } from 'assert'
import { PetController } from '../api/controller/pet.contoller';

describe('Pet', function () {
    it('can be received by id', async function () {
        const id = 3
        const pet = await new PetController().getById(id)

        assert(id === pet.id, `Expected returned pet id to be ${id}`)
    })

    it('can be received by tag', async function () {
        const pets = await new PetController().findByTags('tag1')        

        assert(pets.length > 0)
        assert(pets.every(pet => pet.tags.some(tag => tag.name == 'tag1')))
    })
})