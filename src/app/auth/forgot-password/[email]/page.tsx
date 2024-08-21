"use client";

import { Card } from "@/components/Card";
import { ChangePassword } from "@/components/ChangePassword";
import Link from "next/link";

export default function ChangePasswordPage({
  params,
}: {
  params: { email: String };
}) {
  const email = decodeURIComponent(params.email as string);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return !emailRegex.test(email) ? (
    <div className="flex justify-center items-center text-red-500 p-4">
      <div>
        <Card>
          <div className="p-10">
            <div>Invalid Email</div>
            <div className="mt-4">
              <Link href="/auth/forgot-password" className="text-url">
                Go Back
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  ) : (
    <ChangePassword email={email} />
  );
}
