
// Import node types
import MessageNode from '../MessageNode';
import AIPromptNode from '../AIPromptNode';
import ConditionNode from '../ConditionNode';
import ActionNode from '../ActionNode';
import MenuNode from '../MenuNode';
import MultimediaNode from '../MultimediaNode';

// Define the node types mapping
export const nodeTypes = {
  message: MessageNode,
  aiPrompt: AIPromptNode,
  condition: ConditionNode,
  action: ActionNode,
  menu: MenuNode,
  multimedia: MultimediaNode,
};

// Define the edge types
import ButtonEdge from '../ButtonEdge';

export const edgeTypes = {
  buttonedge: ButtonEdge,
};

// Node data interface
export interface NodeData {
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
