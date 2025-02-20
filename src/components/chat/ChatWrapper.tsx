"use client";
import React from "react";
import Messages from "../Messages";
import ChatInput from "./ChatInput";
import { trpc } from "@/app/_trpc/client";
import { ChevronLeft, Loader2, XCircle } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
interface chatWrapperProps {
  fileID: string;
}
const ChatWrapper = ({ fileID }: chatWrapperProps) => {
  const { data, isLoading } = trpc.getFileUploadStatus.useQuery(
    {
      fileID,
    },
    {
      refetchInterval: (data) =>
        data?.status === "SUCCESS" || data?.status === "FAILED" ? false : 500,
    }
  );
  if (isLoading)
    return (
      <div className="relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2">
        <div className="flex-1 flex justify-center items-center flex-col mb-28">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <h3 className="font-semibold text-xl">Loading...</h3>
            <p className="text-zinc-500 text-sm ">
              we&apos;re prepairing your PDF.
            </p>
          </div>
        </div>
        <ChatInput />
      </div>
    );
  if (data?.status === "PROCESSING")
    return (
      <div className="relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2">
        <div className="flex-1 flex justify-center items-center flex-col mb-28">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <h3 className="font-semibold text-xl">Processing...</h3>
            <p className="text-zinc-500 text-sm ">This won&apos;t take long.</p>
          </div>
        </div>
        <ChatInput />
      </div>
    );
  if (data?.status === "FAILED")
    return (
      <div className="relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2">
        <div className="flex-1 flex justify-center items-center flex-col mb-28">
          <div className="flex flex-col items-center gap-2">
            <XCircle className="w-8 h-8 text-red-500" />
            <h3 className="font-semibold text-xl text-zinc-600">
              Too many pages in PDF...
            </h3>
            <p className="text-zinc-500 text-sm ">
              Your <span className="font-medium">Free</span> plan supports up to
              5 pages per PDF.
            </p>

            <Link
              href="/dashboard"
              className={buttonVariants({
                variant: "secondary",
                className: "mt-4",
              })}
            >
              <ChevronLeft className="h-3 w-3 mr-1.5rem" /> Back
            </Link>
          </div>
        </div>
        <ChatInput />
      </div>
    );
  return (
    <div className="relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2">
      <div className="flex-1 justify-between flex flex-col mb-28">
        <Messages />
      </div>
      <ChatInput />
    </div>
  );
};

export default ChatWrapper;
