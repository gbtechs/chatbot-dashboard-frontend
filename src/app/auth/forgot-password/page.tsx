"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useNotification } from "@/contexts/NotificationContext";
import useApiRequest from "@/hooks/useApiRequest";

export default function ForgotPasswordPage() {
  const { notify } = useNotification();
  const { makeRequest } = useApiRequest();
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const email = formData.get("email")?.toString();

      await makeRequest("/forgot_password", "POST", {
        email,
      });

      notify("Email sent. Please check your Inbox / Spam folders", "success");

      router.push(`/auth/forgot-password/${email}`);
    } catch (error) {
      notify(error, "error");
    }
  }

  return (
    <div className="flex justify-center items-center h-full w-full bg-gray">
      <div className="flex flex-col max-w-[480px] bg-white border-1 radius-1 p-10">
        <div>
          <h2>Forgot Password</h2>
          <h5 className="mt-1">Enter your email to receive OTP</h5>
        </div>

        <div>
          <form onSubmit={handleSubmit}>
            <div className="mt-5">
              <label className="label-1">Email</label>
              <input
                className="w-[400px] h-[40px] text-gray-700 rounded-full input-text px-4 py-2 mt-2"
                type="email"
                name="email"
                placeholder="Email"
                required
              />
            </div>

            <div>
              <button
                className="w-[400px] h-[40px] text-center text-white rounded-full bg-orange mt-8"
                type="submit"
              >
                <h3>Send email</h3>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
