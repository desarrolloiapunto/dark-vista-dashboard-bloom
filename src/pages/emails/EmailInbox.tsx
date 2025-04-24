
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { 
  Search,
  Plus,
  Filter,
  ArrowUpDown,
  MoreHorizontal,
  Trash2,
  Star,
  StarOff,
  Mail,
  MailOpen,
  Tag,
  AlertTriangle
} from "lucide-react";
import { mockEmails } from "@/data/emails";
import { mockLabels } from "@/data/labels";
import { formatEmailDate } from "@/utils/emailUtils";
import type { Email, EmailView } from "@/types/email";
import { useTranslation } from "react-i18next";

interface EmailInboxProps {
  view: EmailView;
}

export function EmailInbox({ view }: EmailInboxProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [labelFilter, setLabelFilter] = useState<string>("all");

  // Filter emails based on view, search term and label filter
  const filteredEmails = useMemo(() => {
    let filtered = [...mockEmails];

    // First apply view filter
    if (view === "inbox") {
      filtered = filtered.filter(email => email.folder === "inbox");
    } else if (view === "sent") {
      filtered = filtered.filter(email => email.folder === "sent");
    } else if (view === "drafts") {
      filtered = filtered.filter(email => email.folder === "drafts");
    } else if (view === "spam") {
      filtered = filtered.filter(email => email.folder === "spam");
    } else if (view === "trash") {
      filtered = filtered.filter(email => email.folder === "trash");
    } else if (view === "starred") {
      filtered = filtered.filter(email => email.isStarred);
    } else if (view === "labels") {
      filtered = filtered.filter(email => email.labels && email.labels.length > 0);
    }

    // Then apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        email =>
          email.subject.toLowerCase().includes(term) ||
          email.from.toLowerCase().includes(term) ||
          email.preview.toLowerCase().includes(term)
      );
    }

    // Then apply label filter
    if (labelFilter !== "all") {
      filtered = filtered.filter(email => 
        email.labels.includes(labelFilter)
      );
    }

    // Sort by date
    return filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });
  }, [view, searchTerm, sortOrder, labelFilter]);

  const handleRowClick = (email: Email) => {
    navigate(`/emails/view/${email.id}`);
  };

  const toggleSelectEmail = (e: React.MouseEvent, emailId: string) => {
    e.stopPropagation();
    setSelectedEmails(prev =>
      prev.includes(emailId)
        ? prev.filter(id => id !== emailId)
        : [...prev, emailId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedEmails.length === filteredEmails.length) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails(filteredEmails.map(email => email.id));
    }
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => (prev === "asc" ? "desc" : "asc"));
  };

  const handleToggleStar = (e: React.MouseEvent, email: Email) => {
    e.stopPropagation();
    // In a real app, we would update the server here
    toast({
      title: email.isStarred ? "Removed from starred" : "Added to starred",
      description: `"${email.subject}" ${email.isStarred ? "removed from" : "added to"} starred emails.`
    });
  };

  const handleDeleteSelected = () => {
    if (selectedEmails.length === 0) return;
    
    // In a real app, we would update the server here
    toast({
      title: "Emails deleted",
      description: `${selectedEmails.length} email(s) moved to trash.`
    });
    
    setSelectedEmails([]);
  };

  const handleEmptySpam = () => {
    if (view !== "spam") return;
    
    // In a real app, we would update the server here
    toast({
      title: "Spam folder emptied",
      description: "All emails in the spam folder have been permanently deleted."
    });
  };

  const handleEmptyTrash = () => {
    if (view !== "trash") return;
    
    // In a real app, we would update the server here
    toast({
      title: "Trash emptied",
      description: "All emails in the trash have been permanently deleted."
    });
  };

  // Get view title
  const getViewTitle = () => {
    switch (view) {
      case "inbox": return t('sidebar.conversations.inbox');
      case "sent": return "Enviados";
      case "drafts": return "Borradores";
      case "spam": return "Spam";
      case "trash": return "Papelera";
      case "starred": return "Destacados";
      case "labels": return "Etiquetas";
      default: return "";
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{getViewTitle()}</h2>
        
        <div className="flex items-center space-x-2">
          {(view === "spam") && (
            <Button variant="outline" onClick={handleEmptySpam} className="text-red-500">
              Vaciar Spam
            </Button>
          )}
          
          {(view === "trash") && (
            <Button variant="outline" onClick={handleEmptyTrash} className="text-red-500">
              Vaciar Papelera
            </Button>
          )}
          
          <Button onClick={() => navigate("/emails/compose")} size="sm">
            <Plus className="h-4 w-4 mr-2" /> Nuevo Correo
          </Button>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-2 top-3 text-muted-foreground" />
            <Input
              placeholder="Buscar correos..."
              className="pl-8 w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" /> Filtrar
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setLabelFilter("all")}>
                Todas las etiquetas
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLabelFilter("")}>
                Sin etiqueta
              </DropdownMenuItem>
              {mockLabels.map(label => (
                <DropdownMenuItem 
                  key={label.id}
                  onClick={() => setLabelFilter(label.id)}
                >
                  <div className={`h-2 w-2 rounded-full bg-${label.color}-500 mr-2`} />
                  {label.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as "asc" | "desc")}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Ordenar por fecha" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">Más recientes primero</SelectItem>
              <SelectItem value="asc">Más antiguos primero</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {selectedEmails.length > 0 && (
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleDeleteSelected}>
              <Trash2 className="h-4 w-4 mr-2" /> Eliminar
            </Button>
          </div>
        )}
      </div>
      
      <div className="flex-1 overflow-auto border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[30px]">
                <Checkbox 
                  checked={selectedEmails.length === filteredEmails.length && filteredEmails.length > 0} 
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead className="w-[30px]"></TableHead>
              <TableHead className="w-[200px]">Remitente</TableHead>
              <TableHead>Asunto</TableHead>
              <TableHead>Etiquetas</TableHead>
              <TableHead className="text-right w-[120px]">
                <Button variant="ghost" size="sm" onClick={toggleSortOrder} className="ml-auto">
                  <span>Fecha</span>
                  <ArrowUpDown className="h-4 w-4 ml-2" />
                </Button>
              </TableHead>
              <TableHead className="w-[40px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmails.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No hay correos en esta carpeta
                </TableCell>
              </TableRow>
            ) : (
              filteredEmails.map((email) => (
                <TableRow 
                  key={email.id} 
                  onClick={() => handleRowClick(email)} 
                  className={`cursor-pointer hover:bg-muted/50 ${!email.isRead ? 'font-medium' : ''}`}
                >
                  <TableCell className="px-2">
                    <Checkbox 
                      checked={selectedEmails.includes(email.id)} 
                      onCheckedChange={(checked) => {
                        // Here's the fix: Create a synthetic event
                        const syntheticEvent = {
                          stopPropagation: () => {}
                        } as React.MouseEvent;
                        toggleSelectEmail(syntheticEvent, email.id);
                      }}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </TableCell>
                  <TableCell className="px-2">
                    {email.isRead ? (
                      <MailOpen className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Mail className="h-4 w-4" />
                    )}
                  </TableCell>
                  <TableCell>{email.from.split('<')[0].trim()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {email.folder === "spam" && (
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      )}
                      <div>
                        <div className="font-medium">{email.subject}</div>
                        <div className="text-sm text-muted-foreground line-clamp-1">{email.preview}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      {email.labels.map((labelId) => {
                        const label = mockLabels.find((l) => l.id === labelId);
                        return label ? (
                          <Badge 
                            key={label.id} 
                            variant="outline"
                            className={`text-${label.color}-500 border-${label.color}-200`}
                          >
                            {label.name}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-sm text-muted-foreground">
                    {formatEmailDate(email.date)}
                  </TableCell>
                  <TableCell className="p-0">
                    <div className="flex">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={(e) => handleToggleStar(e, email)} 
                        className="h-8 w-8"
                      >
                        {email.isStarred ? (
                          <Star className="h-4 w-4 text-yellow-400" />
                        ) : (
                          <StarOff className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/emails/reply/${email.id}`);
                          }}>
                            Responder
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/emails/forward/${email.id}`);
                          }}>
                            Reenviar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => {
                            e.stopPropagation();
                            // Mark as read/unread logic
                            toast({
                              title: email.isRead ? "Marcado como no leído" : "Marcado como leído",
                              description: `"${email.subject}" ha sido marcado como ${email.isRead ? "no leído" : "leído"}.`
                            });
                          }}>
                            {email.isRead ? "Marcar como no leído" : "Marcar como leído"}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => {
                            e.stopPropagation();
                            // Add label logic - in a real app would show a label selector
                            toast({
                              title: "Gestionar etiquetas",
                              description: "Función de gestión de etiquetas."
                            });
                          }}>
                            <Tag className="h-4 w-4 mr-2" />
                            Gestionar etiquetas
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-red-500 focus:text-red-500"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Delete logic
                              toast({
                                title: "Correo eliminado",
                                description: `"${email.subject}" ha sido movido a la papelera.`
                              });
                            }}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
