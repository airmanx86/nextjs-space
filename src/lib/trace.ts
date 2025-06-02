import { trace } from '@opentelemetry/api';

const tracer = trace.getTracer('nextjs-space-backend');

export { tracer };