import { useState } from "react";
import { opportunities, companies, stageColumns, tasks, quotes } from "@/data/crm";
import { Opportunity, Task } from "@/types/crm";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ListIcon, KanbanIcon, TrendingUp, LineChart } from "lucide-react";
import { OpportunityList } from "@/components/crm/opportunities/OpportunityList";
import { OpportunityPipeline } from "@/components/crm/OpportunityPipeline";
import { CreateOpportunityDialog } from "@/components/crm/opportunities/dialogs/CreateOpportunityDialog";
import { EditOpportunityDialog } from "@/components/crm/opportunities/dialogs/EditOpportunityDialog";
import { DeleteOpportunityDialog } from "@/components/crm/opportunities/dialogs/DeleteOpportunityDialog";
import { CreateTaskDialog } from "@/components/crm/opportunities/dialogs/CreateTaskDialog";
import { CreateQuoteDialog } from "@/components/crm/opportunities/dialogs/CreateQuoteDialog";
import { toast } from "@/hooks/use-toast";

export default function OpportunitiesPage() {
  const [opportunityList, setOpportunityList] = useState<Opportunity[]>(opportunities);
  const [viewMode, setViewMode] = useState<"list" | "pipeline">("pipeline");
  const [currentOpportunity, setCurrentOpportunity] = useState<Opportunity | null>(null);
  const [relatedTasks, setRelatedTasks] = useState<Task[]>([]);
  const [relatedQuotes, setRelatedQuotes] = useState<any[]>([]);
  const [opportunityFilter, setOpportunityFilter] = useState<"all" | "by_stage" | "won" | "lost">("all");

  // Dialog states
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [isQuoteDialogOpen, setIsQuoteDialogOpen] = useState(false);

  const filteredOpportunities = opportunityList.filter(opp => {
    switch (opportunityFilter) {
      case "won":
        return opp.stage === "closed_won";
      case "lost":
        return opp.stage === "closed_lost";
      case "by_stage":
        return !["closed_won", "closed_lost"].includes(opp.stage);
      default:
        return true;
    }
  });

  const handleCreateQuote = () => {
    setIsQuoteDialogOpen(false);
    toast({
      title: "Crear cotización",
      description: "Funcionalidad en desarrollo. Pronto podrás crear cotizaciones para esta oportunidad."
    });
  };

  const handleDeleteOpportunity = () => {
    if (!currentOpportunity) return;
    
    setOpportunityList(opportunityList.filter(opp => opp.id !== currentOpportunity.id));
    setIsDeleteDialogOpen(false);
    setCurrentOpportunity(null);
    toast({
      title: "Oportunidad eliminada",
      description: `La oportunidad ${currentOpportunity.name} ha sido eliminada.`,
      variant: "destructive"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Oportunidades</h1>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            className={`${viewMode === "list" ? "bg-secondary" : ""}`}
            onClick={() => setViewMode("list")}
          >
            <ListIcon className="mr-2 h-4 w-4" />
            Lista
          </Button>
          <Button
            variant="outline"
            className={`${viewMode === "pipeline" ? "bg-secondary" : ""}`}
            onClick={() => setViewMode("pipeline")}
          >
            <KanbanIcon className="mr-2 h-4 w-4" />
            Pipeline
          </Button>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <TrendingUp className="mr-2 h-4 w-4" /> Añadir Oportunidad
          </Button>
        </div>
      </div>
      
      {viewMode === "list" ? (
        <Card>
          <CardHeader>
            <CardTitle>Todas las Oportunidades</CardTitle>
            <CardDescription>
              Gestiona el pipeline de ventas y realiza seguimiento de tus oportunidades.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex mb-4 gap-2">
              <Button 
                variant={opportunityFilter === "by_stage" ? "default" : "outline"} 
                size="sm" 
                onClick={() => setOpportunityFilter(opportunityFilter === "by_stage" ? "all" : "by_stage")}
              >
                <LineChart className="mr-2 h-4 w-4" /> Por etapa
              </Button>
              <Button 
                variant={opportunityFilter === "won" ? "default" : "outline"} 
                size="sm" 
                onClick={() => setOpportunityFilter(opportunityFilter === "won" ? "all" : "won")}
              >
                <LineChart className="mr-2 h-4 w-4" /> Ganadas
              </Button>
              <Button 
                variant={opportunityFilter === "lost" ? "default" : "outline"} 
                size="sm" 
                onClick={() => setOpportunityFilter(opportunityFilter === "lost" ? "all" : "lost")}
              >
                <LineChart className="mr-2 h-4 w-4" /> Perdidas
              </Button>
            </div>
            <OpportunityList 
              opportunities={filteredOpportunities}
              onEdit={(opp) => {
                setCurrentOpportunity(opp);
                setRelatedTasks(tasks.filter(task => 
                  task.relatedTo?.type === "opportunity" && 
                  task.relatedTo.id === opp.id
                ));
                setRelatedQuotes(quotes.filter(quote => quote.opportunityId === opp.id));
                setIsEditDialogOpen(true);
              }}
              onDelete={(opp) => {
                setCurrentOpportunity(opp);
                setIsDeleteDialogOpen(true);
              }}
            />
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Pipeline de Oportunidades</CardTitle>
            <CardDescription>
              Visualiza y arrastra tus oportunidades a través de las diferentes etapas del pipeline.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <OpportunityPipeline 
              stageColumns={stageColumns} 
              opportunities={filteredOpportunities} 
              onOpportunityUpdate={(updatedOpp) => {
                setOpportunityList(opportunityList.map(opp => 
                  opp.id === updatedOpp.id ? updatedOpp : opp
                ));
              }}
              companies={companies}
              onOpenTaskDialog={() => setIsTaskDialogOpen(true)}
              onOpenQuoteDialog={() => setIsQuoteDialogOpen(true)}
            />
          </CardContent>
        </Card>
      )}

      <CreateOpportunityDialog 
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        companies={companies}
        onOpportunityCreate={(newOpp) => {
          setOpportunityList([...opportunityList, newOpp]);
        }}
      />

      <EditOpportunityDialog 
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        opportunity={currentOpportunity}
        companies={companies}
        relatedTasks={relatedTasks}
        relatedQuotes={relatedQuotes}
        onOpportunityUpdate={(updatedOpp) => {
          setOpportunityList(opportunityList.map(opp => 
            opp.id === updatedOpp.id ? updatedOpp : opp
          ));
        }}
        onOpenTaskDialog={() => setIsTaskDialogOpen(true)}
        onOpenQuoteDialog={() => setIsQuoteDialogOpen(true)}
      />

      <DeleteOpportunityDialog 
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        opportunity={currentOpportunity}
        onDelete={handleDeleteOpportunity}
      />

      <CreateTaskDialog 
        open={isTaskDialogOpen}
        onOpenChange={setIsTaskDialogOpen}
        opportunity={currentOpportunity}
        onTaskCreate={(newTask) => {
          setRelatedTasks([...relatedTasks, newTask]);
        }}
      />

      <CreateQuoteDialog 
        open={isQuoteDialogOpen}
        onOpenChange={setIsQuoteDialogOpen}
        opportunity={currentOpportunity}
        onQuoteCreate={handleCreateQuote}
      />
    </div>
  );
}
