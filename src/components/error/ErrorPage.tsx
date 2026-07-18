import { ArrowLeft, Link2Off } from "lucide-react";

interface ErrorPageProps {
  code: number;
  title: string;
  description: string;
  slug?: string;
}

export default function ErrorPage({
  code,
  title,
  description,
  slug,
}: ErrorPageProps) {
  function handleBack() {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "/";
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-6">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-zinc-100">
          <Link2Off className="h-10 w-10 text-zinc-500" />
        </div>

        <p className="text-6xl font-black tracking-tight text-zinc-900">
          {code}
        </p>

        <h1 className="mt-3 text-2xl font-bold text-zinc-900">{title}</h1>

        {slug && (
          <div className="mt-4 inline-flex rounded-full bg-zinc-100 px-4 py-1 text-sm font-medium text-zinc-700">
            {slug}
          </div>
        )}

        <p className="mt-5 text-sm leading-7 text-zinc-600">{description}</p>

        <div className="mt-8">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </div>
    </main>
  );
}
