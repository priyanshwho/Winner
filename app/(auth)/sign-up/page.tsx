import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { OAuthSignIn } from "@/features/auth/components/oauth-sign-in";
import { CredentialSignUp } from "@/features/auth/components/credential-sign-up";

interface SignUpPageProps {
  searchParams: Promise<{
    callbackUrl?: string;
  }>;
}

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const { callbackUrl } = await searchParams;

  return (
    <Card className="border-border bg-card shadow-lg sm:rounded-xl">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-3xl font-bold tracking-tight font-serif">Locus</CardTitle>
        <CardDescription className="text-muted-foreground text-sm">
          Create an account to manage Gmail and Calendar.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <OAuthSignIn callbackUrl={callbackUrl} />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or sign up with email</span>
          </div>
        </div>

        <CredentialSignUp callbackUrl={callbackUrl} />

        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href={`/sign-in${callbackUrl ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ""}`}
            className="font-medium text-foreground hover:underline"
          >
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
