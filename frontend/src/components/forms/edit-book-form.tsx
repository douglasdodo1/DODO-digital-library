import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookDto } from "@/dtos/book-dto";
import { getAllBooks } from "@/graphql/book/mutations/get-all-books";
import { createBookSchema } from "../schemas/book/create-book-schema";
import { editBook } from "@/graphql/book/mutations/edit-book";

const updateBookSchema = createBookSchema.partial();
type updateBookFormData = z.infer<typeof updateBookSchema>;

interface BookFormProps {
  onSuccess?: () => void;
  setBookList: React.Dispatch<React.SetStateAction<BookDto[]>>;
  editingBook: BookDto;
  setIsEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function EditBookForm({ onSuccess, setBookList, editingBook, setIsEditDialogOpen }: BookFormProps) {
  const form = useForm<updateBookFormData>({
    resolver: zodResolver(updateBookSchema),
    defaultValues: {
      isbn: editingBook.isbn,
      title: editingBook.material.title,
      authorName: editingBook.material.author.name,
      pageNumbers: editingBook.pageNumbers,
      category: editingBook.material.category,
      description: editingBook.material.description,
      publicationDate: editingBook.material.publicationDate,
      status: (["publicado", "enviado", "rascunho"].includes(editingBook.material.status)
        ? editingBook.material.status
        : "rascunho") as "publicado" | "enviado" | "rascunho",
      authorType: "person",
      personDateOfBirth: editingBook.material.author.person?.birthDate,
      institutionCity: "",
    },
  });

  const authorType = useWatch({
    control: form.control,
    name: "authorType",
  });

  const onSubmit = async (data: updateBookFormData) => {
    data = {
      ...data,
      personDateOfBirth: data.authorType === "person" ? data.personDateOfBirth : undefined,
      institutionCity: data.authorType === "institution" ? data.institutionCity : undefined,
    };

    console.log(data);
    Response = await editBook(data);
    console.log(Response);
    const books = await getAllBooks();
    setBookList(books);
    onSuccess?.();
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex gap-6">
            <FormField
              control={form.control}
              name="isbn"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>ISBN</FormLabel>
                  <FormControl>
                    <Input placeholder={editingBook.isbn} {...field} />
                  </FormControl>
                  <FormMessage />
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
                    <Input placeholder={editingBook.material.title} {...field} />
                  </FormControl>
                  <FormMessage />
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
                    <Input placeholder={editingBook.material.author.name} {...field} />
                  </FormControl>
                  <FormMessage />
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
                        <SelectValue placeholder="Selecione o tipo do autor" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="person">Pessoa</SelectItem>
                      <SelectItem value="institution">Instituição</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
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
                      <Input type="date" placeholder={editingBook.material.author.person?.birthDate} {...field} />
                    </FormControl>
                    <FormMessage />
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
                      <Input placeholder={editingBook.material.author.institution?.city} {...field} />
                    </FormControl>
                    <FormMessage />
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
                      placeholder={editingBook.pageNumbers.toString()}
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
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
                    <Input placeholder={editingBook.material.category} {...field} />
                  </FormControl>
                  <FormMessage />
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
                    <Input type="date" placeholder={editingBook.material.publicationDate} {...field} />
                  </FormControl>
                  <FormMessage />
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
                        <SelectValue placeholder={editingBook.material.status} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="rascunho">Rascunho</SelectItem>
                      <SelectItem value="published">Publicado</SelectItem>
                      <SelectItem value="enviado">Enviado</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
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
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button
              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
              type="submit"
            >
              Editar Livro
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
