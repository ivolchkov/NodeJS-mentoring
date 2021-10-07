import { Inject, Service } from 'typedi';
import { Measure } from '../middlewares/execution.time.measure';
import AuthService from '../../services/auth.service';

@Service()
export default class AuthController {
    constructor(@Inject('auth.service') private authService: AuthService) {
        this.authService = authService;
    }

    @Measure
    public login(username: string, password: string) : Promise<string> {
        return this.authService.login(username, password);
    }
}
