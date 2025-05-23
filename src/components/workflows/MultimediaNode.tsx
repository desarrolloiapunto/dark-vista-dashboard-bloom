
import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Image, Video, FileText, Link, Database, FileJson, Copy } from 'lucide-react';

// Define the different multimedia types
export type MultimediaType = "productCard" | "video" | "pdf" | "imageGallery";

// Define product source types
export type ProductSourceType = "crmProducts" | "jsonFile" | "pdfFile" | "aiGenerated";

// Define the product structure
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  paymentLink?: string;
  infoLink?: string;
}

interface MultimediaNodeData {
  label: string;
  multimediaType: MultimediaType;
  content?: {
    title?: string;
    description?: string;
    mediaUrl?: string;
    products?: Product[];
    productSource?: ProductSourceType;
    dynamicSource?: string; // For database-driven content
    sourceUrl?: string; // URL to JSON or PDF file
    links?: {
      label: string;
      url: string;
    }[];
  };
}

const MultimediaNode = ({ data }: { data: MultimediaNodeData }) => {
  // Helper to render the appropriate icon based on multimedia type
  const renderIcon = () => {
    switch (data.multimediaType) {
      case "productCard":
        return <Link className="h-4 w-4" />;
      case "video":
        return <Video className="h-4 w-4" />;
      case "pdf":
        return <FileText className="h-4 w-4" />;
      case "imageGallery":
      default:
        return <Image className="h-4 w-4" />;
    }
  };

  // Helper to render product source icon
  const renderProductSourceIcon = () => {
    if (data.multimediaType !== "productCard" || !data.content?.productSource) return null;

    switch (data.content.productSource) {
      case "crmProducts":
        return <Database className="h-4 w-4 text-blue-500" />;
      case "jsonFile":
        return <FileJson className="h-4 w-4 text-green-500" />;
      case "pdfFile":
        return <FileText className="h-4 w-4 text-red-500" />;
      case "aiGenerated":
        return <Copy className="h-4 w-4 text-purple-500" />;
      default:
        return null;
    }
  };

  // Helper to render preview content based on media type
  const renderPreview = () => {
    switch (data.multimediaType) {
      case "productCard":
        return (
          <div className="text-sm">
            {data.content?.products && data.content.products.length > 0 ? (
              <div className="flex flex-col gap-2">
                <strong>{data.content.title || 'Producto'}</strong>
                <div className="flex items-center gap-1 text-xs">
                  {renderProductSourceIcon()}
                  <span className="italic">
                    {data.content.products.length} producto(s) para mostrar
                    {data.content.productSource && data.content.productSource !== "crmProducts" && (
                      <> • Fuente: {renderSourceLabel(data.content.productSource)}</>
                    )}
                  </span>
                </div>
              </div>
            ) : (
              data.content?.dynamicSource ? 
                <span>Fuente dinámica: {data.content.dynamicSource}</span> : 
                'Configure las tarjetas de producto'
            )}
          </div>
        );
      case "video":
        return (
          <div className="text-sm">
            {data.content?.mediaUrl ? (
              <div className="flex flex-col gap-1">
                <strong>{data.content.title || 'Video'}</strong>
                <span className="text-xs truncate">{data.content.mediaUrl}</span>
              </div>
            ) : (
              'Configure el contenido de video'
            )}
          </div>
        );
      case "pdf":
        return (
          <div className="text-sm">
            {data.content?.mediaUrl ? (
              <div className="flex flex-col gap-1">
                <strong>{data.content.title || 'Catálogo PDF'}</strong>
                <span className="text-xs truncate">{data.content.mediaUrl}</span>
              </div>
            ) : (
              'Configure el PDF'
            )}
          </div>
        );
      case "imageGallery":
        return (
          <div className="text-sm">
            {data.content?.title || 'Galería de imágenes'}
          </div>
        );
      default:
        return (
          <div className="text-sm">
            Configure el contenido multimedia
          </div>
        );
    }
  };

  // Helper to render source label
  const renderSourceLabel = (source: ProductSourceType): string => {
    switch (source) {
      case "crmProducts": return "Productos CRM";
      case "jsonFile": return "Archivo JSON";
      case "pdfFile": return "Archivo PDF";
      case "aiGenerated": return "Generado por IA";
      default: return "Desconocido";
    }
  };

  return (
    <div className="bg-white px-4 py-2 rounded-md shadow-md border border-cyan-200 w-64">
      <div className="flex items-center gap-2 font-medium text-cyan-600 mb-1">
        {renderIcon()}
        {data.label}
      </div>
      <div className="text-sm text-gray-600 p-2 bg-cyan-50 rounded">
        {renderPreview()}
      </div>
      
      <Handle type="target" position={Position.Top} className="bg-cyan-500" />
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="bg-cyan-500" 
        id="default"
      />
      
      {/* Additional handles for interactive content like product cards */}
      {data.multimediaType === "productCard" && (
        <Handle 
          type="source" 
          position={Position.Right} 
          className="bg-cyan-500" 
          id="selection" 
          style={{ top: '50%' }}
        />
      )}
    </div>
  );
};

export default memo(MultimediaNode);
