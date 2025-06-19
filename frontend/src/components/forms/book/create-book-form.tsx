import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createBook } from "@/graphql/book/mutations/create-book";
import { BookDto } from "@/dtos/book-dto";
import { getAllBooks } from "@/graphql/book/mutations/get-all-books";
import { createBookSchema } from "../../schemas/book/create-book-schema";

type CreateBookFormData = z.infer<typeof createBookSchema>;

interface BookFormProps {
  onSuccess?: () => void;
  setBookList: React.Dispatch<React.SetStateAction<BookDto[]>>;
}

export function BookForm({ onSuccess, setBookList }: BookFormProps) {
  const form = useForm<CreateBookFormData>({
    resolver: zodResolver(createBookSchema),
    defaultValues: {
      isbn: "",
      title: "",
      authorName: "",
      pageNumbers: 0,
      category: "",
      description: "",
      publicationDate: "",
      status: "rascunho",
      authorType: "person",
      personDateOfBirth: "",
      institutionCity: "",
    },
  });

  const authorType = useWatch({
    control: form.control,
    name: "authorType",
  });

  const onSubmit = async (data: CreateBookFormData) => {
    data = {
      ...data,
      personDateOfBirth: data.authorType === "person" ? data.personDateOfBirth : undefined,
      institutionCity: data.authorType === "institution" ? data.institutionCity : undefined,
    };

    const Response = await createBook(data);
    if (Response.data) {
      const books = await getAllBooks();
      setBookList(books);
      onSuccess?.();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-6">
            <FormField
              control={form.control}
              name="isbn"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>ISBN</FormLabel>
                  <FormControl>
                    <Input placeholder="978-3-16-148410-0" {...field} />
                  </FormControl>
                  <div className="min-h-[1.25rem]">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="Título do livro" {...field} />
                  </FormControl>
                  <div className="min-h-[1.25rem]">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-row flex-wrap gap-x-6 gap-y-2 items-start">
            <FormField
              control={form.control}
              name="authorName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Autor</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do autor" {...field} />
                  </FormControl>
                  <div className="min-h-[1.25rem]">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="authorType"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Tipo de Autor</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="person">Pessoa</SelectItem>
                      <SelectItem value="institution">Instituição</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="min-h-[1.25rem]">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>

          {authorType === "person" && (
            <div className="flex gap-6">
              <FormField
                control={form.control}
                name="personDateOfBirth"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Data de Nascimento</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <div className="min-h-[1.25rem]">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
          )}

          {authorType === "institution" && (
            <div className="flex gap-6">
              <FormField
                control={form.control}
                name="institutionCity"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Cidade da Instituição</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: São Paulo" {...field} />
                    </FormControl>
                    <div className="min-h-[1.25rem]">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
          )}

          <div className="flex gap-6">
            <FormField
              control={form.control}
              name="pageNumbers"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Número de Páginas</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Ex: 300"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <div className="min-h-[1.25rem]">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Categoria</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Romance, Ciência" {...field} />
                  </FormControl>
                  <div className="min-h-[1.25rem]">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-6">
            <FormField
              control={form.control}
              name="publicationDate"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Data de Publicação</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <div className="min-h-[1.25rem]">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="rascunho">Rascunho</SelectItem>
                      <SelectItem value="publicado">Publicado</SelectItem>
                      <SelectItem value="enviado">Enviado</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="min-h-[1.25rem]">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Textarea placeholder="Descrição do livro" {...field} />
                </FormControl>
                <div className="min-h-[1.25rem]">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => onSuccess?.()}>
              Cancelar
            </Button>
            <Button
              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
              type="submit"
            >
              Cadastrar Livro
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
