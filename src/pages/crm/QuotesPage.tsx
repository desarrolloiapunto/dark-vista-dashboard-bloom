
import { useState } from "react";
import { quotes, opportunities, products, companies } from "@/data/crm";
import { Quote, QuoteItem } from "@/types/crm";
import {
  Card, CardHeader, CardTitle, CardDescription, CardContent
} from "@/components/ui/card";
import {
  Table, TableHeader, TableRow, TableHead, TableBody, TableCell
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from "@/components/ui/dialog";
import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { 
  Search, FileText, PencilIcon, Trash2, CalendarIcon, FilePlus, Package, Plus, Minus
} from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

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

  const handleAddQuoteItem = () => {
    if (!newQuoteItem.productId || !newQuoteItem.quantity || !newQuoteItem.unitPrice) {
      toast({
        title: "Error",
        description: "Por favor, completa todos los campos requeridos.",
        variant: "destructive"
      });
      return;
    }
    
    const selectedProduct = products.find(p => p.id === newQuoteItem.productId);
    
    const id = Math.random().toString(36).substr(2, 9);
    const totalPrice = 
      (newQuoteItem.quantity || 1) * (newQuoteItem.unitPrice || 0) - 
      (newQuoteItem.discount || 0);
    
    const item: QuoteItem = {
      id,
      productId: newQuoteItem.productId || "",
      productName: selectedProduct?.name || newQuoteItem.productName || "",
      quantity: newQuoteItem.quantity || 1,
      unitPrice: newQuoteItem.unitPrice || 0,
      discount: newQuoteItem.discount || 0,
      tax: newQuoteItem.tax || 21,
      totalPrice
    };
    
    setQuoteItems([...quoteItems, item]);
    
    // Actualizar subtotal, impuestos y total
    const newTotalAmount = calculateTotalAmount([...quoteItems, item], newQuote.discount || 0, newQuote.tax || 21);
    setNewQuote({
      ...newQuote,
      amount: calculateSubtotal([...quoteItems, item]),
      totalAmount: newTotalAmount
    });
    
    // Limpiar el form de item
    setNewQuoteItem({
      productId: "",
      productName: "",
      quantity: 1,
      unitPrice: 0,
      discount: 0,
      tax: 21,
      totalPrice: 0
    });
  };
  
  const handleRemoveQuoteItem = (itemId: string) => {
    const updatedItems = quoteItems.filter(item => item.id !== itemId);
    setQuoteItems(updatedItems);
    
    // Actualizar subtotal, impuestos y total
    const newTotalAmount = calculateTotalAmount(updatedItems, newQuote.discount || 0, newQuote.tax || 21);
    setNewQuote({
      ...newQuote,
      amount: calculateSubtotal(updatedItems),
      totalAmount: newTotalAmount
    });
  };
  
  const calculateSubtotal = (items: QuoteItem[]) => {
    return items.reduce((sum, item) => sum + item.totalPrice, 0);
  };
  
  const calculateTotalAmount = (items: QuoteItem[], discount: number, taxRate: number) => {
    const subtotal = calculateSubtotal(items);
    const afterDiscount = subtotal - discount;
    const taxAmount = afterDiscount * (taxRate / 100);
    return afterDiscount + taxAmount;
  };

  const handleCreateQuote = () => {
    const id = (Math.max(...quoteList.map(q => Number(q.id)), 0) + 1).toString();
    
    // Calcular montos
    const subtotal = calculateSubtotal(quoteItems);
    const totalAmount = calculateTotalAmount(quoteItems, newQuote.discount || 0, newQuote.tax || 21);
    
    const quote: Quote = {
      id,
      name: newQuote.name || "",
      opportunityId: newQuote.opportunityId || "",
      clientId: newQuote.clientId || "",
      clientName: newQuote.clientName || "",
      status: "draft",
      amount: subtotal,
      discount: newQuote.discount || 0,
      tax: newQuote.tax || 21,
      totalAmount,
      validUntil: selectedDate ? format(selectedDate, "yyyy-MM-dd") : new Date().toISOString().split('T')[0],
      items: quoteItems,
      notes: newQuote.notes,
      createdAt: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    setQuoteList([...quoteList, quote]);
    
    // Resetear estados
    setNewQuote({
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
    setQuoteItems([]);
    setSelectedDate(new Date(Date.now() + 30*24*60*60*1000));
    setIsCreateDialogOpen(false);
    
    toast({
      title: "Cotización creada",
      description: `La cotización ${quote.name} ha sido creada con éxito.`,
    });
  };

  const handleEditQuote = () => {
    if (!currentQuote) return;
    
    const updatedQuote = {
      ...currentQuote,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    setQuoteList(quoteList.map(quote => 
      quote.id === currentQuote.id ? updatedQuote : quote
    ));
    
    setIsEditDialogOpen(false);
    setCurrentQuote(null);
    toast({
      title: "Cotización actualizada",
      description: `La cotización ${updatedQuote.name} ha sido actualizada con éxito.`
    });
  };

  const handleDeleteQuote = () => {
    if (!currentQuote) return;
    
    setQuoteList(quoteList.filter(quote => quote.id !== currentQuote.id));
    setIsDeleteDialogOpen(false);
    setCurrentQuote(null);
    toast({
      title: "Cotización eliminada",
      description: `La cotización ${currentQuote.name} ha sido eliminada.`,
      variant: "destructive"
    });
  };

  const getQuoteStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">Borrador</Badge>;
      case "sent":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Enviada</Badge>;
      case "accepted":
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Aceptada</Badge>;
      case "rejected":
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Rechazada</Badge>;
      case "expired":
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">Expirada</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "d MMM yyyy", { locale: es });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

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
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Monto Total</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Válido hasta</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQuotes.map(quote => (
                  <TableRow key={quote.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        {quote.name}
                      </div>
                    </TableCell>
                    <TableCell>{quote.clientName}</TableCell>
                    <TableCell>{formatCurrency(quote.totalAmount)}</TableCell>
                    <TableCell>{getQuoteStatusBadge(quote.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                        {formatDate(quote.validUntil)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => {
                          setCurrentQuote(quote);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => {
                          setCurrentQuote(quote);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredQuotes.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No se encontraron cotizaciones
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Create Quote Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
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
              <div className="grid grid-cols-1 gap-4 p-4 border rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="product">Producto/Servicio</Label>
                    <Select 
                      value={newQuoteItem.productId}
                      onValueChange={(value) => {
                        const selectedProduct = products.find(p => p.id === value);
                        if (selectedProduct) {
                          setNewQuoteItem({
                            ...newQuoteItem,
                            productId: value,
                            productName: selectedProduct.name,
                            unitPrice: selectedProduct.price,
                            tax: selectedProduct.taxRate || 21,
                            totalPrice: selectedProduct.price * (newQuoteItem.quantity || 1)
                          });
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un producto" />
                      </SelectTrigger>
                      <SelectContent>
                        {products.map(product => (
                          <SelectItem key={product.id} value={product.id}>
                            {product.name} - {formatCurrency(product.price)}
                          </SelectItem>
                        ))}
                        <SelectItem value="custom">Producto/Servicio Personalizado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {newQuoteItem.productId === "custom" && (
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="customProductName">Nombre del producto/servicio</Label>
                      <Input 
                        id="customProductName" 
                        value={newQuoteItem.productName} 
                        onChange={(e) => setNewQuoteItem({...newQuoteItem, productName: e.target.value})}
                      />
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="quantity">Cantidad</Label>
                    <Input 
                      id="quantity" 
                      type="number" 
                      min="1"
                      step="1"
                      value={newQuoteItem.quantity || "1"} 
                      onChange={(e) => {
                        const qty = parseInt(e.target.value) || 1;
                        const price = newQuoteItem.unitPrice || 0;
                        const discount = newQuoteItem.discount || 0;
                        const totalPrice = qty * price - discount;
                        
                        setNewQuoteItem({
                          ...newQuoteItem, 
                          quantity: qty,
                          totalPrice
                        });
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="unitPrice">Precio Unitario</Label>
                    <Input 
                      id="unitPrice" 
                      type="number" 
                      min="0"
                      step="0.01"
                      value={newQuoteItem.unitPrice || ""} 
                      onChange={(e) => {
                        const price = parseFloat(e.target.value) || 0;
                        const qty = newQuoteItem.quantity || 1;
                        const discount = newQuoteItem.discount || 0;
                        const totalPrice = qty * price - discount;
                        
                        setNewQuoteItem({
                          ...newQuoteItem, 
                          unitPrice: price,
                          totalPrice
                        });
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="itemDiscount">Descuento</Label>
                    <Input 
                      id="itemDiscount" 
                      type="number" 
                      min="0"
                      step="0.01"
                      value={newQuoteItem.discount || ""} 
                      onChange={(e) => {
                        const discount = parseFloat(e.target.value) || 0;
                        const qty = newQuoteItem.quantity || 1;
                        const price = newQuoteItem.unitPrice || 0;
                        const totalPrice = qty * price - discount;
                        
                        setNewQuoteItem({
                          ...newQuoteItem, 
                          discount,
                          totalPrice
                        });
                      }}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end mt-2">
                  <Button onClick={handleAddQuoteItem}>
                    <Plus className="mr-2 h-4 w-4" /> Añadir Elemento
                  </Button>
                </div>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Producto/Servicio</TableHead>
                      <TableHead className="text-right">Cantidad</TableHead>
                      <TableHead className="text-right">Precio Unitario</TableHead>
                      <TableHead className="text-right">Descuento</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {quoteItems.length > 0 ? (
                      quoteItems.map(item => (
                        <TableRow key={item.id}>
                          <TableCell>{item.productName}</TableCell>
                          <TableCell className="text-right">{item.quantity}</TableCell>
                          <TableCell className="text-right">{formatCurrency(item.unitPrice)}</TableCell>
                          <TableCell className="text-right">{formatCurrency(item.discount || 0)}</TableCell>
                          <TableCell className="text-right">{formatCurrency(item.totalPrice)}</TableCell>
                          <TableCell>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleRemoveQuoteItem(item.id)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          No hay elementos en la cotización
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              
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

      {/* Edit Quote Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Editar Cotización</DialogTitle>
          </DialogHeader>
          {currentQuote && (
            <div className="grid gap-4 py-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="edit-name">Nombre*</Label>
                <Input 
                  id="edit-name" 
                  value={currentQuote.name} 
                  onChange={(e) => setCurrentQuote({...currentQuote, name: e.target.value})}
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <Label htmlFor="edit-status">Estado</Label>
                <Select 
                  value={currentQuote.status}
                  onValueChange={(value) => setCurrentQuote({...currentQuote, status: value as any})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Borrador</SelectItem>
                    <SelectItem value="sent">Enviada</SelectItem>
                    <SelectItem value="accepted">Aceptada</SelectItem>
                    <SelectItem value="rejected">Rechazada</SelectItem>
                    <SelectItem value="expired">Expirada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex flex-col gap-2">
                <Label htmlFor="edit-validUntil">Válido hasta</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formatDate(currentQuote.validUntil)}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={new Date(currentQuote.validUntil)}
                      onSelect={(date) => date && setCurrentQuote({
                        ...currentQuote, 
                        validUntil: format(date, "yyyy-MM-dd")
                      })}
                      initialFocus
                      locale={es}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="flex flex-col gap-2">
                <Label htmlFor="edit-notes">Notas</Label>
                <Textarea 
                  id="edit-notes" 
                  value={currentQuote.notes || ""} 
                  onChange={(e) => setCurrentQuote({...currentQuote, notes: e.target.value})}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleEditQuote} 
              disabled={!currentQuote?.name}
            >
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Quote Dialog */}
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
    </div>
  );
}
