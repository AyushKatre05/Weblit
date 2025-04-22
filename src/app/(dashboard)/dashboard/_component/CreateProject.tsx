"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Axios from "@/lib/Axios";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type TCreateProject = {
  buttonVarient?: "outline" | "default";
};

const CreateProject = ({ buttonVarient }: TCreateProject) => {
  const [projectName, setProjectName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCreateProject = async (e: any) => {
    e.preventDefault();

    if (!projectName) {
      toast.error("Project name is required");
      return;
    }

    try {
      setIsLoading(true);
      const response = await Axios.post("/api/project", {
        name: projectName,
      });

      if (response.status === 201) {
        toast.success(response.data.message);
        router.push(`/editor/${response?.data?.data?._id}?file=index.html`);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={buttonVarient ?? "outline"}
          className="cursor-pointer my-4 mx-2 font-medium tracking-wide"
        >
          + Create Project
        </Button>
      </DialogTrigger>
      <DialogContent
        className={cn(
          "backdrop-blur-xl bg-white/10 border border-white/20",
          "shadow-xl rounded-2xl p-6 space-y-4 max-w-sm mx-auto"
        )}
      >
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold tracking-wide text-white drop-shadow">
            Start a New Project
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleCreateProject} className="space-y-4">
          <Input
            disabled={isLoading}
            placeholder="Name your project"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="bg-white/10 backdrop-blur-md border-white/20 placeholder:text-white/50 text-white"
          />
          <Button
            disabled={isLoading}
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:opacity-90 text-white font-semibold tracking-wide"
          >
            {isLoading ? "Creating..." : "Create Project"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProject;
