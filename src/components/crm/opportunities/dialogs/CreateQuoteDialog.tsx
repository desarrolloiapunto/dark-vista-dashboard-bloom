
import { Opportunity } from "@/types/crm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CreateQuoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  opportunity: Opportunity | null;
  onQuoteCreate: () => void;
}

export const CreateQuoteDialog = ({
  open,
  onOpenChange,
  opportunity,
  onQuoteCreate,
}: CreateQuoteDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Crear Cotización para {opportunity?.name}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p>Esta acción te llevará al formulario de creación de cotizaciones.</p>
          <p className="text-sm text-muted-foreground mt-2">La cotización estará vinculada a esta oportunidad.</p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={onQuoteCreate}>
            <FileText className="mr-2 h-4 w-4" /> Crear Cotización
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
