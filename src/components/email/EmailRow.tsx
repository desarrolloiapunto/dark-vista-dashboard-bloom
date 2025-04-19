
import { Star, StarOff, Paperclip } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Email } from "@/types/email";
import { mockLabels } from "@/data/labels";
import { formatEmailDate } from "@/utils/emailUtils";

interface EmailRowProps {
  email: Email;
}

export function EmailRow({ email }: EmailRowProps) {
  return (
    <TableRow className={`cursor-pointer hover:bg-muted/50 ${!email.isRead ? 'font-medium' : ''}`}>
      <TableCell className="flex gap-2">
        {email.isStarred ? (
          <Star className="h-4 w-4 text-yellow-400" />
        ) : (
          <StarOff className="h-4 w-4 text-muted-foreground" />
        )}
        {email.attachments && (
          <Paperclip className="h-4 w-4 text-muted-foreground" />
        )}
      </TableCell>
      <TableCell>{email.from}</TableCell>
      <TableCell>
        <div className="font-medium">{email.subject}</div>
        <div className="text-sm text-muted-foreground">{email.preview}</div>
      </TableCell>
      <TableCell>
        <div className="flex gap-1 flex-wrap">
          {email.labels.map((labelId) => {
            const label = mockLabels.find((l) => l.id === labelId);
            return label ? (
              <Badge 
                key={label.id} 
                variant="secondary"
                className={`bg-${label.color}-100 text-${label.color}-800 hover:bg-${label.color}-200`}
              >
                {label.name}
              </Badge>
            ) : null;
          })}
        </div>
      </TableCell>
      <TableCell className="text-right">
        {formatEmailDate(email.date)}
      </TableCell>
    </TableRow>
  );
}
