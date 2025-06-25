import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createArticleSchema } from "../../schemas/article/create-article-schema";
import { createArticle } from "@/graphql/article/mutations/create-article";
import { ArticleDto } from "@/dtos/article-dto";
import { getAllArticles } from "@/graphql/article/mutations/get-all-articles";

type CreateArticleFormData = z.infer<typeof createArticleSchema>;

interface ArticleFormProps {
  onSuccess?: () => void;
  setArticleList: React.Dispatch<React.SetStateAction<ArticleDto[]>>;
}

export function ArticleForm({ onSuccess, setArticleList }: ArticleFormProps) {
  const form = useForm<CreateArticleFormData>({
    resolver: zodResolver(createArticleSchema),
    defaultValues: {
      doi: "",
      title: "",
      authorName: "",
      language: "",
      category: "",
      description: "",
      publicationDate: "",
      status: "rascunho",
      authorType: "person",
      personDateOfBirth: "",
      institutionCity: "",
    },
  });

  const setErrors = (errors: { message: string }[]) => {
    errors.forEach((error) => {
      if (error.message.includes("Doi is invalid")) {
        form.setError("doi", { message: "DOI inválido" });
      }
    });
  };

  const authorType = useWatch({
    control: form.control,
    name: "authorType",
  });

  const onSubmit = async (data: CreateArticleFormData) => {
    data = {
      ...data,
      personDateOfBirth: data.authorType === "person" ? data.personDateOfBirth : undefined,
      institutionCity: data.authorType === "institution" ? data.institutionCity : undefined,
    };

    const Response = await createArticle(data);
    if (Response.data) {
      const articles = await getAllArticles();
      setArticleList(articles);
      onSuccess?.();
    }
    setErrors(Response.errors);
  };

  return (
    <div className="w-full max-w-3xl mx-auto ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-x-6 pb-2">
            <FormField
              control={form.control}
              name="doi"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>DOI</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: 9783161484100" {...field} />
                  </FormControl>
                  <div className="min-h-2">
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
                    <Input placeholder="Ex: O Senhor dos Anéis" {...field} />
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
                    <Input placeholder="Ex: J. R. R. Tolkien" {...field} />
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
                        <SelectValue placeholder="Selecione o tipo de autor" />
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
            <FormField
              control={form.control}
              name="personDateOfBirth"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Data de Nascimento</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <div className="min-h-2">
                    <FormMessage />
                  </div>
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
                  <div className="min-h-2">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          )}

          <div className="flex flex-row flex-wrap gap-x-6 pb-2 items-start">
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Idioma</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="en" {...field} />
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
                    <Input placeholder="Ex: Ficção, Autoajuda" {...field} />
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
            name="publicationDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data de Publicação</FormLabel>
                <FormControl>
                  <Input type="date" placeholder="Selecione a data" {...field} />
                </FormControl>
                <div className="min-h-2">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <div className="w-1/2 pb-2 mx-auto">
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
                  <div className="min-h-2">
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
                  <Textarea placeholder="Resumo ou sinopse do livro" {...field} />
                </FormControl>
                <div className="min-h-2">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <div className="flex justify-end  gap-x-4">
            <Button type="button" variant="outline" onClick={() => onSuccess?.()}>
              Cancelar
            </Button>
            <Button
              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
              type="submit"
            >
              Cadastrar artigo
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
