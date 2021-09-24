import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { User } from './user-entity';
import { validateSchema } from './validation';
import winston from 'winston';

const app = express();
const router = express.Router({ caseSensitive: true, strict: true });
const PORT = Number(process.env.PORT) || 3000;
const data: Array<User> = [];
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({ level: 'info' }),
        new winston.transports.File({
            filename: 'logs/logging.log',
            level: 'error'
        })
    ]
});

app.use(express.json());

router.get('/:id',   (req, res) => {
    const user:User = data.find((e) => e.uuid === req.params.id && e.isDeleted === false);

    if (user === undefined) {
        const errorMessage = `User with id: ${req.params.id} has not been found.`;

        logger.info(errorMessage);
        res.status(404).json({ message: errorMessage });
    }
    res.json(user);
});

router.get('/:loginSubstring/:limit', (req, res) => {
    const { loginSubstring = '', limit = 5 } = req.params;
    const resultList = data
        .filter((e) => e.login.includes(loginSubstring) && e.isDeleted === false)
        .slice(0, limit as number)
        .sort();

    if (resultList.length === 0) {
        const errorMessage = `Users with which contain: '${req.params.loginSubstring}' substring and limit size: ${req.params.limit} have not been found.`;

        logger.info(errorMessage);
        res.json({ message: errorMessage });
    }

    res.json(resultList);
});

router.post('/', validateSchema(),  (req, res) => {
    const uuid = uuidv4();
    const user:User = req.body as User;

    user.uuid = uuid;
    user.isDeleted = false;
    data.push(user);

    res.json(user);
});

router.put('/:id', validateSchema(), (req, res) => {
    const user:User = req.body as User;
    const index = data.findIndex(u => u.uuid === req.params.id);

    if (index === undefined) {
        const errorMessage = `User with id: ${req.params.id} has not been found.`;

        logger.info(errorMessage);
        res.status(404).json({ message: errorMessage });
    }
    data[index].login = user.login;
    data[index].password = user.password;
    data[index].age = user.age;

    res.sendStatus(200);
});

router.delete('/:id',  (req, res) => {
    const index = data.findIndex(user => user.uuid === req.params.id);

    if (index === undefined) {
        const errorMessage = `User with id: ${req.params.id} has not been found.`;

        logger.info(errorMessage);
        res.status(404).json({ message: errorMessage });
    }
    data[index].isDeleted = true;

    res.sendStatus(204);
});

app.use('/routers/v1/users', router);
app.listen(PORT);

export { logger };
