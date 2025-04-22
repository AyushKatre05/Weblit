"use client";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { toast } from "sonner";
import Axios from "@/lib/Axios";

const formSchema = z
  .object({
    email: z.string({ message: "Email is required" }).email().min(5).max(50),
  });

const ForgotPassword = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const payload = {
      email: values.email,
    };

    try {
      setIsLoading(true);
      const response = await Axios.post("/api/auth/forgot-password", payload);

      if (response.status === 200) {
        toast.success(response.data.message);
        form.reset();
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6 text-white">
      <div className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl p-10 max-w-lg w-full">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-6 drop-shadow-md">
          Forgot Your Password?
        </h1>
        <p className="text-center text-gray-700 mb-8">
          Enter your email and we'll send you a password reset link.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-800">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      {...field}
                      disabled={isLoading}
                      value={field.value ?? ""}
                      className="bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-indigo-400 text-gray-800"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={isLoading}
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-pink-500 hover:from-indigo-700 hover:to-pink-600 text-white font-bold px-6 py-3 rounded-full shadow-md transition-all"
            >
              {isLoading ? "Loading..." : "Send Reset Link"}
            </Button>
          </form>
        </Form>

        <div className="text-center mt-6">
          <p className="text-gray-700">
            Remember your password? {" "}
            <Link href="/login" className="text-indigo-600 font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
