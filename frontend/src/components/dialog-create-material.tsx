import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogOverlay, DialogTitle } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

import { BookForm } from "./forms/create-book-form";

interface Props {
  isCreateDialogOpen: boolean;
  setIsCreateDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type ContentType = "livro" | "artigo" | "video";

export function DialogCreateMaterial({ isCreateDialogOpen, setIsCreateDialogOpen }: Props) {
  const [contentType, setContentType] = useState<ContentType | "">("livro");

  return (
    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
      <DialogOverlay className="fixed inset-0" />
      <DialogContent className="w-[95vw] max-w-7xl">
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
        <div className="w-full">
          {contentType === "livro" && <BookForm onSuccess={() => setIsCreateDialogOpen(false)} />}
        </div>
      </DialogContent>
    </Dialog>
  );
}
