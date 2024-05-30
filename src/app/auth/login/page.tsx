"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
// import useLoginRequest from "@/hooks/useLogin";
// import useRedirectAuthenticated from "@/hooks/useRedirectAuthenticated";
import { signIn } from "next-auth/react";
import { useNotification } from "@/contexts/NotificationContext";

export default function LoginPage() {
  // useRedirectAuthenticated(); // TODO: Replace by server side props
  const { notify } = useNotification();

  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    const data = await signIn("credentials", {
      username: email,
      password: password,
      redirect: true,
      callbackUrl: "/",
    });

    if (!data) {
      // notify("Login failed!", "error");
    }
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="flex justify-center items-center h-full bg-gray">
      <div className="flex flex-col max-w-[480px] bg-white border-1 radius-1 p-10">
        <div>
          <h2>Log in to your account</h2>
          <h5 className="mt-1">Enter your email and password to log in</h5>
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
            <div className="mt-4 relative">
              <label className="label-1">Password</label>
              <input
                className="w-[400px] h-[40px] text-gray-700 rounded-full input-text px-4 py-2 mt-2"
                type={passwordVisible ? "text" : "password"}
                name="password"
                placeholder="Password"
                required
              />
              <div
                className="absolute top-[42px] right-[5px] pr-3 flex items-center cursor-pointer text-sm leading-5"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? (
                  <EyeSlashIcon className="w-5 h-5"></EyeSlashIcon>
                ) : (
                  <EyeIcon className="w-5 h-5"></EyeIcon>
                )}
              </div>
            </div>

            <div>
              <button
                className="w-[400px] h-[40px] text-center text-white rounded-full bg-orange mt-8"
                type="submit"
              >
                <h3>Log in</h3>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
