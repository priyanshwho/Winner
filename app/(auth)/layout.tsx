import { requireUnauth } from "@/features/auth/actions";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  await requireUnauth();
  return (
    <div className="flex min-h-svh flex-1 flex-col items-center justify-center bg-linear-to-b from-background to-muted/20 px-4 py-12">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
