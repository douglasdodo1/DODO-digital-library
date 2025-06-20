"use client";
import { Library, Search, User, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { DialogEditUser } from "./dialog-edit-user";
import { useState } from "react";

export function Header() {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);

  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };
  return (
    <header className="bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg">
      <DialogEditUser isEditDialogOpen={isEditDialogOpen} setIsEditDialogOpen={setIsEditDialogOpen} />
      <div className="w-full px-8 py-4">
        <div className="flex items-center w-full justify-between">
          <div className="flex items-center">
            <Library className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">Biblioteca Digital</h1>
              <p className="text-amber-100 text-sm">Bem-vindo de volta!</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-amber-200" />
              <Input
                placeholder="Pesquisar..."
                className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-amber-200 focus:bg-white/30"
              />
            </div>

            <Button
              onClick={() => setIsEditDialogOpen(true)}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
            >
              <User className="w-5 h-5" />
            </Button>

            <Button onClick={handleLogout} variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
