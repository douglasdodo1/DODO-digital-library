"use client";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem } from "./ui/form";
import { useEffect, useState } from "react";
import { BookOpen, Eye, EyeOff } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { AuthDto } from "@/dtos/auth-dto";
import { auth } from "@/graphql/user/mutations/auth";
import { useRouter } from "next/navigation";
import { set } from "zod";
import { Label } from "./ui/label";

interface Props {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}
export function LoginComponent({ setIsLogin }: Props) {
  const form = useForm<AuthDto>({
    defaultValues: {
      mail: "",
      password: "",
    },
  });

  const router = useRouter();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.push("/dashboard");
    }
  }, [router, isLoading]);

  const onSubmit = async (data: AuthDto) => {
    setIsLoading(true);
    const response = await auth(data);
    const token = response?.data?.loginUser?.token;

    if (token) {
      localStorage.setItem("token", token);
      router.push("/dashboard");
    } else {
      setErrors(response.data.loginUser.errors);
      console.error("Token não recebido");
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="mail"
          render={({ field }) => (
            <FormItem>
              <Input
                type="email"
                placeholder="Digite seu e-mail"
                {...field}
                className="border rounded px-3 py-2 w-full"
              />
            </FormItem>
          )}
        />
        <div className="">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua senha"
                    {...field}
                    className="border rounded px-3 py-2 w-full"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-amber-600 hover:text-amber-800"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </FormItem>
            )}
          />
        </div>
        {errors && errors.length > 0 && (
          <div className="text-red-500">
            {errors.map((error, index) => (
              <Label key={index}>{error}</Label>
            ))}
          </div>
        )}
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-medium py-2.5"
        >
          <BookOpen className="w-4 h-4 mr-2" />
          Entrar na Biblioteca
        </Button>

        <div className="text-center">
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className="text-sm text-amber-700 hover:text-amber-900 hover:underline"
          >
            Esqueceu sua senha?
          </button>
        </div>
      </form>
    </Form>
  );
}
