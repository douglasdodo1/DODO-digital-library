"use client";

import { Book, FileText, Video } from "lucide-react";
import { useEffect, useState } from "react";
import { Header } from "@/components/header";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookDto } from "@/dtos/book-dto";
import { ArticleDto } from "@/dtos/article-dto";
import { getAllBooks } from "@/graphql/book/mutations/get-all-books";
import { getAllArticles } from "@/graphql/article/mutations/get-all-articles";
import { TabContentComponent } from "@/components/tab-content-component";
import { VideoDto } from "@/dtos/video-dto";
import { getAllVideos } from "@/graphql/video/mutations/get-all-videos";
import { DialogCreateMaterial } from "./dialog-create-material";
import { Button } from "./ui/button";

export default function DashboardComponent() {
  const [activeTab, setActiveTab] = useState("livros");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
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

  function handleEditContent(): void {
    setIsCreateDialogOpen(true);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <Header />
      <DialogCreateMaterial isCreateDialogOpen={isCreateDialogOpen} setIsCreateDialogOpen={setIsCreateDialogOpen} />
      <div className="flex flex-col justify-center w-full">
        <div className="flex  pt-12 w-full justify-center items-center mb-8">
          <div className="w-3/4 flex flex-row justify-between ">
            <div>
              <h2 className="text-3xl font-bold text-amber-800">Acervo Digital</h2>
              <p className="text-amber-600 mt-1">Explore nossa coleção de livros, artigos e vídeos</p>
            </div>
            <div>
              <Button
                size="sm"
                variant="outline"
                className="text-amber-600 border-amber-300 hover:bg-amber-50"
                onClick={() => setIsCreateDialogOpen(true)}
              >
                + adicionar conteudo
              </Button>
            </div>
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
    </div>
  );
}
