import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogOverlay, DialogTitle } from "./ui/dialog";
import { EditUserComponent } from "./edit-user-component";

interface props {
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DialogEditUser = ({ isEditDialogOpen, setIsEditDialogOpen: setIsDialogOpen }: props) => {
  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogOverlay className="fixed inset-0" />
      <DialogContent className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6">
        <DialogHeader>
          <DialogTitle>Atualizar informações</DialogTitle>
          <DialogDescription>Atualize suas informações pessoais</DialogDescription>
        </DialogHeader>
        <EditUserComponent></EditUserComponent>
      </DialogContent>
    </Dialog>
  );
};
