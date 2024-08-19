"use client";

import { FormEvent, useRef, useState } from "react";
import { useNotification } from "@/contexts/NotificationContext";
import { Dropdown } from "@/components/Dropdown";
import useApiRequest from "@/hooks/useApiRequest";

export default function SupportPage() {
  const inputRef = useRef<any>(null);
  const { makeRequest } = useApiRequest();
  const [file, setFile] = useState<any>(null);
  const [category, setCategory] = useState<string>("");
  const { notify } = useNotification();
  const issueTypes = [
    { key: "Technical Issue", value: "Technical Issue" },
    { key: "Account/Billing Issue", value: "Account/Billing Issue" },
    { key: "Feature Request", value: "Feature Request" },
    { key: "Other", value: "Other" },
  ];

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      formData.append("category", category);
      formData.delete("file");

      if (file) {
        formData.append("attachment", file);
      }

      await callSupport(formData);
    } catch (error) {
      console.error(error);
    }
  }

  const callSupport = async (data: FormData) => {
    try {
      await makeRequest("/contact", "POST", data, {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      });

      notify(`Message sent. Our team will get back to you shortly.`, "success");
    } catch (error) {
      notify(error, "error");
    }
  };

  const openFileExplorer = () => {
    inputRef.current.value = "";
    inputRef.current.click();
  };

  const handleChange = (e: any) => {
    e.preventDefault();

    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const onIssueTypeChange = (type: string) => {
    setCategory(type);
  };

  return (
    <div>
      <div className="pl-6 pt-6">
        <h2>Support</h2>
        <h5 className="mt-1">
          Please fill out the form below so we can assist you promptly.
        </h5>
      </div>
      <div className="flex justify-center items-center h-full w-full bg-gray">
        <div className="flex flex-col max-w-[480px] bg-white border-1 radius-1 p-10">
          <div>
            <form onSubmit={handleSubmit}>
              <div>
                <label className="label-1">Full Name</label>
                <input
                  className="w-[400px] h-[40px] text-gray-700 text-sm rounded-full input-text px-4 py-2 mt-2"
                  type="text"
                  name="name"
                  placeholder="Full name"
                  required
                />
              </div>

              <div className="mt-4">
                <label className="label-1">Email</label>
                <input
                  className="w-[400px] h-[40px] text-gray-700 text-sm rounded-full input-text px-4 py-2 mt-2"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>

              <div className="mt-4">
                <label className="label-1">Category of Issue</label>
                <div className="mt-2">
                  <Dropdown
                    options={issueTypes}
                    classes="w-full px-4"
                    placeholder="Category of Issue"
                    onSelect={(option) => onIssueTypeChange(option.value)}
                  />
                </div>
              </div>

              <div className="mt-4 relative">
                <label className="label-1">Attachment</label>
                <input
                  className="w-[400px] h-[40px] text-gray-700 text-sm rounded-full input-text cursor-pointer px-4 py-2 mt-2"
                  type="text"
                  name="attachment"
                  readOnly
                  value={file ? file.name : ""}
                  placeholder="Screenshots, error logs, or other files"
                  onClick={() => openFileExplorer()}
                  //   required
                />
                <div
                  className="absolute top-[42px] right-[4px] pr-3 flex items-center cursor-pointer text-sm leading-5"
                  onClick={openFileExplorer}
                >
                  <img src="/icons/attachment.svg" alt="File" />
                </div>

                <input
                  ref={inputRef}
                  placeholder="fileInput"
                  className="hidden"
                  type="file"
                  // multiple={true}
                  onChange={handleChange}
                />
              </div>

              <div className="mt-4">
                <label className="label-1">Message</label>
                <textarea
                  className="w-[400px] h-[100px] text-gray-700 text-sm radius-1 input-text px-4 py-3 mt-2"
                  name="message"
                  placeholder="Please describe your issue so we can assist you promptly."
                  required
                />
              </div>

              <div>
                <button
                  className="w-[400px] h-[40px] text-center text-white rounded-full bg-orange mt-4"
                  type="submit"
                >
                  <h3>Submit</h3>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
