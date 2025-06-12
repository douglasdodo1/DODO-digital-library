"use client";
import { ArticleDto } from "@/dtos/article-dto";
import { BookDto } from "@/dtos/book-dto";
import { VideoDto } from "@/dtos/video-dto";
import { BookOpen, Edit, FileText, Video } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import { TabsContent } from "./ui/tabs";
import { useState } from "react";
import { DialogEditMaterial } from "./dialog-edit-material";

// União de tipos para materiais
type Material = BookDto | ArticleDto | VideoDto;

interface Props {
  materialList: Material[];
  value: string;
}

function getKey(material: Material): string {
  if ("isbn" in material) {
    return material.isbn;
  } else if ("doi" in material) {
    return material.doi;
  } else if ("id" in material) {
    return material.id.toString();
  }

  return Math.random().toString();
}

export function TabContentComponent({ materialList, value }: Props) {
  // Estado do diálogo de edição
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  // editingItem pode ser Material ou null
  const [editingItem, setEditingItem] = useState<Material | null>(null);

  const handleEditContent = (item: Material) => {
    setEditingItem(item);
    setIsEditDialogOpen(true);
  };

  return (
    <div>
      <DialogEditMaterial
        isEditDialogOpen={isEditDialogOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
        editingItem={editingItem}
        setEditingItem={setEditingItem}
      />
      <TabsContent value={value} className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {materialList.map((material) => (
            <Card key={getKey(material)} className="hover:shadow-lg transition-shadow border-amber-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  {value === "livros" ? (
                    <BookOpen size={24} className="text-amber-600 mb-2" />
                  ) : value === "artigos" ? (
                    <FileText size={24} className="text-amber-600 mb-2" />
                  ) : (
                    <Video size={24} className="text-amber-600 mb-2" />
                  )}
                </div>
                <CardTitle className="text-amber-800">{material.material?.title ?? "Sem título"}</CardTitle>
                <CardDescription className="text-amber-600">
                  por {material.material?.author?.name ?? "Autor desconhecido"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-6">{material.material?.description ?? "Sem descrição"}</p>
                <div className="w-full flex justify-end">
                  <Button
                    onClick={() => handleEditContent(material)}
                    size="sm"
                    variant="outline"
                    className="text-amber-600 border-amber-300 hover:bg-amber-50"
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Editar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
    </div>
  );
}
