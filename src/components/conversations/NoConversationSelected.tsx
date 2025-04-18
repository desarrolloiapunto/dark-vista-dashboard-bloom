
import { MessageSquare } from "lucide-react";

const NoConversationSelected = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-8">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <MessageSquare className="h-8 w-8 text-muted-foreground" />
      </div>
      <h2 className="text-2xl font-semibold mb-2">Selecciona una conversación</h2>
      <p className="text-muted-foreground max-w-md">
        Elige una conversación de la lista o inicia una nueva para comenzar a chatear.
      </p>
    </div>
  );
};

export default NoConversationSelected;
