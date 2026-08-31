import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center flex-1 gap-4 text-center p-8">
      <h1 className="text-3xl font-bold">Enhancer Docs</h1>
      <p className="text-zinc-500 md:text-lg">
        Documentation for Enhancer — a free browser extension that supplements
        streaming platforms with valuable features.
      </p>
      <div>
        <Link href="/docs" className="font-medium underline">
          Browse the documentation
        </Link>
      </div>
    </div>
  );
}
