import { Inject, Service } from 'typedi';
import UserRepository from '../repositories/user.repository';
import { Logger } from 'winston';
import { AuthConfig } from '../config/auth.config';

@Service({ id: 'auth.service' })
export default class AuthService {
    constructor(
        @Inject('user.repository') private userRepository: UserRepository,
        @Inject('jwt') private jwt: any,
        @Inject('authConfig') private authConfig: AuthConfig,
        @Inject('logger') private logger: Logger) {
        this.userRepository = userRepository;
        this.jwt = jwt;
        this.authConfig = authConfig;
        this.logger = logger;
    }

    public async login(username: string, password: string): Promise<string> {
        const user = await this.userRepository.getByLogin(username);

        if (user === null) {
            const errorMessage = `User with username: ${username} has not been found.`;
            this.logger.info(errorMessage);

            throw new Error(errorMessage);
        }

        if (!(user.password === password)) {
            const errorMessage = 'Password does not match';
            this.logger.info(errorMessage);

            throw new Error(errorMessage);
        }

        return this.jwt.sign(
            { userId: user.uuid, username: user.login },
            this.authConfig.jwtSecret,
            { expiresIn: '1h' }
        );
    }
}
