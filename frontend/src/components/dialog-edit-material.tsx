import { Dialog, DialogContent, DialogOverlay, DialogTitle, DialogDescription } from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-label";
import { Button } from "./ui/button";
import { DialogHeader } from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { BookDto } from "@/dtos/book-dto";
import { ArticleDto } from "@/dtos/article-dto";
import { VideoDto } from "@/dtos/video-dto";

type Material = BookDto | ArticleDto | VideoDto;

interface Props {
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editingItem: Material | null;
  setEditingItem: React.Dispatch<React.SetStateAction<Material | null>>;
}

export function DialogEditMaterial({ isEditDialogOpen, setIsEditDialogOpen, editingItem, setEditingItem }: Props) {
  const getTypeLabel = (m: Material) => {
    if ("isbn" in m) return "Livro";
    if ("doi" in m) return "Artigo";
    return "Vídeo";
  };

  if (!editingItem) return null;

  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogOverlay className="fixed inset-0" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogContent className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6">
          <DialogHeader>
            <DialogTitle>Editar {getTypeLabel(editingItem)}</DialogTitle>
            <DialogDescription>Atualize as informações do item selecionado.</DialogDescription>
          </DialogHeader>

          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-titulo">Título</Label>
                <Input
                  id="edit-titulo"
                  value={editingItem.material.title}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      material: { ...editingItem.material, title: e.target.value },
                    })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-autor">Autor</Label>
                <Input
                  id="edit-autor"
                  value={editingItem.material.author?.name ?? ""}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      material: {
                        ...editingItem.material,
                        author: { ...editingItem.material.author!, name: e.target.value },
                      },
                    })
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-extra">
                {"isbn" in editingItem
                  ? "Número de Páginas"
                  : "doi" in editingItem
                  ? "Data de Publicação"
                  : "Duração (minutos)"}
              </Label>
              <Input
                id="edit-extra"
                value={
                  "isbn" in editingItem
                    ? editingItem.pageNumbers.toString()
                    : "doi" in editingItem
                    ? editingItem.publication_date
                    : editingItem.durationMinutes.toString()
                }
                onChange={(e) => {
                  if ("isbn" in editingItem) {
                    setEditingItem({ ...editingItem, pageNumbers: Number(e.target.value) });
                  } else if ("doi" in editingItem) {
                    setEditingItem({ ...editingItem, publication_date: e.target.value });
                  } else {
                    setEditingItem({ ...editingItem, durationMinutes: Number(e.target.value) });
                  }
                }}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-descricao">Descrição</Label>
              <Textarea
                id="edit-descricao"
                value={editingItem.material.description}
                onChange={(e) =>
                  setEditingItem({
                    ...editingItem,
                    material: { ...editingItem.material, description: e.target.value },
                  })
                }
                rows={3}
                required
              />
            </div>

            {/* Botões */}
            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditDialogOpen(false);
                  setEditingItem(null);
                }}
              >
                Cancelar
              </Button>
              <Button type="submit" className="bg-gradient-to-r from-amber-600 to-orange-600">
                Atualizar
              </Button>
            </div>
          </form>
        </DialogContent>
      </div>
    </Dialog>
  );
}
