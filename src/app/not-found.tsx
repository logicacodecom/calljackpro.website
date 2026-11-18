import Link from "next/link";
import { CallButton } from "@/components/PrimaryCTA";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="font-heading text-5xl">Page not found</h1>
      <p className="mt-3 text-lg">That page doesn&rsquo;t exist — but we can still help.</p>
      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <CallButton />
        <Link href="/" className="font-bold underline decoration-brand decoration-2 underline-offset-4">
          Back to home
        </Link>
      </div>
    </div>
  );
}
