import { SignUp } from "@clerk/nextjs";
import { connection } from "next/server";
import { Suspense } from "react";

export const instant = false;

export default async function SignUpPage() {
  await connection();

  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 text-center">
        Add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY to client/.env.local to enable
        authentication.
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Suspense>
        <SignUp />
      </Suspense>
    </div>
  );
}
