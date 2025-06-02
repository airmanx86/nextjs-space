import { auth } from '@/auth';
import { tracer } from '@/lib/trace';

export default async function Home() {
    const session = await auth();

    if (!session) {
        return await tracer.startActiveSpan('Not authenticated', async (span) => {
            try {
                return (
                    <div>Not authenticated</div>
                );

            } catch (err: unknown) {
                const exception = err as Error;
                span.recordException(exception);
                throw err
            } finally {
                span.end();
            }
        });
    }

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <pre>{JSON.stringify(session, null, 2)}</pre>
            </main>
            <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
            </footer>
        </div>
    );
}
