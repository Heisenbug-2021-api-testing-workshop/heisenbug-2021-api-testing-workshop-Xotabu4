import { definitions } from "../../.temp/types";
import { JsonRequestWithValidation } from "../request";
import { BaseController } from "./base.controller";


export class UserController extends BaseController {

    async register(registerUserModel: Omit<definitions['User'], 'id' | 'userStatus'>) {
        return (
            await new JsonRequestWithValidation()
                .prefixUrl(this.params.baseUrl)
                .url('api/user/register')
                .headers({ token: this.params.token })
                .method('POST')
                .body(registerUserModel)
                .send<definitions['User']>()
        ).body
    }

    async login(credentials: { username: string; password: string; }): Promise<string> {
        return (
            await new JsonRequestWithValidation()
                .prefixUrl(this.params.baseUrl)
                .url('api/user/login')
                .headers({ token: this.params.token })
                .searchParams(credentials)
                .send<definitions['AbstractApiResponse']>()
        ).headers['token'] as string
    }

}