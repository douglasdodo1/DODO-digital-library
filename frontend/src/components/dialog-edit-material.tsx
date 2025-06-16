import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogOverlay, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { BookDto } from "@/dtos/book-dto";
import { ArticleDto } from "@/dtos/article-dto";
import { VideoDto } from "@/dtos/video-dto";
import { Label } from "./ui/label";

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

  const isArticle = "doi" in editingItem;

  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogOverlay className="fixed inset-0" />
      <DialogContent className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6">
        <DialogHeader>
          <DialogTitle>Editar {getTypeLabel(editingItem)}</DialogTitle>
          <DialogDescription>Atualize as informações do item selecionado.</DialogDescription>
        </DialogHeader>

        <form className="space-y-4">
          {("isbn" in editingItem || "doi" in editingItem) && (
            <div className="space-y-2">
              <Label htmlFor="extra">{"isbn" in editingItem ? "ISBN" : "DOI"}</Label>
              <Input
                id="extra"
                value={"isbn" in editingItem ? editingItem.isbn : editingItem.doi}
                onChange={(e) => {
                  if ("isbn" in editingItem) {
                    setEditingItem({ ...editingItem, isbn: e.target.value });
                  } else {
                    setEditingItem({ ...editingItem, doi: e.target.value });
                  }
                }}
                placeholder={"isbn" in editingItem ? "Ex: 978-3-16-148410-0" : "Ex: 10.1000/xyz123"}
                required
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={editingItem.material.title}
                onChange={(e) =>
                  setEditingItem({
                    ...editingItem,
                    material: { ...editingItem.material, title: e.target.value },
                  })
                }
                placeholder="Digite o título"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Autor</Label>
              <Input
                id="author"
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
                placeholder="Nome do autor"
                required
              />
            </div>
          </div>

          {!isArticle && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Input
                  id="category"
                  value={editingItem.material.category ?? ""}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      material: { ...editingItem.material, category: e.target.value },
                    })
                  }
                  placeholder="Ex: Literatura, Ciências"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="publicationDate">Data de Publicação</Label>
                <Input
                  id="publicationDate"
                  value={editingItem.material.publicationDate ?? ""}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      material: { ...editingItem.material, publicationDate: e.target.value },
                    })
                  }
                  placeholder="dd/mm/aaaa"
                  required
                />
              </div>
            </div>
          )}

          {"durationMinutes" in editingItem && (
            <div className="space-y-2">
              <Label htmlFor="durationMinutes">Duração (minutos)</Label>
              <Input
                id="durationMinutes"
                value={editingItem.durationMinutes.toString()}
                onChange={(e) => setEditingItem({ ...editingItem, durationMinutes: Number(e.target.value) })}
                placeholder="Ex: 12"
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={editingItem.material.description}
              onChange={(e) =>
                setEditingItem({
                  ...editingItem,
                  material: { ...editingItem.material, description: e.target.value },
                })
              }
              placeholder="Breve descrição do conteúdo"
              rows={3}
              required
            />
          </div>

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
    </Dialog>
  );
}
