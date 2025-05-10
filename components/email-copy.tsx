"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";

export function EmailCopyBox() {
  const [copied, setCopied] = useState(false);
  const email = "adityaofficial714@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000); // reset status setelah 2 detik
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 text-gray-400 mt-2 sm:mt-0 rounded-md border border-gray-600 px-4 py-2 font-mono text-sm shadow-sm hover:bg-gray-800 hover:text-white transition"
    >
      {copied ? (
        <CheckIcon className="h-4 w-4 text-green-400" />
      ) : (
        <CopyIcon className="h-4 w-4" />
      )}
      {email}
    </button>
  );
}
