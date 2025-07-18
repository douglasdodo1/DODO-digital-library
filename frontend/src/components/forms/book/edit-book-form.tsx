import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookDto } from "@/dtos/book-dto";
import { createBookSchema } from "../../schemas/book/create-book-schema";
import { editBook } from "@/graphql/book/mutations/edit-book";

const updateBookSchema = createBookSchema.partial();
type updateBookFormData = z.infer<typeof updateBookSchema>;

interface BookFormProps {
  setBookList: React.Dispatch<React.SetStateAction<BookDto[]>>;
  editingBook: BookDto;
  setEditingBook: React.Dispatch<React.SetStateAction<BookDto>>;
  setIsEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function EditBookForm({ setBookList, editingBook, setEditingBook, setIsEditDialogOpen }: BookFormProps) {
  const form = useForm<updateBookFormData>({
    resolver: zodResolver(updateBookSchema),
    defaultValues: {
      title: editingBook.material.title,
      authorName: editingBook.material.author.name,
      pageNumbers: editingBook.pageNumbers,
      category: editingBook.material.category,
      description: editingBook.material.description,
      publicationDate: editingBook.material.publicationDate,
      status: (["publicado", "enviado", "rascunho"].includes(editingBook.material.status)
        ? editingBook.material.status
        : "rascunho") as "publicado" | "enviado" | "rascunho",
      authorType: editingBook.material.author.person ? "person" : "institution",
      personDateOfBirth: editingBook.material.author.person?.birthDate,
      institutionCity: editingBook.material.author.institution?.city,
    },
  });

  const authorType = useWatch({
    control: form.control,
    name: "authorType",
  });

  const onSubmit = async (data: updateBookFormData) => {
    const payload = {
      ...data,
      isbn: editingBook.isbn,
      personDateOfBirth: data.authorType === "person" ? data.personDateOfBirth : undefined,
      institutionCity: data.authorType === "institution" ? data.institutionCity : undefined,
    };

    const response = await editBook(payload);
    if (!response.data) return;

    const updatedBook = response.data.updateBook.book as BookDto;
    setBookList((prev) => prev.map((b) => (b.isbn === updatedBook.isbn ? updatedBook : b)));
    setEditingBook(updatedBook);
    setIsEditDialogOpen(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-x-6 pb-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder={editingBook.material.title} {...field} />
                  </FormControl>
                  <div className="min-h-2">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-row flex-wrap gap-x-6 pb-2 items-start">
            <FormField
              control={form.control}
              name="authorName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Autor</FormLabel>
                  <FormControl>
                    <Input placeholder={editingBook.material.author.name} {...field} />
                  </FormControl>
                  <div className="min-h-2">
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
                        <SelectValue placeholder="Selecione o tipo do autor" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="person">Pessoa</SelectItem>
                      <SelectItem value="institution">Instituição</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="min-h-2">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>

          {authorType === "person" && (
            <div className="flex gap-x-6">
              <FormField
                control={form.control}
                name="personDateOfBirth"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Data de Nascimento</FormLabel>
                    <FormControl>
                      <Input type="date" placeholder={editingBook.material.author.person?.birthDate} {...field} />
                    </FormControl>
                    <div className="min-h-2">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
          )}

          {authorType === "institution" && (
            <div className="flex gap-x-6">
              <FormField
                control={form.control}
                name="institutionCity"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Cidade da Instituição</FormLabel>
                    <FormControl>
                      <Input placeholder={editingBook.material.author.institution?.city} {...field} />
                    </FormControl>
                    <div className="min-h-2">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
          )}

          <div className="flex flex-row flex-wrap gap-x-6 pb-2 items-start">
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
                  <div className="min-h-2">
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
                    <Input placeholder={editingBook.material.category} {...field} />
                  </FormControl>
                  <div className="min-h-2">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-row flex-wrap gap-x-6 pb-2 items-start">
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
                      <SelectItem value="publicado">Publicado</SelectItem>
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

          <div className="flex justify-end gap-4 mt-4">
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
