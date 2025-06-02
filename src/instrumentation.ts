import { registerOTel, OTLPHttpProtoTraceExporter } from '@vercel/otel';
 
export function register() {
  registerOTel({
        serviceName: 'nextjs-space-backend',
        traceExporter: new OTLPHttpProtoTraceExporter({
            url: `${process.env.SEQ_URL || 'http://localhost:5341'}/ingest/otlp/v1/traces`,
            headers: {
                'X-Seq-ApiKey': process.env.SEQ_APIKEY || 'Seq API Key',
            },
        }),
    });
}