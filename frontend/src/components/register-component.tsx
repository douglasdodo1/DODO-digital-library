"use client";

import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Mail, User, Eye, EyeOff, Book } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { createUserSchema } from "./schemas/create-user-schema";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface RegisterComponentProps {
  onSuccess?: () => void;
}

export function RegisterComponent({ onSuccess }: RegisterComponentProps) {
  type CreateUserFormData = z.infer<typeof createUserSchema>;

  const form = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      cpf: "",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleRegister = form.handleSubmit(async (data) => {
    try {
      console.log("Dados para cadastro:", data);
      if (onSuccess) {
        onSuccess();
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.error("Erro no cadastro:", error);
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={handleRegister} className="space-y-2">
        <div className="flex flex-row flex-wrap gap-x-6 items-start">
          <FormField
            control={form.control}
            name="cpf"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>CPF</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-amber-600" />
                    <Input type="text" placeholder="Digite seu CPF" {...field} className="pl-10" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-amber-600" />
                    <Input type="text" placeholder="Digite seu nome" {...field} className="pl-10" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-amber-600" />
                  <Input type="email" placeholder="Digite seu e-mail" {...field} className="pl-10" />
                </div>
              </FormControl>
              <div className="min-h-2">
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="*******"
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
              </FormControl>
              <div className="min-h-2">
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar senha</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="*******"
                    {...field}
                    className="border rounded px-3 py-2 w-full"
                  />
                </div>
              </FormControl>
              <div className="min-h-2">
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-800 text-white">
          <Book className="w-4 h-4 mr-2" />
          Cadastrar
        </Button>
      </form>
    </Form>
  );
}
