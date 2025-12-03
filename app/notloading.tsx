import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="w-full h-screen flex justify-center items-center mx-auto">
      <Spinner className="size-15" />
    </div>
  );
}
