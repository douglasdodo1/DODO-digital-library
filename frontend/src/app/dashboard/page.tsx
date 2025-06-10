"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Header } from "@/components/header";
import { Textarea } from "@/components/ui/textarea";

export default function Dashboard() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [contentType, setContentType] = useState<string>("livro");
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <Header />
      <div className="flex justify-center w-full">
        <div className="flex flex-row pt-12 w-3/4  justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-amber-800">Acervo Digital</h2>
            <p className="text-amber-600 mt-1">Explore nossa coleção de livros, artigos e vídeos</p>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Conteúdo
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Conteúdo</DialogTitle>
                <DialogDescription>Preencha as informações para adicionar um novo item ao acervo.</DialogDescription>
              </DialogHeader>

              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tipo">Tipo de Conteúdo</Label>
                  <Select value={contentType} onValueChange={setContentType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="livro">📚 Livro</SelectItem>
                      <SelectItem value="artigo">📄 Artigo</SelectItem>
                      <SelectItem value="video">🎥 Vídeo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="titulo">Título</Label>
                    <Input id="titulo" placeholder="Digite o título" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="autor">Autor</Label>
                    <Input id="autor" placeholder="Nome do autor" required />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="categoria">Categoria</Label>
                    <Input id="categoria" placeholder="Ex: Literatura, Ciências" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ano">
                      {contentType === "livro"
                        ? "Ano de Publicação"
                        : contentType === "artigo"
                        ? "Data de Publicação"
                        : "Duração"}
                    </Label>
                    <Input
                      id="ano"
                      placeholder={contentType === "livro" ? "2024" : contentType === "artigo" ? "dd/mm/aaaa" : "mm:ss"}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descricao">Descrição</Label>
                  <Textarea id="descricao" placeholder="Breve descrição do conteúdo" rows={3} required />
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" className="bg-gradient-to-r from-amber-600 to-orange-600">
                    Adicionar
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
