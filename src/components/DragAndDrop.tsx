"use client";

import React, { useRef, useState } from "react";
import useApiRequest from "@/hooks/useApiRequest";
import { useRouter } from "next/navigation";
import { useNotification } from "@/contexts/NotificationContext";
import { title } from "process";

interface Props {
  title?: string;
  onFileSave: () => void;
}

const DragAndDrop: React.FC<Props> = ({ title, onFileSave }) => {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const inputRef = useRef<any>(null);
  const [files, setFiles] = useState<any>([]);
  const router = useRouter();
  const { notify } = useNotification();
  const { loading, error, makeRequest } = useApiRequest();
  const allowedFiles = [".doc", ".docx", ".txt"];

  async function saveFiles(docs: any) {
    const formData = new FormData();

    Array.from(docs).forEach((doc: any) => {
      formData.append("files", doc);
    });

    try {
      await makeRequest("/document", "POST", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      notify("Your file(s) have been uploaded successfully!", "success");
      onFileSave();
    } catch (error) {}
  }

  function handleChange(e: any) {
    e.preventDefault();

    if (e.target.files && e.target.files[0]) {
      //   for (let i = 0; i < e.target.files["length"]; i++) {
      //     setFiles((prevState: any) => [...prevState, e.target.files[i]]);
      //   }

      saveFiles(e.target.files);
    }
  }

  function handleDrop(e: any) {
    e.preventDefault();
    e.stopPropagation();

    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      for (let i = 0; i < e.dataTransfer.files["length"]; i++) {
        if (
          !allowedFiles.includes(
            "." + getExtension(e.dataTransfer.files[i].name)
          )
        ) {
          notify(`Only ${allowedFiles.join(", ")} files are allowed`, "error");
          return;
          //   setFiles((prevState: any) => [...prevState, e.dataTransfer.files[i]]);
        }
      }
      saveFiles(e.dataTransfer.files);
    }
  }

  async function handleSubmitFile(e: any) {
    e.preventDefault();
    // saveFiles();
  }

  function getExtension(filename: string) {
    return filename.split(".").pop();
  }

  function handleDragLeave(e: any) {
    e.preventDefault();
    e.stopPropagation();

    setDragActive(false);
  }

  function handleDragOver(e: any) {
    e.preventDefault();
    e.stopPropagation();

    setDragActive(true);
  }

  function handleDragEnter(e: any) {
    e.preventDefault();
    e.stopPropagation();

    setDragActive(true);
  }

  function removeFile(fileName: any, idx: any) {
    const newArr = [...files];
    newArr.splice(idx, 1);

    setFiles([]);
    setFiles(newArr);
  }

  function openFileExplorer() {
    inputRef.current.value = "";
    inputRef.current.click();
  }

  return (
    <form
      className={`${
        dragActive ? "bg-blue-100 " : ""
      }h-full flex flex-col items-center`}
      onDragEnter={handleDragEnter}
      onSubmit={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
    >
      {/* this input element allows us to select files for upload. We make it hidden so we can activate it when the user clicks select files */}
      <input
        placeholder="fileInput"
        className="hidden"
        ref={inputRef}
        type="file"
        multiple={true}
        onChange={handleChange}
        accept={allowedFiles.join(",")}
      />

      <div
        className="flex flex-col items-center m-auto w-full p-8 cursor-pointer"
        onClick={openFileExplorer}
      >
        <img
          src="/icons/document-up.svg"
          alt="doc"
          className="w-[50px] h-[50px] mb-4"
        />

        {title && <h2 className="mb-2">{title}</h2>}

        <h5 className="mt-4">
          Drag & Drop files here, or click to select files.
        </h5>
        <div className="max-w-[350px] mt-4 font-primary text-center">
          We currently support <strong>.docs</strong> and <strong>.txt</strong>{" "}
          file types. Our system automatically filters out any invalid file
          types, ensuring a smooth and efficient process.
        </div>
      </div>
    </form>
  );
};

export default DragAndDrop;
