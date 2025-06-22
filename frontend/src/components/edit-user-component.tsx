"use client";

import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Mail, User, Book } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { userDto } from "@/dtos/user-dto";
import { getUser } from "@/graphql/user/mutations/get-user";
import { editUser } from "@/graphql/user/mutations/edit-user";

const editUserSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Nome deve conter pelo menos 3 caracteres" })
    .max(100, { message: "Nome deve conter no máximo 100 caracteres" }),
  mail: z.string().email({ message: "E-mail inválido" }),
});
type EditUserFormData = z.infer<typeof editUserSchema>;

export function EditUserComponent({ onSuccess }: { onSuccess?: () => void }) {
  const router = useRouter();
  const [user, setUser] = useState<userDto>();

  const form = useForm<EditUserFormData>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      name: "",
      mail: "",
    },
  });

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const res = await getUser();
        if (res?.data?.userAuthenticated) {
          const u = res.data.userAuthenticated;
          setUser(u);
          console.log(user);

          form.reset({ name: u.name, mail: u.mail });
        }
      }
    };
    fetchUser();
  }, [router, form]);

  const onSubmit = async (data: EditUserFormData) => {
    await editUser(data);
    onSuccess?.();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <div className="flex flex-row flex-wrap gap-x-6 gap-y-4 items-start">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-amber-600" />
                    <Input {...field} className="pl-10" value={field.value ?? ""} />
                  </div>
                </FormControl>
                <FormMessage />
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
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-amber-600" />
                  <Input {...field} className="pl-10" value={field.value ?? ""} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex justify-center">
          <Button type="submit" className="w-1/2 bg-amber-600 hover:bg-amber-800 text-white">
            <Book className="w-4 h-4 mr-2" />
            Editar
          </Button>
        </div>
      </form>
    </Form>
  );
}
