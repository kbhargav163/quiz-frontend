import client from 'prom-client';

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

export async function GET() {
  return new Response(await client.register.metrics(), {
    headers: { 'Content-Type': client.register.contentType },
  });
}
