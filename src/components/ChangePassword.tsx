import { useNotification } from "@/contexts/NotificationContext";
import useApiRequest from "@/hooks/useApiRequest";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

interface Props {
  email?: string;
}

export const ChangePassword: React.FC<Props> = ({ email }) => {
  const { makeRequest } = useApiRequest();
  const { notify } = useNotification();

  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);

      const new_password = formData.get("new_password")?.toString();
      const retyped_password = formData.get("retyped_password")?.toString();

      if (new_password !== retyped_password) {
        notify("Passwords do not match", "error");
        return;
      }

      if (email) {
        const otp = formData.get("otp")?.toString();
        await makeRequest("/reset_password", "POST", {
          email,
          otp,
          new_password,
          retyped_password,
        });
      } else {
        const current_password = formData.get("current_password")?.toString();
        await makeRequest("/change_password", "POST", {
          current_password,
          new_password,
          retyped_password,
        });
      }

      router.push("/");
      notify("Password changed", "success");
    } catch (error) {
      notify(error, "error");
    }
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const resendEmail = async () => {
    try {
      await makeRequest("/forgot_password", "POST", { email });
      notify("Email sent. Please check your Inbox / Spam folders", "success");
    } catch (error) {
      notify(error, "error");
    }
  };

  return (
    <div className="flex justify-center items-center h-full w-full bg-gray">
      <div className="flex flex-col max-w-[480px] bg-white border-1 radius-1 p-10">
        <div>
          <h2>Change your password</h2>
          <h5 className="mt-1">
            Enter your current and new password to change
          </h5>
        </div>

        <div>
          <form onSubmit={handleSubmit}>
            {!email && (
              <div className="mt-5">
                <label className="label-1">Current password</label>
                <input
                  className="w-[400px] h-[40px] text-gray-700 rounded-full input-text px-4 py-2 mt-2"
                  type="password"
                  name="current_password"
                  placeholder="Current password"
                  required
                />
              </div>
            )}

            {email && (
              <div className="mt-5">
                <label className="label-1">OTP</label>
                <input
                  className="w-[400px] h-[40px] text-gray-700 rounded-full input-text px-4 py-2 mt-2"
                  type="password"
                  name="otp"
                  placeholder="OTP"
                  required
                />
              </div>
            )}

            <div className="mt-4 relative">
              <label className="label-1">New password</label>
              <input
                className="w-[400px] h-[40px] text-gray-700 rounded-full input-text px-4 py-2 mt-2"
                type={passwordVisible ? "text" : "password"}
                name="new_password"
                placeholder="New password"
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

            <div className="mt-4">
              <label className="label-1">Confirm new password</label>
              <input
                className="w-[400px] h-[40px] text-gray-700 rounded-full input-text px-4 py-2 mt-2"
                type="password"
                name="retyped_password"
                placeholder="Confirm new password"
                required
              />
            </div>

            <div>
              <button
                className="w-[400px] h-[40px] text-center text-white rounded-full bg-orange mt-8"
                type="submit"
              >
                <h3>Change Password</h3>
              </button>

              {email && (
                <h5 className="text-center mt-4">
                  Didn&apos;t receive an email?{" "}
                  <span
                    className="text-url cursor-pointer"
                    onClick={resendEmail}
                  >
                    Resend
                  </span>
                </h5>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
