
import { Facebook, Instagram, MessageCircle, Send, MessageSquare } from "lucide-react";
import { Channel } from "@/types/conversations";

export const getChannelIcon = (channel: Channel, props = {}) => {
  switch (channel) {
    case "whatsapp":
      return <MessageCircle {...props} />;
    case "facebook":
      return <Facebook {...props} />;
    case "instagram":
      return <Instagram {...props} />;
    case "telegram":
      return <Send {...props} />;
    default:
      return <MessageSquare {...props} />;
  }
};

export const getChannelColor = (channel: Channel) => {
  switch (channel) {
    case "whatsapp":
      return "green-500";
    case "facebook":
      return "blue-500";
    case "instagram":
      return "pink-500";
    case "telegram":
      return "sky-500";
    default:
      return "foreground";
  }
};
