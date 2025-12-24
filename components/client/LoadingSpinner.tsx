"use client";

import { Spinner } from "@/components/ui/spinner";

export default function LoadingSpinner() {
  return (
    <div className="w-full h-screen flex gap-2 justify-center items-center mx-auto">
      <Spinner className="size-10" />
      <span>Chargement...</span>
    </div>
  );
}
