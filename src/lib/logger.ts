const LOG_ENDPOINT = process.env.NEXT_PUBLIC_API_URL ?? "";
const LOG_TOKEN = process.env.NEXT_PUBLIC_LOG_TOKEN ?? "";

const THROTTLE_MS = 5000;
const seen = new Map<string, number>();

function getErrorKey(error: unknown): string {
  if (error instanceof Error) return error.message.slice(0, 50);
  return String(error).slice(0, 50);
}

export async function logError(error: unknown, context?: Record<string, string | number>) {
  const key = getErrorKey(error);
  const last = seen.get(key) ?? 0;
  if (Date.now() - last < THROTTLE_MS) return;
  seen.set(key, Date.now());

  const isError = error instanceof Error;

  const payload = {
    errorType: isError ? error.constructor.name : "Unknown",
    message: isError ? error.message.slice(0, 200) : String(error).slice(0, 200),
    stack: isError ? error.stack?.split("\n").slice(0, 5) : undefined,
    route: typeof window !== "undefined" ? window.location.pathname : undefined,
    context: {
      ...context,
      app: "eddm-back-nextjs",
    },
  };

  try {
    await fetch(`${LOG_ENDPOINT}/api/logs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-log-token": LOG_TOKEN,
      },
      body: JSON.stringify(payload),
    });
  } catch {
    // silencioso — nunca romper la app por un log fallido
  }
}
