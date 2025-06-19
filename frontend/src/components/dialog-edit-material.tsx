import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogOverlay, DialogTitle } from "./ui/dialog";
import { BookDto } from "@/dtos/book-dto";
import { ArticleDto } from "@/dtos/article-dto";
import { VideoDto } from "@/dtos/video-dto";
import { EditBookForm } from "./forms/book/edit-book-form";
import { MaterialDto } from "@/dtos/material-dto";
import { EditArticleForm } from "./forms/article/edit-article-form";
import { EditVideoForm } from "./forms/video/edit-video-form";

type Material = BookDto | ArticleDto | VideoDto;

interface Props {
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editingItem: Material | null;
  setEditingItem: React.Dispatch<React.SetStateAction<Material | null>>;
  setBookList: React.Dispatch<React.SetStateAction<BookDto[]>>;
  setArticleList: React.Dispatch<React.SetStateAction<ArticleDto[]>>;
  setVideoList: React.Dispatch<React.SetStateAction<VideoDto[]>>;
}

export function DialogEditMaterial({
  isEditDialogOpen,
  setIsEditDialogOpen,
  editingItem,
  setEditingItem,
  setBookList,
  setArticleList,
  setVideoList,
}: Props) {
  const getTypeLabel = (m: Material) => {
    if ("isbn" in m) return "Livro";
    if ("doi" in m) return "Artigo";
    return "Vídeo";
  };

  if (!editingItem) return null;

  function getType(material: Material): string {
    if ("isbn" in material) {
      return "book";
    } else if ("doi" in material) {
      return "article";
    } else if ("id" in material) {
      return "video";
    }
    return Math.random().toString();
  }

  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogOverlay className="fixed inset-0" />
      <DialogContent className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6">
        <DialogHeader>
          <DialogTitle>Editar {getTypeLabel(editingItem)}</DialogTitle>
          <DialogDescription>Atualize as informações do item selecionado.</DialogDescription>
        </DialogHeader>
        {getType(editingItem) === "book" && (
          <EditBookForm
            setBookList={setBookList}
            editingBook={editingItem as BookDto}
            setIsEditDialogOpen={setIsEditDialogOpen}
          />
        )}

        {getType(editingItem) === "article" && (
          <EditArticleForm
            setArticleList={setArticleList}
            editingArticle={editingItem as ArticleDto}
            setIsEditDialogOpen={setIsEditDialogOpen}
          />
        )}

        {getType(editingItem) === "video" && (
          <EditVideoForm
            setVideoList={setVideoList}
            editingVideo={editingItem as VideoDto}
            setIsEditDialogOpen={setIsEditDialogOpen}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
