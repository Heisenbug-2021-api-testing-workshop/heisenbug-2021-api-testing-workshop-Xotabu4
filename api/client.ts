import { CookieJar } from 'tough-cookie'
import { CONFIG } from '../config/npmConfig';
import { PetController } from "./controller/pet.contoller";
import { UserController } from "./controller/user.controller";

export class ApiClient {
    public readonly pet: PetController
    public readonly user: UserController

    constructor(params?: { token?: string, prefixUrl?: string, cookies?: CookieJar }) {
        const defaultParams = {
            prefixUrl: CONFIG.get('petstore_url'),
            cookies: new CookieJar(),
            token: undefined
        }

        const mergedParams = {
            ...defaultParams,
            ...params
        }

        this.pet = new PetController(mergedParams)
        this.user = new UserController(mergedParams)
    }

    static async loginAs(credentials: { username: string, password: string }) {
        return new ApiClient({
            token: await new ApiClient().user.login(credentials)
        })
    }
}