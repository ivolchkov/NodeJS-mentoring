import 'reflect-metadata';
import initLoaders from './loaders/initLoaders';
import { logger } from './loaders/logger.loader';

const PORT = Number(process.env.PORT) || 3000;

const app = initLoaders();

app.listen(PORT, () => {
    logger.info(`️Server listening on port: ${PORT}`);
}).on('error', (err: Error) => {
    logger.error(err);
    process.exit(1);
});

