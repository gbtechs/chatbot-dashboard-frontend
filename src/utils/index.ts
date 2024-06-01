import { DecodedToken } from "@/types";
import { jwtDecode } from "jwt-decode";

export const validateToken = (token: string): boolean => {
  try {
    const decoded: DecodedToken = jwtDecode(token);
    if (decoded.exp * 1000 < Date.now()) {
      return false; // Token is expired
    }
    return true;
  } catch (error) {
    return false;
  }
};

export const GetAccessToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
};

export const format24HourTime = (dateString: string): string => {
  const date = new Date(dateString);

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const formattedTime = `${hours}:${minutes}`;

  return formattedTime;
};
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = String(date.getFullYear()).slice(-2);

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // The hour '0' should be '12'

  const formattedDate = `${day}/${month}/${year} . ${String(hours).padStart(
    2,
    "0"
  )}:${minutes} ${ampm}`;

  return formattedDate;
};

export const linkifyString = (text: string) => {
  if (!text) return text;

  const urlRegex = /((https?:\/\/)|(www\.))[^\s<]+/gi;

  const replacedText = text.replace(urlRegex, (url) => {
    let href = url;
    // Add http:// if URL doesn't start with http:// or https://
    if (!url.match(/^https?:\/\//i)) {
      href = "http://" + url;
    }
    return `<a class="text-url" href="${href}" target="_blank">${url}</a>`;
  });

  const spanTaggedText = `<span>${replacedText}</span>`;

  return spanTaggedText;
};
