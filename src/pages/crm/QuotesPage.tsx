import { useState } from "react";
import { quotes, opportunities, products, companies } from "@/data/crm";
import { Quote, QuoteItem } from "@/types/crm";
import {
  Card, CardHeader, CardTitle, CardDescription, CardContent
} from "@/components/ui/card";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from "@/components/ui/dialog";
import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FilePlus, Search } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { format } from "date-fns";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "@/hooks/use-toast";
import { QuotePDF } from "@/components/crm/quotes/QuotePDF";
import { QuotesList } from "@/components/crm/quotes/QuotesList";
import { QuoteItemForm } from "@/components/crm/quotes/QuoteItemForm";
import { QuoteItemsTable } from "@/components/crm/quotes/QuoteItemsTable";
import { EditQuoteDialog } from "@/components/crm/quotes/EditQuoteDialog";

export default function QuotesPage() {
  const [quoteList, setQuoteList] = useState<Quote[]>(quotes);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [newQuote, setNewQuote] = useState<Partial<Quote>>({
    name: "",
    opportunityId: "",
    clientId: "",
    clientName: "",
    status: "draft",
    amount: 0,
    discount: 0,
    tax: 21,
    totalAmount: 0,
    validUntil: new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
    items: [],
    notes: ""
  });
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(Date.now() + 30*24*60*60*1000)
  );
  
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);
  const [newQuoteItem, setNewQuoteItem] = useState<Partial<QuoteItem>>({
    productId: "",
    productName: "",
    quantity: 1,
    unitPrice: 0,
    discount: 0,
    tax: 21,
    totalPrice: 0
  });

  const [showPDF, setShowPDF] = useState(false);
  const [selectedQuoteForPDF, setSelectedQuoteForPDF] = useState<Quote | null>(null);

  const filteredQuotes = quoteList.filter(quote => {
    const matchesSearch = 
      quote.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterStatus === "all") {
      return matchesSearch;
    } else {
      return matchesSearch && quote.status === filterStatus;
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Cotizaciones</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <FilePlus className="mr-2 h-4 w-4" /> Nueva Cotización
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Todas las Cotizaciones</CardTitle>
          <CardDescription>
            Gestiona las propuestas comerciales para tus clientes y oportunidades.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex mb-4 gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar cotizaciones..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select 
              value={filterStatus} 
              onValueChange={setFilterStatus}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="draft">Borradores</SelectItem>
                <SelectItem value="sent">Enviadas</SelectItem>
                <SelectItem value="accepted">Aceptadas</SelectItem>
                <SelectItem value="rejected">Rechazadas</SelectItem>
                <SelectItem value="expired">Expiradas</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <QuotesList 
            quotes={filteredQuotes}
            onEdit={(quote) => {
              setCurrentQuote(quote);
              setIsEditDialogOpen(true);
            }}
            onDelete={(quote) => {
              setCurrentQuote(quote);
              setIsDeleteDialogOpen(true);
            }}
            onExportPDF={handleExportPDF}
          />
        </CardContent>
      </Card>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[900px] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Nueva Cotización</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="info">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="info">Información General</TabsTrigger>
              <TabsTrigger value="items">Elementos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="info" className="space-y-4 mt-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Nombre de la Cotización*</Label>
                <Input 
                  id="name" 
                  value={newQuote.name} 
                  onChange={(e) => setNewQuote({...newQuote, name: e.target.value})}
                  required
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <Label htmlFor="opportunity">Oportunidad Relacionada</Label>
                <Select 
                  onValueChange={(value) => {
                    const selectedOpp = opportunities.find(o => o.id === value);
                    const clientId = companies.find(c => c.name === selectedOpp?.company)?.id || "";
                    
                    setNewQuote({
                      ...newQuote, 
                      opportunityId: value,
                      clientId,
                      clientName: selectedOpp?.company || ""
                    });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una oportunidad" />
                  </SelectTrigger>
                  <SelectContent>
                    {opportunities
                      .filter(o => !["closed_won", "closed_lost"].includes(o.stage))
                      .map(opportunity => (
                        <SelectItem key={opportunity.id} value={opportunity.id}>
                          {opportunity.name} ({opportunity.company})
                        </SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex flex-col gap-2">
                <Label htmlFor="client">Cliente*</Label>
                <Select 
                  value={newQuote.clientId}
                  onValueChange={(value) => {
                    const selectedCompany = companies.find(c => c.id === value);
                    setNewQuote({
                      ...newQuote, 
                      clientId: value,
                      clientName: selectedCompany?.name || ""
                    });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    {companies.map(company => (
                      <SelectItem key={company.id} value={company.id}>{company.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="discount">Descuento Global</Label>
                  <Input 
                    id="discount" 
                    type="number" 
                    min="0"
                    step="0.01"
                    value={newQuote.discount || ""} 
                    onChange={(e) => {
                      const discountValue = parseFloat(e.target.value) || 0;
                      const newTotalAmount = calculateTotalAmount(
                        quoteItems, 
                        discountValue, 
                        newQuote.tax || 21
                      );
                      
                      setNewQuote({
                        ...newQuote, 
                        discount: discountValue,
                        totalAmount: newTotalAmount
                      });
                    }}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="tax">Impuesto (%)</Label>
                  <Input 
                    id="tax" 
                    type="number" 
                    min="0"
                    max="100"
                    value={newQuote.tax || ""} 
                    onChange={(e) => {
                      const taxValue = parseFloat(e.target.value) || 0;
                      const newTotalAmount = calculateTotalAmount(
                        quoteItems, 
                        newQuote.discount || 0, 
                        taxValue
                      );
                      
                      setNewQuote({
                        ...newQuote, 
                        tax: taxValue,
                        totalAmount: newTotalAmount
                      });
                    }}
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <Label htmlFor="validUntil">Válido hasta</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "d MMM yyyy", { locale: es }) : "Seleccionar fecha"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                      locale={es}
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="flex flex-col gap-2">
                <Label htmlFor="notes">Notas</Label>
                <Textarea 
                  id="notes" 
                  value={newQuote.notes || ""} 
                  onChange={(e) => setNewQuote({...newQuote, notes: e.target.value})}
                  placeholder="Términos y condiciones, notas adicionales, etc."
                />
              </div>
            </TabsContent>
            
            <TabsContent value="items" className="space-y-4 mt-4">
              <QuoteItemForm onAddItem={(item) => {
                const id = Math.random().toString(36).substr(2, 9);
                const newItem = { ...item, id };
                handleAddQuoteItem(newItem);
              }} />
              
              <QuoteItemsTable 
                items={quoteItems}
                onRemoveItem={handleRemoveQuoteItem}
              />
              
              <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span className="font-medium">{formatCurrency(calculateSubtotal(quoteItems))}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Descuento:</span>
                  <span className="font-medium">{formatCurrency(newQuote.discount || 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Impuestos ({newQuote.tax || 21}%):</span>
                  <span className="font-medium">
                    {formatCurrency((calculateSubtotal(quoteItems) - (newQuote.discount || 0)) * ((newQuote.tax || 21) / 100))}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>{formatCurrency(calculateTotalAmount(quoteItems, newQuote.discount || 0, newQuote.tax || 21))}</span>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleCreateQuote} 
              disabled={!newQuote.name || !newQuote.clientName || quoteItems.length === 0}
            >
              Guardar Cotización
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <EditQuoteDialog 
        quote={currentQuote}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSave={handleEditQuote}
        onUpdate={setCurrentQuote}
      />

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Eliminar Cotización</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>¿Estás seguro de que quieres eliminar la cotización "{currentQuote?.name}"?</p>
            <p className="text-sm text-muted-foreground mt-2">Esta acción no se puede deshacer.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteQuote}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showPDF} onOpenChange={setShowPDF}>
        <DialogContent className="max-w-[900px] h-[800px]">
          <DialogHeader>
            <DialogTitle>Vista previa de PDF</DialogTitle>
          </DialogHeader>
          {selectedQuoteForPDF && <QuotePDF quote={selectedQuoteForPDF} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
