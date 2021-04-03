import { strict as assert } from "assert"
import { ApiClient } from "../api/client"


describe('User', function () {
    it('can register', async function () {
        const client = ApiClient.unauthorized()

        const registerUserModel = {
            "username": "username",
            "firstName": "first name",
            "lastName": "last name",
            "email": `petstore+${Date.now()}@93.126.97.71`,
            "password": "111111",
            "phone": "0931111111",
        }

        const registeredUser = await client.user.register(registerUserModel)

        assert.deepEqual(
            registeredUser,
            {
                ...registerUserModel,
                id: registeredUser.id,
                userStatus: 0
            },
            `Expected registered user to equal data used upon registration`
        )
    })
})