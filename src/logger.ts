import winston from 'winston';
import { SeqTransport } from '@datalust/winston-seq';

const { combine, timestamp, errors, json } = winston.format;

const logger = winston.createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        errors({ stack: true }),
        json()
    ),
    defaultMeta: { application: 'nextjs-space-backend' },
    transports: [
        new winston.transports.Console({
            format: winston.format.simple(),
        }),
        new SeqTransport({
            serverUrl: process.env.SEQ_URL || 'http://localhost:5341',
            apiKey: process.env.SEQ_APIKEY || 'Seq API Key',
            onError: ((err: Error) => {
                console.error(err);
            }),
            handleExceptions: true,
            handleRejections: true,
        })
    ],
});

export { logger };