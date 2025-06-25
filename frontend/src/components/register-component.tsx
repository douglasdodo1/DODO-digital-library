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
import { createUser } from "@/graphql/user/mutations/create-user";
import { Label } from "./ui/label";

interface RegisterComponentProps {
  onSuccess?: () => void;
}

export function RegisterComponent({ onSuccess }: RegisterComponentProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const router = useRouter();
  type CreateUserFormData = z.infer<typeof createUserSchema>;

  const form = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      cpf: "",
      name: "",
      mail: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    setIsSuccess(false);
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  const setErrors = (errors: { message: string }[]) => {
    errors.forEach((error) => {
      if (error.message.toLowerCase().includes("mail")) {
        form.setError("mail", { message: "E-mail já cadastrado" });
      }

      if (error.message.includes("PG::UniqueViolation") && error.message.includes("cpf")) {
        form.setError("cpf", { message: "CPF já cadastrado" });
      } else if (error.message.includes("Cpf is not valid")) {
        form.setError("cpf", { message: "Cpf é inválido" });
      }
    });
  };

  const onSubmit = async (data: CreateUserFormData) => {
    setIsLoading(true);
    const input = {
      cpf: data.cpf,
      name: data.name,
      mail: data.mail,
      password: data.password,
    };

    const Response = await createUser(input);
    setIsLoading(false);

    if (Response.data) {
      setIsSuccess(true);
    } else {
      console.log("Encontrei erros", Response.errors);
      setIsSuccess(false);
      setErrors(Response.errors);
    }

    onSuccess?.();
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
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-3">
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
                  <div className="min-h-2">
                    <FormMessage />
                  </div>
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
                      <User className="absolute left-3 top-3 h-4 w-4 text-amber-600" />
                      <Input type="text" placeholder="Digite seu nome" {...field} className="pl-10" />
                    </div>
                  </FormControl>
                  <div className="min-h-2">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="mail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <div className="relative ">
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
                      className="border rounded px-3  w-full"
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
                      className="border rounded px-3 w-full"
                    />
                  </div>
                </FormControl>
                <div className="min-h-2">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-800 text-white mt-3">
          <Book className="w-4 h-4 mr-2" />
          Cadastrar
        </Button>

        {isSuccess && (
          <Label className="w-full flex justify-center pt-2 text-amber-600">Conta criada com sucesso!</Label>
        )}
      </form>
    </Form>
  );
}
