// create-book-form.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createArticleSchema } from "../../schemas/article/create-article-schema";
import { ArticleDto } from "@/dtos/article-dto";
import { editArticle } from "@/graphql/article/mutations/edit-article";

const updateArticleSchema = createArticleSchema.partial();
type updateArticleFormData = z.infer<typeof updateArticleSchema>;

interface BookFormProps {
  setArticleList: React.Dispatch<React.SetStateAction<ArticleDto[]>>;
  editingArticle: ArticleDto;
  setIsEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditingArticle: React.Dispatch<React.SetStateAction<ArticleDto>>;
}

export function EditArticleForm({
  setArticleList,
  editingArticle,
  setIsEditDialogOpen,
  setEditingArticle,
}: BookFormProps) {
  const form = useForm<updateArticleFormData>({
    resolver: zodResolver(updateArticleSchema),
    defaultValues: {
      doi: editingArticle.doi,
      title: editingArticle.material.title,
      authorName: editingArticle.material.author.name,
      language: editingArticle.language,
      category: editingArticle.material.category,
      description: editingArticle.material.description,
      publicationDate: editingArticle.material.publicationDate,
      status: (["publicado", "enviado", "rascunho"].includes(editingArticle.material.status)
        ? editingArticle.material.status
        : "rascunho") as "publicado" | "enviado" | "rascunho",
      authorType: editingArticle.material.author.person ? "person" : "institution",
      personDateOfBirth: editingArticle.material.author.person?.birthDate,
      institutionCity: editingArticle.material.author.institution?.city,
    },
  });

  const authorType = useWatch({
    control: form.control,
    name: "authorType",
  });

  const onSubmit = async (data: updateArticleFormData) => {
    data = {
      ...data,
      personDateOfBirth: data.authorType === "person" ? data.personDateOfBirth : undefined,
      institutionCity: data.authorType === "institution" ? data.institutionCity : undefined,
    };
    const response = await editArticle(data);
    if (!response.data) return;

    const updatedArticle = response.data.updateArticle.article as ArticleDto;
    setArticleList((prev) => prev.map((a) => (a.doi === updatedArticle.doi ? updatedArticle : a)));
    setEditingArticle(updatedArticle);
    setIsEditDialogOpen(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex gap-6">
            <FormField
              control={form.control}
              name="doi"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>DOI</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: 9783161484100" {...field} />
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
                    <Input placeholder="Ex: O Senhor dos Anéis" {...field} />
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
                    <Input placeholder="Ex: J. R. R. Tolkien" {...field} />
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
                        <SelectValue placeholder="Selecione o tipo de autor" />
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
            <FormField
              control={form.control}
              name="personDateOfBirth"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Data de Nascimento</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {authorType === "institution" && (
            <FormField
              control={form.control}
              name="institutionCity"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Cidade da Instituição</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: São Paulo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <div className="flex gap-6">
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Idioma</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="en" {...field} />
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
                    <Input placeholder="Ex: Ficção, Autoajuda" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="publicationDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data de Publicação</FormLabel>
                <FormControl>
                  <Input type="date" placeholder="Selecione a data" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-1/2 mx-auto">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center gap-2">
                  <FormLabel className="text-center">Status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full h-12 items-center justify-center">
                        <SelectValue placeholder="Selecione o status" />
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
                  <Textarea placeholder="Resumo ou sinopse do livro" {...field} />
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
              Editar artigo
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
