
import { useState } from "react";
import { Product } from "@/types/crm";
import { products } from "@/data/crmData";
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
  Search, Package, PencilIcon, Trash2, PackagePlus, Tag, Briefcase
} from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

export default function ProductsPage() {
  const [productList, setProductList] = useState<Product[]>(products);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterActive, setFilterActive] = useState<string>("all");
  
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    type: "product",
    description: "",
    sku: "",
    price: 0,
    cost: 0,
    taxRate: 21,
    category: "",
    hasVariants: false,
    active: true
  });

  const filteredProducts = productList.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (product.sku && product.sku.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = filterType === "all" || product.type === filterType;
    const matchesActive = filterActive === "all" || 
      (filterActive === "active" && product.active) || 
      (filterActive === "inactive" && !product.active);
    
    return matchesSearch && matchesType && matchesActive;
  });

  const handleCreateProduct = () => {
    const id = (Math.max(...productList.map(p => Number(p.id)), 0) + 1).toString();
    const product: Product = {
      id,
      type: newProduct.type as "product" | "service" | "package",
      name: newProduct.name || "",
      description: newProduct.description,
      sku: newProduct.sku,
      price: newProduct.price || 0,
      cost: newProduct.cost || 0,
      taxRate: newProduct.taxRate || 21,
      category: newProduct.category,
      hasVariants: newProduct.hasVariants || false,
      variants: newProduct.hasVariants ? [] : undefined,
      packageItems: newProduct.type === "package" ? [] : undefined,
      active: true,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };
    
    setProductList([...productList, product]);
    setNewProduct({
      name: "",
      type: "product",
      description: "",
      sku: "",
      price: 0,
      cost: 0,
      taxRate: 21,
      category: "",
      hasVariants: false,
      active: true
    });
    setIsCreateDialogOpen(false);
    toast({
      title: "Producto creado",
      description: `El producto ${product.name} ha sido creado con éxito.`,
    });
  };

  const handleEditProduct = () => {
    if (!currentProduct) return;
    
    const updatedProduct = {
      ...currentProduct,
      updatedAt: new Date().toISOString().split('T')[0]
    };
    
    setProductList(productList.map(prod => 
      prod.id === currentProduct.id ? updatedProduct : prod
    ));
    
    setIsEditDialogOpen(false);
    setCurrentProduct(null);
    toast({
      title: "Producto actualizado",
      description: `El producto ${updatedProduct.name} ha sido actualizado con éxito.`
    });
  };

  const handleDeleteProduct = () => {
    if (!currentProduct) return;
    
    setProductList(productList.filter(prod => prod.id !== currentProduct.id));
    setIsDeleteDialogOpen(false);
    setCurrentProduct(null);
    toast({
      title: "Producto eliminado",
      description: `El producto ${currentProduct.name} ha sido eliminado.`,
      variant: "destructive"
    });
  };

  const getProductTypeBadge = (type: string) => {
    switch (type) {
      case "product":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Producto</Badge>;
      case "service":
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">Servicio</Badge>;
      case "package":
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">Paquete</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const getProductTypeIcon = (type: string) => {
    switch (type) {
      case "product":
        return <Package className="h-4 w-4" />;
      case "service":
        return <Briefcase className="h-4 w-4" />;
      case "package":
        return <Tag className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Productos</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <PackagePlus className="mr-2 h-4 w-4" /> Añadir Producto
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Catálogo de Productos</CardTitle>
          <CardDescription>
            Gestiona productos, servicios y paquetes para tus cotizaciones.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar productos..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select 
              value={filterType} 
              onValueChange={setFilterType}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los tipos</SelectItem>
                <SelectItem value="product">Productos</SelectItem>
                <SelectItem value="service">Servicios</SelectItem>
                <SelectItem value="package">Paquetes</SelectItem>
              </SelectContent>
            </Select>
            <Select 
              value={filterActive} 
              onValueChange={setFilterActive}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="active">Activos</SelectItem>
                <SelectItem value="inactive">Inactivos</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Precio</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map(product => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getProductTypeIcon(product.type)}
                        <span className="font-medium">{product.name}</span>
                      </div>
                      {product.hasVariants && (
                        <span className="text-xs text-muted-foreground ml-6 mt-1">
                          Con variantes ({product.variants?.length || 0})
                        </span>
                      )}
                    </TableCell>
                    <TableCell>{getProductTypeBadge(product.type)}</TableCell>
                    <TableCell>{product.sku || "-"}</TableCell>
                    <TableCell>{formatCurrency(product.price)}</TableCell>
                    <TableCell>
                      {product.active ? (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">Activo</Badge>
                      ) : (
                        <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200">Inactivo</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => {
                          setCurrentProduct(product);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => {
                          setCurrentProduct(product);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredProducts.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No se encontraron productos
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Create Product Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Añadir Nuevo Producto</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="general">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="general">Información General</TabsTrigger>
              <TabsTrigger value="pricing">Precios y Detalles</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general">
              <div className="grid gap-4 py-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="type">Tipo*</Label>
                  <Select 
                    onValueChange={(value) => setNewProduct({...newProduct, type: value as any})}
                    defaultValue={newProduct.type}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="product">Producto</SelectItem>
                      <SelectItem value="service">Servicio</SelectItem>
                      <SelectItem value="package">Paquete</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">Nombre*</Label>
                  <Input 
                    id="name" 
                    value={newProduct.name} 
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    required
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea 
                    id="description" 
                    value={newProduct.description} 
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label htmlFor="category">Categoría</Label>
                  <Input 
                    id="category" 
                    value={newProduct.category} 
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasVariants"
                    checked={newProduct.hasVariants}
                    onCheckedChange={(checked) => 
                      setNewProduct({...newProduct, hasVariants: checked === true})
                    }
                  />
                  <label
                    htmlFor="hasVariants"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Este producto tiene variantes
                  </label>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="pricing">
              <div className="grid gap-4 py-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input 
                    id="sku" 
                    value={newProduct.sku} 
                    onChange={(e) => setNewProduct({...newProduct, sku: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="price">Precio de Venta*</Label>
                    <Input 
                      id="price" 
                      type="number" 
                      min="0"
                      step="0.01"
                      value={newProduct.price || ""} 
                      onChange={(e) => setNewProduct({...newProduct, price: parseFloat(e.target.value) || 0})}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="cost">Costo</Label>
                    <Input 
                      id="cost" 
                      type="number" 
                      min="0"
                      step="0.01"
                      value={newProduct.cost || ""} 
                      onChange={(e) => setNewProduct({...newProduct, cost: parseFloat(e.target.value) || 0})}
                    />
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label htmlFor="taxRate">Porcentaje de Impuesto (%)</Label>
                  <Input 
                    id="taxRate" 
                    type="number" 
                    min="0"
                    max="100"
                    value={newProduct.taxRate || ""} 
                    onChange={(e) => setNewProduct({...newProduct, taxRate: parseFloat(e.target.value) || 0})}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleCreateProduct} 
              disabled={!newProduct.name || !newProduct.price}
            >
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Editar Producto</DialogTitle>
          </DialogHeader>
          {currentProduct && (
            <Tabs defaultValue="general">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="general">Información General</TabsTrigger>
                <TabsTrigger value="pricing">Precios y Detalles</TabsTrigger>
              </TabsList>
              
              <TabsContent value="general">
                <div className="grid gap-4 py-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="edit-type">Tipo*</Label>
                    <Select 
                      defaultValue={currentProduct.type}
                      onValueChange={(value) => setCurrentProduct({...currentProduct, type: value as any})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="product">Producto</SelectItem>
                        <SelectItem value="service">Servicio</SelectItem>
                        <SelectItem value="package">Paquete</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="edit-name">Nombre*</Label>
                    <Input 
                      id="edit-name" 
                      value={currentProduct.name} 
                      onChange={(e) => setCurrentProduct({...currentProduct, name: e.target.value})}
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="edit-description">Descripción</Label>
                    <Textarea 
                      id="edit-description" 
                      value={currentProduct.description || ""} 
                      onChange={(e) => setCurrentProduct({...currentProduct, description: e.target.value})}
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="edit-category">Categoría</Label>
                    <Input 
                      id="edit-category" 
                      value={currentProduct.category || ""} 
                      onChange={(e) => setCurrentProduct({...currentProduct, category: e.target.value})}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="edit-active"
                      checked={currentProduct.active}
                      onCheckedChange={(checked) => 
                        setCurrentProduct({...currentProduct, active: checked === true})
                      }
                    />
                    <label
                      htmlFor="edit-active"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Este producto está activo
                    </label>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="pricing">
                <div className="grid gap-4 py-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="edit-sku">SKU</Label>
                    <Input 
                      id="edit-sku" 
                      value={currentProduct.sku || ""} 
                      onChange={(e) => setCurrentProduct({...currentProduct, sku: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="edit-price">Precio de Venta*</Label>
                      <Input 
                        id="edit-price" 
                        type="number" 
                        min="0"
                        step="0.01"
                        value={currentProduct.price} 
                        onChange={(e) => setCurrentProduct({
                          ...currentProduct, 
                          price: parseFloat(e.target.value) || 0
                        })}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="edit-cost">Costo</Label>
                      <Input 
                        id="edit-cost" 
                        type="number" 
                        min="0"
                        step="0.01"
                        value={currentProduct.cost || ""} 
                        onChange={(e) => setCurrentProduct({
                          ...currentProduct, 
                          cost: parseFloat(e.target.value) || 0
                        })}
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="edit-taxRate">Porcentaje de Impuesto (%)</Label>
                    <Input 
                      id="edit-taxRate" 
                      type="number" 
                      min="0"
                      max="100"
                      value={currentProduct.taxRate || ""} 
                      onChange={(e) => setCurrentProduct({
                        ...currentProduct, 
                        taxRate: parseFloat(e.target.value) || 0
                      })}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleEditProduct} 
              disabled={!currentProduct?.name || !currentProduct?.price}
            >
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Product Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Eliminar Producto</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>¿Estás seguro de que quieres eliminar el producto "{currentProduct?.name}"?</p>
            <p className="text-sm text-muted-foreground mt-2">Esta acción no se puede deshacer.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteProduct}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
