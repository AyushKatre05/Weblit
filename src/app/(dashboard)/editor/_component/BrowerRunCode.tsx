"use client";
import React, { useRef, useState } from "react";
import { useEditorContext } from "../_provider/EditorProvider";
import * as motion from "motion/react-client";
import { Resizable } from "re-resizable";
import { ExternalLink, RotateCw, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useParams, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSession } from "next-auth/react";

const BrowerRunCode = ({ children }: { children: React.ReactNode }) => {
  const { openBrowser, setOpenBrowser } = useEditorContext();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [drag, setDrag] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(true);

  const searchParams = useSearchParams();
  const fileName = searchParams.get("file");
  const [input, setInput] = useState<string>(`/${fileName}` || "");
  const { projectId } = useParams();
  const session = useSession();

  const handleMouseDown = () => setDrag(true);
  const handleMouseUp = () => setDrag(false);

  const handleRefresh = () => {
    setRefresh(false);
    setTimeout(() => setRefresh(true), 500);
  };

  return (
    <div ref={containerRef}>
      {children}

      {openBrowser && (
        <motion.div
          drag={drag}
          dragConstraints={containerRef}
          dragElastic={0.2}
          className="absolute right-2 top-2 z-50"
        >
          <Resizable
            className="shadow-xl rounded-md overflow-hidden bg-white border min-w-[320px] min-h-[240px]"
            defaultSize={{
              width: 500,
              height: 400,
            }}
            enable={{
              top: false,
              right: true,
              bottom: true,
              left: false,
              topRight: true,
              bottomRight: true,
              bottomLeft: true,
              topLeft: true,
            }}
          >
            {/* Header / Title Bar */}
            <div
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              className="bg-primary text-white h-8 flex items-center justify-between px-2 cursor-grab"
            >
              <span className="text-sm font-semibold">Browser Preview</span>
              <X
                className="w-4 h-4 cursor-pointer hover:opacity-80"
                onClick={() => setOpenBrowser(false)}
              />
            </div>

            {/* URL Bar */}
            <div className="relative border-b px-1 py-1 bg-muted">
              <Input
                className="h-8 rounded-sm pl-8 pr-8 text-sm"
                placeholder="Enter path (e.g., /index.html)"
                onChange={(e) => setInput(e.target.value)}
                value={input}
              />

              <RotateCw
                size={16}
                onClick={handleRefresh}
                className={cn(
                  "absolute left-2 top-2 text-gray-500 hover:text-primary cursor-pointer",
                  !refresh && "animate-spin"
                )}
              />

              <Link
                href={`/browser/${session?.data?.user?.name}/${projectId}/${input}`}
                target="_blank"
              >
                <ExternalLink
                  size={16}
                  className="absolute right-2 top-2 text-gray-500 hover:text-primary cursor-pointer"
                />
              </Link>
            </div>

            {/* Preview Content */}
            <div className="h-full w-full bg-white">
              {refresh && (
                <iframe
                  className="w-full h-full"
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}/api/file/${projectId}/${input}`}
                />
              )}
            </div>
          </Resizable>
        </motion.div>
      )}
    </div>
  );
};

export default BrowerRunCode;
