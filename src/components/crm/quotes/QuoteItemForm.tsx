
import { useState } from "react";
import { Product } from "@/types/crm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { products } from "@/data/crm";

interface QuoteItemFormProps {
  onAddItem: (item: {
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    discount: number;
    tax: number;
    totalPrice: number;
  }) => void;
}

export const QuoteItemForm = ({ onAddItem }: QuoteItemFormProps) => {
  const [newItem, setNewItem] = useState({
    productId: "",
    productName: "",
    quantity: 1,
    unitPrice: 0,
    discount: 0,
    tax: 21,
    totalPrice: 0
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const handleAddItem = () => {
    if (!newItem.productId || !newItem.quantity || !newItem.unitPrice) return;
    
    onAddItem(newItem);
    
    setNewItem({
      productId: "",
      productName: "",
      quantity: 1,
      unitPrice: 0,
      discount: 0,
      tax: 21,
      totalPrice: 0
    });
  };

  return (
    <div className="grid grid-cols-1 gap-4 p-4 border rounded-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="product">Producto/Servicio</Label>
          <Select 
            value={newItem.productId}
            onValueChange={(value) => {
              const selectedProduct = products.find(p => p.id === value);
              if (selectedProduct) {
                const totalPrice = selectedProduct.price * newItem.quantity - newItem.discount;
                setNewItem({
                  ...newItem,
                  productId: value,
                  productName: selectedProduct.name,
                  unitPrice: selectedProduct.price,
                  tax: selectedProduct.taxRate || 21,
                  totalPrice
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
        
        {newItem.productId === "custom" && (
          <div className="flex flex-col gap-2">
            <Label htmlFor="customProductName">Nombre del producto/servicio</Label>
            <Input 
              id="customProductName" 
              value={newItem.productName} 
              onChange={(e) => setNewItem({...newItem, productName: e.target.value})}
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
            value={newItem.quantity} 
            onChange={(e) => {
              const qty = parseInt(e.target.value) || 1;
              const totalPrice = qty * newItem.unitPrice - newItem.discount;
              setNewItem({...newItem, quantity: qty, totalPrice});
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
            value={newItem.unitPrice} 
            onChange={(e) => {
              const price = parseFloat(e.target.value) || 0;
              const totalPrice = newItem.quantity * price - newItem.discount;
              setNewItem({...newItem, unitPrice: price, totalPrice});
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
            value={newItem.discount} 
            onChange={(e) => {
              const discount = parseFloat(e.target.value) || 0;
              const totalPrice = newItem.quantity * newItem.unitPrice - discount;
              setNewItem({...newItem, discount, totalPrice});
            }}
          />
        </div>
      </div>
      
      <div className="flex justify-end mt-2">
        <Button onClick={handleAddItem}>
          <Plus className="mr-2 h-4 w-4" /> Añadir Elemento
        </Button>
      </div>
    </div>
  );
};
