import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogOverlay, DialogTitle } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

import { BookForm } from "./forms/book/create-book-form";
import { ArticleForm } from "./forms/article/create-article-form";
import { BookDto } from "@/dtos/book-dto";
import { ArticleDto } from "@/dtos/article-dto";
import { VideoDto } from "@/dtos/video-dto";
import { VideoForm } from "./forms/video/create-video-form";

interface Props {
  isCreateDialogOpen: boolean;
  setIsCreateDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setBookList: React.Dispatch<React.SetStateAction<BookDto[]>>;
  setArticleList: React.Dispatch<React.SetStateAction<ArticleDto[]>>;
  setVideoList: React.Dispatch<React.SetStateAction<VideoDto[]>>;
}

type ContentType = "livro" | "artigo" | "video";
export function DialogCreateMaterial({
  isCreateDialogOpen,
  setIsCreateDialogOpen,
  setBookList,
  setArticleList,
  setVideoList,
}: Props) {
  const [contentType, setContentType] = useState<ContentType | "">("livro");

  return (
    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
      <DialogOverlay className="fixed inset-0" />
      <DialogContent className="w-[95vw] max-h-[88vh] max-w-7xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Conteúdo</DialogTitle>
          <DialogDescription>Preencha as informações para adicionar um novo item ao acervo.</DialogDescription>
        </DialogHeader>

        <div className="pb-4">
          <Select value={contentType} onValueChange={(value) => setContentType(value as ContentType)}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="livro">📚 Livro</SelectItem>
              <SelectItem value="artigo">📄 Artigo</SelectItem>
              <SelectItem value="video">🎥 Vídeo</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full h-full">
          {contentType === "livro" && (
            <BookForm setBookList={setBookList} onSuccess={() => setIsCreateDialogOpen(false)} />
          )}
          {contentType === "artigo" && (
            <ArticleForm setArticleList={setArticleList} onSuccess={() => setIsCreateDialogOpen(false)} />
          )}
          {contentType === "video" && (
            <VideoForm setVideoList={setVideoList} onSuccess={() => setIsCreateDialogOpen(false)} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
