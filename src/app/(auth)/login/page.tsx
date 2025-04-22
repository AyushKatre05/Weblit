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
import { signIn } from 'next-auth/react';
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string({ message: "Email is required" }).email().min(5).max(50),
  password: z
    .string({ message: "Password is required" })
    .min(8, { message: "Password must at least 8 characters" })
    .regex(/[A-Z]/, "Password at least one uppercase")
    .regex(/[a-z]/, "Password at least one lowercase")
    .regex(/[0-9]/, "Password at least one number")
    .regex(/[@#$%^&*]/, "Password at least one special character"),
});

const LoginPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    setIsLoading(false);

    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("Login successful");
      router.push("/dashboard");
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6 text-white">
      <div className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl p-10 max-w-lg w-full">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-6 drop-shadow-md">
          Welcome Back 👋
        </h1>
        <p className="text-center text-gray-700 mb-8">
          Login to access your Weblit editor dashboard.
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

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-800">Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your password"
                      type="password"
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

            <div className="ml-auto w-fit -mt-3 text-sm">
              <Link href="/forgot-password" className="text-indigo-600 hover:underline">
                Forgot Password?
              </Link>
            </div>

            <Button
              disabled={isLoading}
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-pink-500 hover:from-indigo-700 hover:to-pink-600 text-white font-bold px-6 py-3 rounded-full shadow-md transition-all"
            >
              {isLoading ? "Loading..." : "Login"}
            </Button>
          </form>
        </Form>

        <div className="text-center mt-6 text-gray-700">
          <p>
            Don't have an account? {" "}
            <Link href="/register" className="text-indigo-600 font-semibold hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;