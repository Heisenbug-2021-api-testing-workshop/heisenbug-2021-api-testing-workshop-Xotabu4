import { CONFIG } from "../config/npmConfig";
import { PetController } from "./controller/pet.controller";
import { UserController } from "./controller/user.controller";

export class ApiClient {

    public readonly pet: PetController
    public readonly user: UserController

    private constructor(params?: { token?: string, baseUrl?: string }) {
        const defaultParams = {
            baseUrl: CONFIG.get('petstore_url'),
            token: undefined
        }

        const mergedParams = {
            ...defaultParams,
            ...params
        }

        this.pet = new PetController(mergedParams)
        this.user = new UserController(mergedParams)
    }

    static unauthorized() {
        return new ApiClient()
    }

    static async loginAs(credentials: { username: string; password: string; }) {
        return new ApiClient({
            token: await new ApiClient().user.login(credentials)
        })
    }
}