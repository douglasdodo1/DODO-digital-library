import { useForm } from "react-hook-form";
import { Form, FormField, FormItem } from "./ui/form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Mail, User, Eye, EyeOff, Book } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export function RegisterComponent() {
  const form = useForm();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  return (
    <Form {...form}>
      <form className="space-y-8">
        <div className="w-full flex gap-4">
          <div className="flex flex-col w-1/2">
            <Label className="pb-2 text-amber-800 font-medium">CPF</Label>
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-amber-600" />
                    <Input type="text" placeholder="Digite seu CPF" {...field} className="pl-10" />
                  </div>
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col w-1/2">
            <Label className="pb-2 text-amber-800 font-medium">Nome</Label>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-amber-600" />
                    <Input type="text" placeholder="Digite seu nome" {...field} className="pl-10 " />
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <Label className="pb-2 text-amber-800 font-medium">E-mail</Label>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-amber-600" />
                  <Input type="email" placeholder="Digite seu e-mail" {...field} className="pl-10" />
                </div>
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col">
          <Label className="pb-2 text-amber-800 font-medium">Senha</Label>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="relative">
                  {" "}
                  <Input type="password" placeholder="*******" {...field} className="border rounded px-3 py-2 w-full" />
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
        <div className="flex flex-col">
          <Label className="absolute left-3 top-3 h-4 w-4 text-amber-600">Confirmar senha</Label>
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <div className="relative w-full">
                  <Input type="password" placeholder="*******" {...field} className="border rounded px-3 py-2 w-full" />
                </div>
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full bg-amber-600 hover:bg-amber-800 text-white">
          <Book className="w-4 h-4 mr-2" />
          Cadastrar
        </Button>
      </form>
    </Form>
  );
}
