"use client";
import React, { useEffect, useState } from "react";
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
import Axios from "@/lib/Axios";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";

const formSchema = z
  .object({
    password: z
      .string({ message: "Password is required" })
      .min(8, { message: "Password must at least 8 characters" })
      .regex(/[A-z]/, "Password at leat One Uppercase")
      .regex(/[a-z]/, "Password at least one lowercase")
      .regex(/[0-9]/, "Password at least one number")
      .regex(/[@#$%^&*]/, "Password at least one special character"),
    confirmPassword: z.string({ message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and confirm password must be same",
    path: ["confirmPassword"],
  });

const ResetPassword = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const resetPasswordToken = searchParams.get("token");
  const [isValidTokenLoading, setIsValidTokenLoading] = useState(true);
  const [isExpiredToken, setIsExpiredToken] = useState(true);
  const [userId, setUserId] = useState("");

  const verifyResetPasswordToken = async () => {
    const payload = {
      token: resetPasswordToken,
    };
    try {
      setIsValidTokenLoading(true);
      const response = await Axios.post(
        "/api/auth/verify-forgot-password-token",
        payload
      );

      if (response.status === 200) {
        setUserId(response?.data?.userId);
        setIsExpiredToken(response?.data?.expired);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
    } finally {
      setIsValidTokenLoading(false);
    }
  };

  useEffect(() => {
    if (resetPasswordToken) {
      verifyResetPasswordToken();
    } else {
      router.push("/forgot-password");
    }
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const payload = {
      userId: userId,
      password: values.password,
    };

    try {
      setIsLoading(true);
      const response = await Axios.post("/api/auth/reset-password", payload);

      if (response.status === 200) {
        toast.success(response.data.message);
        form.reset();
        router.push("/login");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-xl text-white">
        <h1 className="text-2xl font-bold text-center mb-6">Reset Password</h1>
        {isValidTokenLoading ? (
          <Card className="bg-white/10 text-white text-center py-6">Loading...</Card>
        ) : isExpiredToken ? (
          <Card className="bg-red-500/10 text-red-300 text-center py-6">Link is expired...</Card>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your password"
                        {...field}
                        disabled={isLoading}
                        type="password"
                        value={field.value ?? ""}
                        className="bg-white/10 border-white/20 focus:ring-2 focus:ring-indigo-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter confirm password"
                        {...field}
                        disabled={isLoading}
                        type="password"
                        value={field.value ?? ""}
                        className="bg-white/10 border-white/20 focus:ring-2 focus:ring-indigo-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={isLoading}
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                {isLoading ? "Loading..." : "Reset Password"}
              </Button>
            </form>
          </Form>
        )}

        <div className="mt-6 text-center text-sm">
          Already have an account? {" "}
          <Link href="/login" className="text-indigo-400 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
