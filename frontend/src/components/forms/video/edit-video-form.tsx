"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getAllVideos } from "@/graphql/video/mutations/get-all-videos";
import { VideoDto } from "@/dtos/video-dto";
import { createVideoSchema } from "../../schemas/video/create-video-schema";
import { editVideo } from "@/graphql/video/mutations/edit-video";

const updateVideoSchema = createVideoSchema.partial().extend({ id: z.number() });
type updateVideoFormData = z.infer<typeof updateVideoSchema>;

interface VideoFormProps {
  setVideoList: React.Dispatch<React.SetStateAction<VideoDto[]>>;
  editingVideo: VideoDto;
  setIsEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function EditVideoForm({ setVideoList, editingVideo, setIsEditDialogOpen }: VideoFormProps) {
  const form = useForm<updateVideoFormData>({
    resolver: zodResolver(updateVideoSchema),
    defaultValues: {
      id: Number(editingVideo.id),
      title: editingVideo.material.title,
      authorName: editingVideo.material.author.name,
      durationMinutes: editingVideo.durationMinutes,
      category: editingVideo.material.category,
      description: editingVideo.material.description,
      publicationDate: editingVideo.material.publicationDate,
      status: (["publicado", "enviado", "rascunho"].includes(editingVideo.material.status)
        ? editingVideo.material.status
        : "rascunho") as "publicado" | "enviado" | "rascunho",
      authorType: editingVideo.material.author.person ? "person" : "institution",
      personDateOfBirth: editingVideo.material.author.person?.birthDate,
      institutionCity: editingVideo.material.author.institution?.city,
    },
  });

  const authorType = useWatch({
    control: form.control,
    name: "authorType",
  });

  const onSubmit = async (data: updateVideoFormData) => {
    data = {
      ...data,
      personDateOfBirth: data.authorType === "person" ? data.personDateOfBirth : undefined,
      institutionCity: data.authorType === "institution" ? data.institutionCity : undefined,
    };
    await editVideo(data);

    const videos = await getAllVideos();
    setVideoList(videos);
    setIsEditDialogOpen(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input placeholder={editingVideo.material.title} {...field} />
                </FormControl>
                <div className="min-h-[1.25rem]">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <div className="flex flex-row flex-wrap gap-x-6 gap-y-2 items-start">
            <FormField
              control={form.control}
              name="authorName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Autor</FormLabel>
                  <FormControl>
                    <Input placeholder={editingVideo.material.author.name} {...field} />
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
                        <SelectValue placeholder={editingVideo.material.author.person ? "Pessoa" : "Instituição"} />
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
            <FormField
              control={form.control}
              name="personDateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Nascimento</FormLabel>
                  <FormControl>
                    <Input type="date" placeholder={editingVideo.material.author.person?.birthDate} {...field} />
                  </FormControl>
                  <div className="min-h-[1.25rem]">
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
                <FormItem>
                  <FormLabel>Cidade da Instituição</FormLabel>
                  <FormControl>
                    <Input placeholder={editingVideo.material.author.institution?.city} {...field} />
                  </FormControl>
                  <div className="min-h-[1.25rem]">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          )}

          <div className="flex gap-6">
            <FormField
              control={form.control}
              name="durationMinutes"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Duração (minutos)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder={editingVideo.durationMinutes.toString()}
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
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
                    <Input placeholder={editingVideo.material.category} {...field} />
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
                    <Input type="date" placeholder={editingVideo.material.publicationDate} {...field} />
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
                        <SelectValue placeholder={editingVideo.material.status} />
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
                  <Textarea placeholder={editingVideo.material.description} {...field} />
                </FormControl>
                <div className="min-h-[1.25rem]">
                  <FormMessage />
                </div>
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
              Cadastrar Vídeo
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
