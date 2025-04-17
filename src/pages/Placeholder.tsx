
import { Card } from "@/components/ui/card";

interface PlaceholderProps {
  title?: string;
}

export default function Placeholder({ title }: PlaceholderProps) {
  return (
    <div className="space-y-4">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-4">{title || "Página en Construcción"}</h1>
        <p>Esta funcionalidad está actualmente en desarrollo. Estará disponible próximamente.</p>
      </Card>
    </div>
  );
}
