"use client";

import { ArticleDto } from "@/dtos/article-dto";
import { BookDto } from "@/dtos/book-dto";
import { VideoDto } from "@/dtos/video-dto";
import { BookOpen, Calendar, Edit, FileText, Trash2, Video } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import { TabsContent } from "./ui/tabs";
import { useState } from "react";
import { DialogEditMaterial } from "./dialog-edit-material";
import { Badge } from "./ui/badge";
import { DialogDeleteMaterial } from "./dialog-delete-material";

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
  // fallback improvável, mas caso não tenha nenhuma propriedade esperada:
  return Math.random().toString();
}

function formatDate(date: string) {
  // Ajusta para o formato brasileiro
  return new Date(date).toLocaleDateString("pt-BR");
}

export function TabContentComponent({ materialList, value }: Props) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Material | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [deletingItem, setDeletingItem] = useState<Material | null>(null);

  const handleEditContent = (item: Material) => {
    setEditingItem(item);
    setIsEditDialogOpen(true);
  };

  const handleDeleteContent = (item: Material) => {
    // clonamos o objeto para evitar mutações indesejadas
    setDeletingItem({ ...item });
    setIsDeleteDialogOpen(true);
  };

  return (
    <div>
      {/* Diálogos de edição e exclusão */}
      <DialogEditMaterial
        isEditDialogOpen={isEditDialogOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
        editingItem={editingItem}
        setEditingItem={setEditingItem}
      />
      <DialogDeleteMaterial
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        deletingItem={deletingItem}
        setDeletingItem={setDeletingItem}
      />

      <TabsContent value={value} className="mt-6">
        {/* Container de grid: items-stretch para esticar cards verticalmente */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
          {materialList.map((material) => (
            <Card
              key={getKey(material)}
              // flex em coluna + h-full para ocupar toda altura da célula do grid
              className="flex flex-col h-full hover:shadow-lg transition-shadow border-amber-200"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  {value === "livros" ? (
                    <BookOpen size={24} className="text-amber-600 mb-2" />
                  ) : value === "artigos" ? (
                    <FileText size={24} className="text-amber-600 mb-2" />
                  ) : (
                    <Video size={24} className="text-amber-600 mb-2" />
                  )}
                  <Badge className="bg-amber-100 text-amber-800">{material.material.category}</Badge>
                </div>
                <CardTitle className="text-amber-800">{material.material?.title ?? "Sem título"}</CardTitle>
                <CardDescription className="text-amber-600">
                  por {material.material?.author?.name ?? "Autor desconhecido"}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col flex-grow justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-6">{material.material?.description ?? "Sem descrição"}</p>
                </div>
                <div className="w-full flex justify-between">
                  <div className="flex items-center text-xs text-amber-600">
                    <Calendar className="w-3 h-3 mr-1" />
                    {formatDate(material.material.publicationDate)}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={() => handleEditContent(material)}
                      size="sm"
                      variant="outline"
                      className="text-amber-600 border-amber-300 hover:bg-amber-50"
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Editar
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteContent(material)}
                      className="text-red-600 border-red-300 hover:bg-red-50"
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Excluir
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
    </div>
  );
}
