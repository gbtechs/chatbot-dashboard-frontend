"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useNotification } from "@/contexts/NotificationContext";

export default function SignupPage() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { notify } = useNotification();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const contactName = formData.get("contactName");
    const companyName = formData.get("companyName");
    const email = formData.get("email");
    const password = formData.get("password");

    notify(`${contactName} ${companyName} created successfully`, "success");
    return;

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      router.push("/");
    } else {
      // Handle errors
    }
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="flex justify-center items-center h-full w-full bg-gray">
      <div className="flex flex-col max-w-[480px] bg-white border-1 radius-1 p-10">
        <div>
          <h2>Create a new account</h2>
          <h5 className="mt-1">Enter the following information to sign up</h5>
        </div>

        <div>
          <form onSubmit={handleSubmit}>
            <div className="mt-5">
              <label className="label-1">Contact Name</label>
              <input
                className="w-[400px] h-[40px] text-gray-700 rounded-full input-text px-4 py-2 mt-2"
                type="text"
                name="contactName"
                placeholder="Contact Name"
                //   required
              />
            </div>
            <div className="mt-4">
              <label className="label-1">Company Name</label>
              <input
                className="w-[400px] h-[40px] text-gray-700 rounded-full input-text px-4 py-2 mt-2"
                type="text"
                name="companyName"
                placeholder="Company Name"
                //   required
              />
            </div>
            <div className="mt-4">
              <label className="label-1">Email</label>
              <input
                className="w-[400px] h-[40px] text-gray-700 rounded-full input-text px-4 py-2 mt-2"
                type="email"
                name="email"
                placeholder="Email"
                //   required
              />
            </div>
            <div className="mt-4 relative">
              <label className="label-1">Password</label>
              <input
                className="w-[400px] h-[40px] text-gray-700 rounded-full input-text px-4 py-2 mt-2"
                type={passwordVisible ? "text" : "password"}
                name="password"
                placeholder="Password"
                //   required
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
                <h3>Sign up</h3>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
