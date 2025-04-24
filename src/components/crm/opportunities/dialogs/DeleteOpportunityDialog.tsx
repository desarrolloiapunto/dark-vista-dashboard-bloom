
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Opportunity } from "@/types/crm";

interface DeleteOpportunityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  opportunity: Opportunity | null;
  onDelete: () => void;
}

export const DeleteOpportunityDialog = ({
  open,
  onOpenChange,
  opportunity,
  onDelete,
}: DeleteOpportunityDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Eliminar Oportunidad</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p>¿Estás seguro de que quieres eliminar la oportunidad "{opportunity?.name}"?</p>
          <p className="text-sm text-muted-foreground mt-2">Esta acción no se puede deshacer.</p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
