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
import { Badge, Book, BookOpen, Calendar, Clock, FileText, Plus, Video } from "lucide-react";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Header } from "@/components/header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { CreateBookInput } from "@/dtos/createBookInput";
import { booksByCpf } from "@/lib/book/books-by-cpf";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("livros");

  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [contentType, setContentType] = useState<string>("livro");
  const [bookList, setBookList] = useState<CreateBookInput[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await booksByCpf();
      setBookList(data);
    };

    fetchBooks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <Header />

      <div className="flex flex-col justify-center w-full">
        <div className="flex  pt-12 w-full justify-center items-center mb-8">
          <div className="w-3/4 flex flex-row justify-between ">
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
                        placeholder={
                          contentType === "livro" ? "2024" : contentType === "artigo" ? "dd/mm/aaaa" : "mm:ss"
                        }
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
        <div className="w-full flex justify-center">
          <div className="w-4/5 justify-center  mt-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-white border border-amber-200">
                <TabsTrigger
                  value="livros"
                  className="data-[state=active]:bg-amber-100 data-[state=active]:text-amber-800"
                >
                  <Book className="w-4 h-4 mr-2" />
                  Livros
                </TabsTrigger>
                <TabsTrigger
                  value="artigos"
                  className="data-[state=active]:bg-amber-100 data-[state=active]:text-amber-800"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Artigos
                </TabsTrigger>
                <TabsTrigger
                  value="videos"
                  className="data-[state=active]:bg-amber-100 data-[state=active]:text-amber-800"
                >
                  <Video className="w-4 h-4 mr-2" />
                  Vídeos
                </TabsTrigger>
              </TabsList>

              <TabsContent value="livros" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {bookList.map((book) => (
                    <Card key={book.isbn} className="hover:shadow-lg transition-shadow border-amber-200">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <BookOpen className="w-8 h-8 text-amber-600 mb-2" />
                          <Badge className="bg-amber-100 text-amber-800">{book.title}</Badge>
                        </div>
                        <CardTitle className="text-amber-800">{book.title}</CardTitle>
                        <CardDescription className="text-amber-600">por {book.title}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-3">{book.title}</p>
                        <div className="flex items-center text-xs text-amber-600">
                          <Calendar className="w-3 h-3 mr-1" />
                          {book.isbn}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Tabs */}
    </div>
  );
}
