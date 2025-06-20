import { Dialog, DialogContent, DialogOverlay, DialogTitle, DialogDescription } from "@radix-ui/react-dialog";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { DialogHeader } from "./ui/dialog";
import { ArticleDto } from "@/dtos/article-dto";
import { BookDto } from "@/dtos/book-dto";
import { VideoDto } from "@/dtos/video-dto";
import { deleteBook } from "@/graphql/book/mutations/delete-book";
import { deleteArticle } from "@/graphql/article/mutations/delete-article";
import { deleteVideo } from "@/graphql/video/mutations/delete-video";

type Material = BookDto | ArticleDto | VideoDto;

interface Props {
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  deletingItem: Material | null;
  setDeletingItem: React.Dispatch<React.SetStateAction<Material | null>>;
  setBookList: React.Dispatch<React.SetStateAction<BookDto[]>>;
  setArticleList: React.Dispatch<React.SetStateAction<ArticleDto[]>>;
  setVideoList: React.Dispatch<React.SetStateAction<VideoDto[]>>;
}

export function DialogDeleteMaterial({
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  deletingItem,
  setDeletingItem,
  setBookList,
  setArticleList,
  setVideoList,
}: Props) {
  const getType = (material: Material): string => {
    if ("isbn" in material) {
      return "book";
    } else if ("doi" in material) {
      return "article";
    } else {
      return "video";
    }
  };

  const confirmDelete = async () => {
    console.log("Excluindo conteúdo:", deletingItem);
    if (deletingItem) {
      const type: string = getType(deletingItem);

      if (type === "book") {
        const bookToDelete = deletingItem as BookDto;
        const response = await deleteBook(bookToDelete.isbn);
        setBookList((prev) => prev.filter((b) => b.isbn !== bookToDelete.isbn));
        console.log(response);
      } else if (type === "article") {
        const articleToDelete = deletingItem as ArticleDto;
        const response = await deleteArticle(articleToDelete.doi);
        setArticleList((prev) => prev.filter((a) => a.doi !== articleToDelete.doi));
        console.log(response);
      } else if (type === "video") {
        const videoToDelete = deletingItem as VideoDto;
        const response = await deleteVideo(videoToDelete.id);
        setVideoList((prev) => prev.filter((v) => v.id !== videoToDelete.id));
        console.log(response);
      }
    }
    setIsDeleteDialogOpen(false);
    setDeletingItem(null);
  };

  if (!deletingItem) return null;

  return (
    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <DialogOverlay className="fixed inset-0 bg-black/50" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogContent className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
          <DialogHeader>
            <DialogTitle className="text-red-600">Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir <span className="font-semibold">{deletingItem.material.title}</span>?
              <br />
              <span className="text-red-500 text-sm mt-2 block">Esta ação não pode ser desfeita.</span>
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsDeleteDialogOpen(false);
                setDeletingItem(null);
              }}
            >
              Cancelar
            </Button>
            <Button onClick={confirmDelete} className="bg-red-600 hover:bg-red-700 text-white">
              <Trash2 className="w-4 h-4 mr-2" />
              Excluir
            </Button>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
}
