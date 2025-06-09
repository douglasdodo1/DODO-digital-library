"use client";

import { Book, BookOpen, Library } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import React, { useState } from "react";
import { LoginComponent } from "./login-component";
import { RegisterComponent } from "./register-component";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export default function AuthComponent() {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
      {/* decorações atrás */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <BookOpen className="absolute top-10 left-10 text-amber-200/30 -rotate-12" size={120} />
        <Library className="absolute bottom-20 right-20 text-orange-200/30 rotate-12" size={100} />
        <Book className="absolute top-1/2 left-20 text-yellow-200/30 rotate-45" size={80} />
        <Book className="absolute bottom-10 left-1/3 text-amber-200/30 -rotate-6" size={60} />
      </div>

      <Card className="p-0 w-full max-w-md relative z-10 shadow-2xl overflow-hidden rounded-lg">
        <CardHeader className="text-center bg-gradient-to-r from-amber-600 to-orange-600 text-white">
          <div className="flex justify-center">
            <div className="p-3 bg-white/20 rounded-full">
              <Library className="w-8 h-8" />
            </div>
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">Biblioteca Digital</CardTitle>
            <CardDescription className="text-amber-100">
              {isLogin ? "Acesse sua conta" : "Crie sua conta"}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {isLogin ? <LoginComponent isLogin={isLogin} setIsLogin={setIsLogin} /> : <RegisterComponent />}
          <Separator />
          <div className="text-center space-y-2">
            <p className="text-sm text-amber-700">{isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}</p>
            <Button
              variant="outline"
              onClick={() => setIsLogin(!isLogin)}
              className="w-full border-amber-300 text-amber-700 hover:bg-amber-50 hover:text-amber-800"
            >
              {isLogin ? "Cadastre-se" : "Fazer Login"}
            </Button>
          </div>
          <div className="text-center">
            <p className="text-xs text-amber-600">
              Ao continuar, você concorda com nossos{" "}
              <button className="underline hover:text-amber-800">Termos de Uso</button> e{" "}
              <button className="underline hover:text-amber-800">Política de Privacidade</button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
