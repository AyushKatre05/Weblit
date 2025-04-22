"use client";
import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Axios from "@/lib/Axios";
import { toast } from "sonner";
import CreateProject from "./_component/CreateProject";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { PlusCircle } from "lucide-react";

const DashboardPage = () => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const router = useRouter();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await Axios({
        url: "/api/project",
        params: { page },
      });

      if (response.status === 200) {
        setData(response.data.data || []);
        setTotalPage(response.data.totalPages);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleRedirectEditorpage = (projectId: string) => {
    router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/editor/${projectId}?file=index.html`);
  };

  return (
    <div>
      {isLoading ? (
        <p className="my-4 text-center text-muted-foreground">Loading...</p>
      ) : data.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] text-center px-4">
          <div className="bg-muted rounded-full p-4 mb-4">
            <PlusCircle className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-xl font-semibold mb-2">No Projects Yet</h2>
          <p className="text-muted-foreground mb-4 max-w-sm">
            Start building something awesome by creating your first project.
          </p>
          <CreateProject buttonVarient="default" />
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2 p-4 lg:p-6">
          {data.map((item) => (
            <Card
              onClick={() => handleRedirectEditorpage(item?._id)}
              key={item?._id}
              className="cursor-pointer group hover:shadow-lg transition"
            >
              <CardHeader>
                <CardTitle className="truncate">{item.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border bg-muted min-h-60 overflow-hidden transition-all relative">
                  <iframe
                    className="w-full h-60 border-none"
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}/api/file/${item._id}/index.html`}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
