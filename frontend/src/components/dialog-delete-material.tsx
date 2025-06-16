import { Dialog, DialogContent, DialogOverlay, DialogTitle, DialogDescription } from "@radix-ui/react-dialog";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { DialogHeader } from "./ui/dialog";
import { ArticleDto } from "@/dtos/article-dto";
import { BookDto } from "@/dtos/book-dto";
import { VideoDto } from "@/dtos/video-dto";

type Material = BookDto | ArticleDto | VideoDto;

interface Props {
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  deletingItem: Material | null;
  setDeletingItem: React.Dispatch<React.SetStateAction<Material | null>>;
}

export function DialogDeleteMaterial({
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  deletingItem,
  setDeletingItem,
}: Props) {
  const confirmDelete = () => {
    console.log("Excluindo conteúdo:", deletingItem);
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
