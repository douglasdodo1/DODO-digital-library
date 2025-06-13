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
import { Book, FileText, Plus, Video } from "lucide-react";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Header } from "@/components/header";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookDto } from "@/dtos/book-dto";
import { ArticleDto } from "@/dtos/article-dto";
import { getAllBooks } from "@/lib/book/get-all-books";
import { getAllArticles } from "@/lib/article/get-all-articles";
import { TabContentComponent } from "@/components/tab-content-component";
import { VideoDto } from "@/dtos/video-dto";
import { getAllVideos } from "@/lib/video/get-all-videos";

export default function DashboardComponent() {
  const [activeTab, setActiveTab] = useState("livros");

  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [contentType, setContentType] = useState<string>("livro");
  const [bookList, setBookList] = useState<BookDto[]>([]);
  const [articleList, setArticleList] = useState<ArticleDto[]>([]);
  const [videoList, setVideoList] = useState<VideoDto[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await getAllBooks();
      setBookList(data);
    };

    const fetchArticles = async () => {
      const data = await getAllArticles();
      setArticleList(data);
    };

    const fetchVideos = async () => {
      const data = await getAllVideos();
      setVideoList(data);
    };

    fetchBooks();
    fetchArticles();
    fetchVideos();
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
                      <Label htmlFor="dataPublicacao">Data de Publicação</Label>
                      <Input id="dataPublicacao" placeholder="dd/mm/aaaa" required />
                    </div>
                  </div>

                  {contentType === "livro" && (
                    <div className="space-y-2">
                      <Label htmlFor="paginas">Número de Páginas</Label>
                      <Input id="paginas" placeholder="Ex: 350" required />
                    </div>
                  )}

                  {contentType === "video" && (
                    <div className="space-y-2">
                      <Label htmlFor="duracao">Duração</Label>
                      <Input id="duracao" placeholder="Ex: 12:34" required />
                    </div>
                  )}

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
          <div className="w-4/5 justify-center">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="flex w-full h-full grid-cols-3 bg-white border border-amber-200">
                <TabsTrigger
                  value="livros"
                  className="flex items-center gap-2 data-[state=active]:bg-amber-100 data-[state=active]:text-amber-800"
                >
                  <Book />
                  <span className="text-base">Livros</span>
                </TabsTrigger>
                <TabsTrigger
                  value="artigos"
                  className="data-[state=active]:bg-amber-100 data-[state=active]:text-amber-800"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  <span className="text-base">Artigos</span>
                </TabsTrigger>
                <TabsTrigger
                  value="videos"
                  className="data-[state=active]:bg-amber-100 data-[state=active]:text-amber-800"
                >
                  <Video className="w-4 h-4 mr-2" />
                  <span className="text-base">Vídeos</span>
                </TabsTrigger>
              </TabsList>

              <TabContentComponent materialList={bookList} value="livros" />
              <TabContentComponent materialList={articleList} value="artigos" />
              <TabContentComponent materialList={videoList} value="videos" />
            </Tabs>
          </div>
        </div>
      </div>

      {/* Tabs */}
    </div>
  );
}
