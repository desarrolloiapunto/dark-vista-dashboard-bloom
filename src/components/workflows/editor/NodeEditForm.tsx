import { useState } from 'react';
import { Node } from '@xyflow/react';
import { useTranslation } from 'react-i18next';
import { Plus, X } from 'lucide-react';

// Import UI components individually
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Define the type for our node data
interface NodeData {
  label?: string;
  content?: string;
  prompt?: string;
  condition?: string;
  action?: string;
  menuItems?: string[];
  multimediaType?: "productCard" | "video" | "pdf" | "imageGallery";
  multimediaContent?: {
    title?: string;
    description?: string;
    mediaUrl?: string;
    products?: {
      id: string;
      name: string;
      description: string;
      price: number;
      imageUrl: string;
      paymentLink?: string;
      infoLink?: string;
    }[];
    dynamicSource?: string;
    links?: {
      label: string;
      url: string;
    }[];
  };
  // Add index signature to satisfy Record<string, unknown>
  [key: string]: unknown;
}

interface NodeEditFormProps {
  selectedNode: Node<NodeData> | null;
  editedNodeData: NodeData | null;
  setEditedNodeData: (data: NodeData) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const NodeEditForm = ({ selectedNode, editedNodeData, setEditedNodeData, activeTab, setActiveTab }: NodeEditFormProps) => {
  const { t } = useTranslation();

  if (!selectedNode || !editedNodeData) return null;

  // Helper function to add a menu item
  const addMenuItem = () => {
    if (!editedNodeData) return;
    
    const currentItems = editedNodeData.menuItems || [];
    const newItem = `Option ${currentItems.length + 1}`;
    
    setEditedNodeData({
      ...editedNodeData,
      menuItems: [...currentItems, newItem]
    });
  };

  // Helper function to remove a menu item
  const removeMenuItem = (index: number) => {
    if (!editedNodeData?.menuItems) return;
    
    const updatedItems = [...editedNodeData.menuItems];
    updatedItems.splice(index, 1);
    
    setEditedNodeData({
      ...editedNodeData,
      menuItems: updatedItems
    });
  };

  // Helper function to update a menu item
  const updateMenuItem = (index: number, value: string) => {
    if (!editedNodeData?.menuItems) return;
    
    const updatedItems = [...editedNodeData.menuItems];
    updatedItems[index] = value;
    
    setEditedNodeData({
      ...editedNodeData,
      menuItems: updatedItems
    });
  };

  // Helper functions for multimedia nodes
  const handleMultimediaTypeChange = (value: string) => {
    if (!editedNodeData) return;
    
    // Cast value to the correct type
    const multimediaType = value as "productCard" | "video" | "pdf" | "imageGallery";
    
    // Set up default content based on the multimedia type
    let multimediaContent = editedNodeData.multimediaContent || {};
    
    switch (multimediaType) {
      case "productCard":
        multimediaContent = {
          ...multimediaContent,
          products: multimediaContent.products || [],
        };
        break;
      case "video":
      case "pdf":
        multimediaContent = {
          ...multimediaContent,
          mediaUrl: multimediaContent.mediaUrl || "",
        };
        break;
      case "imageGallery":
        multimediaContent = {
          ...multimediaContent,
          links: multimediaContent.links || [],
        };
        break;
    }
    
    setEditedNodeData({
      ...editedNodeData,
      multimediaType,
      multimediaContent
    });
  };

  const addProduct = () => {
    if (!editedNodeData?.multimediaContent) return;
    
    const products = editedNodeData.multimediaContent.products || [];
    const newProduct = {
      id: `prod_${Date.now()}`,
      name: "",
      description: "",
      price: 0,
      imageUrl: "",
    };
    
    setEditedNodeData({
      ...editedNodeData,
      multimediaContent: {
        ...editedNodeData.multimediaContent,
        products: [...products, newProduct]
      }
    });
  };

  const updateProduct = (index: number, field: string, value: any) => {
    if (!editedNodeData?.multimediaContent?.products) return;
    
    const updatedProducts = [...editedNodeData.multimediaContent.products];
    updatedProducts[index] = {
      ...updatedProducts[index],
      [field]: value
    };
    
    setEditedNodeData({
      ...editedNodeData,
      multimediaContent: {
        ...editedNodeData.multimediaContent,
        products: updatedProducts
      }
    });
  };

  const removeProduct = (index: number) => {
    if (!editedNodeData?.multimediaContent?.products) return;
    
    const updatedProducts = [...editedNodeData.multimediaContent.products];
    updatedProducts.splice(index, 1);
    
    setEditedNodeData({
      ...editedNodeData,
      multimediaContent: {
        ...editedNodeData.multimediaContent,
        products: updatedProducts
      }
    });
  };

  const addLink = () => {
    if (!editedNodeData?.multimediaContent) return;
    
    const links = editedNodeData.multimediaContent.links || [];
    const newLink = {
      label: "",
      url: "",
    };
    
    setEditedNodeData({
      ...editedNodeData,
      multimediaContent: {
        ...editedNodeData.multimediaContent,
        links: [...links, newLink]
      }
    });
  };

  const updateLink = (index: number, field: string, value: string) => {
    if (!editedNodeData?.multimediaContent?.links) return;
    
    const updatedLinks = [...editedNodeData.multimediaContent.links];
    updatedLinks[index] = {
      ...updatedLinks[index],
      [field]: value
    };
    
    setEditedNodeData({
      ...editedNodeData,
      multimediaContent: {
        ...editedNodeData.multimediaContent,
        links: updatedLinks
      }
    });
  };

  const removeLink = (index: number) => {
    if (!editedNodeData?.multimediaContent?.links) return;
    
    const updatedLinks = [...editedNodeData.multimediaContent.links];
    updatedLinks.splice(index, 1);
    
    setEditedNodeData({
      ...editedNodeData,
      multimediaContent: {
        ...editedNodeData.multimediaContent,
        links: updatedLinks
      }
    });
  };

  const updateDynamicSource = (value: string) => {
    if (!editedNodeData) return;
    
    setEditedNodeData({
      ...editedNodeData,
      multimediaContent: {
        ...editedNodeData.multimediaContent || {},
        dynamicSource: value
      }
    });
  };

  const updateMediaContent = (field: string, value: string) => {
    if (!editedNodeData) return;
    
    setEditedNodeData({
      ...editedNodeData,
      multimediaContent: {
        ...editedNodeData.multimediaContent || {},
        [field]: value
      }
    });
  };

  switch (selectedNode.type) {
    case 'message':
      return (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="content">{t('workflows.content')}</TabsTrigger>
            <TabsTrigger value="settings">{t('workflows.settings')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="content" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="node-label">{t('workflows.nodeTitle')}</Label>
              <Input 
                id="node-label" 
                value={editedNodeData.label || ''} 
                onChange={(e) => setEditedNodeData({...editedNodeData, label: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message-content">{t('workflows.messageContent')}</Label>
              <Textarea 
                id="message-content" 
                value={editedNodeData.content || ''} 
                onChange={(e) => setEditedNodeData({...editedNodeData, content: e.target.value})}
                rows={5}
                className="resize-none"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4">
            <div className="space-y-2">
              <Label>{t('workflows.messageSettings')}</Label>
              <p className="text-sm text-muted-foreground">
                {t('workflows.messageSettingsDescription')}
              </p>
            </div>
          </TabsContent>
        </Tabs>
      );
      
    case 'aiPrompt':
      return (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="prompt">{t('workflows.prompt')}</TabsTrigger>
            <TabsTrigger value="settings">{t('workflows.settings')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="prompt" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="node-label">{t('workflows.nodeTitle')}</Label>
              <Input 
                id="node-label" 
                value={editedNodeData.label || ''} 
                onChange={(e) => setEditedNodeData({...editedNodeData, label: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ai-prompt">{t('workflows.aiPromptTemplate')}</Label>
              <Textarea 
                id="ai-prompt" 
                value={editedNodeData.prompt || ''} 
                onChange={(e) => setEditedNodeData({...editedNodeData, prompt: e.target.value})}
                rows={5}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground">
                {t('workflows.aiPromptDescription')}
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4">
            <div className="space-y-2">
              <Label>{t('workflows.aiModelSettings')}</Label>
              <p className="text-sm text-muted-foreground">
                {t('workflows.aiModelSettingsDescription')}
              </p>
            </div>
          </TabsContent>
        </Tabs>
      );
      
    case 'condition':
      return (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="condition">{t('workflows.condition')}</TabsTrigger>
            <TabsTrigger value="settings">{t('workflows.settings')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="condition" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="node-label">{t('workflows.nodeTitle')}</Label>
              <Input 
                id="node-label" 
                value={editedNodeData.label || ''} 
                onChange={(e) => setEditedNodeData({...editedNodeData, label: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="condition-expression">{t('workflows.conditionExpression')}</Label>
              <Textarea 
                id="condition-expression" 
                value={editedNodeData.condition || ''} 
                onChange={(e) => setEditedNodeData({...editedNodeData, condition: e.target.value})}
                rows={3}
                className="resize-none font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                {t('workflows.conditionExpressionDescription')}
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4">
            <div className="space-y-2">
              <Label>{t('workflows.conditionBranches')}</Label>
              <p className="text-sm text-muted-foreground">
                {t('workflows.conditionBranchesDescription')}
              </p>
            </div>
          </TabsContent>
        </Tabs>
      );
      
    case 'action':
      return (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="action">{t('workflows.action')}</TabsTrigger>
            <TabsTrigger value="settings">{t('workflows.settings')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="action" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="node-label">{t('workflows.nodeTitle')}</Label>
              <Input 
                id="node-label" 
                value={editedNodeData.label || ''} 
                onChange={(e) => setEditedNodeData({...editedNodeData, label: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="action-definition">{t('workflows.actionDefinition')}</Label>
              <Textarea 
                id="action-definition" 
                value={editedNodeData.action || ''} 
                onChange={(e) => setEditedNodeData({...editedNodeData, action: e.target.value})}
                rows={5}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground">
                {t('workflows.actionDefinitionDescription')}
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4">
            <div className="space-y-2">
              <Label>{t('workflows.actionSettings')}</Label>
              <p className="text-sm text-muted-foreground">
                {t('workflows.actionSettingsDescription')}
              </p>
            </div>
          </TabsContent>
        </Tabs>
      );
      
    case 'menu':
      return (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="menuItems">{t('workflows.menuItems')}</TabsTrigger>
            <TabsTrigger value="settings">{t('workflows.settings')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="menuItems" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="node-label">{t('workflows.nodeTitle')}</Label>
              <Input 
                id="node-label" 
                value={editedNodeData.label || ''} 
                onChange={(e) => setEditedNodeData({...editedNodeData, label: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>{t('workflows.menuItems')}</Label>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={addMenuItem}
                  className="flex items-center gap-1"
                >
                  <Plus className="h-3 w-3" /> {t('workflows.addMenuItem')}
                </Button>
              </div>
              <div className="space-y-2 p-2 border rounded">
                {editedNodeData.menuItems?.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <Input 
                      value={item} 
                      onChange={(e) => updateMenuItem(index, e.target.value)}
                    />
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => removeMenuItem(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {(!editedNodeData.menuItems || editedNodeData.menuItems.length === 0) && (
                  <p className="text-sm text-muted-foreground py-2">
                    No menu items. Add one with the button above.
                  </p>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {t('workflows.menuItemsDescription')}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                {t('workflows.menuItemsConnectionsDescription')}
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4">
            <div className="space-y-2">
              <Label>{t('workflows.actionSettings')}</Label>
              <p className="text-sm text-muted-foreground">
                {t('workflows.actionSettingsDescription')}
              </p>
            </div>
          </TabsContent>
        </Tabs>
      );
      
    case 'multimedia':
      return (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="multimediaContent">{t('workflows.content')}</TabsTrigger>
            <TabsTrigger value="settings">{t('workflows.settings')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="multimediaContent" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="node-label">{t('workflows.nodeTitle')}</Label>
              <Input 
                id="node-label" 
                value={editedNodeData.label || ''} 
                onChange={(e) => setEditedNodeData({...editedNodeData, label: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="multimedia-type">{t('workflows.multimediaType')}</Label>
              <Select
                value={editedNodeData.multimediaType || "productCard"}
                onValueChange={handleMultimediaTypeChange}
              >
                <SelectTrigger id="multimedia-type">
                  <SelectValue placeholder={t('workflows.multimediaType')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="productCard">{t('workflows.productCard')}</SelectItem>
                  <SelectItem value="video">{t('workflows.video')}</SelectItem>
                  <SelectItem value="pdf">{t('workflows.pdf')}</SelectItem>
                  <SelectItem value="imageGallery">{t('workflows.imageGallery')}</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                {t('workflows.multimediaTypeDescription')}
              </p>
            </div>
            
            {/* Media Title & Description (common for all types) */}
            <div className="space-y-2">
              <Label htmlFor="media-title">{t('workflows.mediaTitle')}</Label>
              <Input 
                id="media-title" 
                value={editedNodeData.multimediaContent?.title || ''} 
                onChange={(e) => updateMediaContent('title', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="media-description">{t('workflows.mediaDescription')}</Label>
              <Textarea 
                id="media-description" 
                value={editedNodeData.multimediaContent?.description || ''} 
                onChange={(e) => updateMediaContent('description', e.target.value)}
                rows={2}
                className="resize-none"
              />
            </div>
            
            {/* Content specific to multimedia type */}
            {editedNodeData.multimediaType === "productCard" && (
              <div className="space-y-2 border p-3 rounded">
                <div className="flex items-center justify-between">
                  <Label>{t('workflows.productSource')}</Label>
                  <Select
                    value={editedNodeData.multimediaContent?.dynamicSource ? "dynamic" : "static"}
                    onValueChange={(value) => {
                      if (value === "dynamic") {
                        updateDynamicSource("products");
                      } else {
                        // Clear dynamic source if static is selected
                        updateDynamicSource("");
                      }
                    }}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="static">{t('workflows.staticProducts')}</SelectItem>
                      <SelectItem value="dynamic">{t('workflows.dynamicProducts')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Dynamic source config */}
                {editedNodeData.multimediaContent?.dynamicSource && (
                  <div className="mt-2">
                    <Label>{t('workflows.productSource')}</Label>
                    <Input 
                      value={editedNodeData.multimediaContent.dynamicSource} 
                      onChange={(e) => updateDynamicSource(e.target.value)}
                      placeholder="products"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Variable name that contains product data
                    </p>
                  </div>
                )}
                
                {/* Static products */}
                {!editedNodeData.multimediaContent?.dynamicSource && (
                  <>
                    <div className="flex items-center justify-between mt-4">
                      <Label>{t('workflows.productCard')}</Label>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={addProduct}
                        className="flex items-center gap-1"
                      >
                        <Plus className="h-3 w-3" /> {t('workflows.addProduct')}
                      </Button>
                    </div>
                    
                    {/* Product list */}
                    <div className="space-y-4 mt-2">
                      {editedNodeData.multimediaContent?.products?.map((product, index) => (
                        <div key={index} className="border p-2 rounded space-y-2">
                          <div className="flex justify-between">
                            <span className="font-medium">Product {index + 1}</span>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              onClick={() => removeProduct(index)}
                              className="h-6 w-6 p-0"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="space-y-2">
                            <div>
                              <Label htmlFor={`product-name-${index}`}>{t('workflows.productName')}</Label>
                              <Input 
                                id={`product-name-${index}`}
                                value={product.name} 
                                onChange={(e) => updateProduct(index, 'name', e.target.value)}
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor={`product-desc-${index}`}>{t('workflows.productDescription')}</Label>
                              <Textarea 
                                id={`product-desc-${index}`}
                                value={product.description} 
                                onChange={(e) => updateProduct(index, 'description', e.target.value)}
                                rows={2}
                                className="resize-none"
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor={`product-price-${index}`}>{t('workflows.productPrice')}</Label>
                              <Input 
                                id={`product-price-${index}`}
                                value={product.price} 
                                onChange={(e) => updateProduct(index, 'price', parseFloat(e.target.value) || 0)}
                                type="number"
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor={`product-image-${index}`}>{t('workflows.productImage')}</Label>
                              <Input 
                                id={`product-image-${index}`}
                                value={product.imageUrl} 
                                onChange={(e) => updateProduct(index, 'imageUrl', e.target.value)}
                                placeholder="https://..."
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor={`payment-link-${index}`}>{t('workflows.paymentLink')}</Label>
                              <Input 
                                id={`payment-link-${index}`}
                                value={product.paymentLink || ''} 
                                onChange={(e) => updateProduct(index, 'paymentLink', e.target.value)}
                                placeholder="https://..."
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor={`info-link-${index}`}>{t('workflows.infoLink')}</Label>
                              <Input 
                                id={`info-link-${index}`}
                                value={product.infoLink || ''} 
                                onChange={(e) => updateProduct(index, 'infoLink', e.target.value)}
                                placeholder="https://..."
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {(!editedNodeData.multimediaContent?.products || editedNodeData.multimediaContent.products.length === 0) && (
                        <p className="text-sm text-muted-foreground py-2">
                          No products added. Click 'Add Product' to create product cards.
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
            
            {/* Video Content */}
            {editedNodeData.multimediaType === "video" && (
              <div className="space-y-2">
                <Label htmlFor="media-url">{t('workflows.mediaUrl')}</Label>
                <Input 
                  id="media-url" 
                  value={editedNodeData.multimediaContent?.mediaUrl || ''} 
                  onChange={(e) => updateMediaContent('mediaUrl', e.target.value)}
                  placeholder="https://..."
                />
                <p className="text-xs text-muted-foreground">
                  URL of the video to display
                </p>
              </div>
            )}
            
            {/* PDF Content */}
            {editedNodeData.multimediaType === "pdf" && (
              <div className="space-y-2">
                <Label htmlFor="media-url">{t('workflows.mediaUrl')}</Label>
                <Input 
                  id="media-url" 
                  value={editedNodeData.multimediaContent?.mediaUrl || ''} 
                  onChange={(e) => updateMediaContent('mediaUrl', e.target.value)}
                  placeholder="https://..."
                />
                <p className="text-xs text-muted-foreground">
                  URL of the PDF document to display
                </p>
              </div>
            )}
            
            {/* Image Gallery Content */}
            {editedNodeData.multimediaType === "imageGallery" && (
              <div className="space-y-2 border p-3 rounded">
                <div className="flex items-center justify-between">
                  <Label>{t('workflows.addLink')}</Label>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={addLink}
                    className="flex items-center gap-1"
                  >
                    <Plus className="h-3 w-3" /> {t('workflows.addLink')}
                  </Button>
                </div>
                
                <div className="space-y-2 mt-2">
                  {editedNodeData.multimediaContent?.links?.map((link, index) => (
                    <div key={index} className="flex gap-2">
                      <Input 
                        value={link.label} 
                        onChange={(e) => updateLink(index, 'label', e.target.value)}
                        placeholder="Label"
                        className="w-1/3"
                      />
                      <Input 
                        value={link.url} 
                        onChange={(e) => updateLink(index, 'url', e.target.value)}
                        placeholder="https://..."
                        className="flex-1"
                      />
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => removeLink(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  
                  {(!editedNodeData.multimediaContent?.links || editedNodeData.multimediaContent.links.length === 0) && (
                    <p className="text-sm text-muted-foreground py-2">
                      No links added. Add links to images for the gallery.
                    </p>
                  )}
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4">
            <div className="space-y-2">
              <Label>{t('workflows.multimediaSettings')}</Label>
              <p className="text-sm text-muted-foreground">
                {t('workflows.multimediaDescription')}
              </p>
            </div>
          </TabsContent>
        </Tabs>
      );
      
    default:
      return null;
  }
};

export default NodeEditForm;
