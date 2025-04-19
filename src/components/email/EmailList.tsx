
import { Table, TableBody } from "@/components/ui/table";
import { EmailListHeader } from "./EmailListHeader";
import { EmailRow } from "./EmailRow";
import { filterEmails } from "@/utils/emailUtils";
import { mockEmails } from "@/data/emails";
import type { EmailView } from "@/types/email";

interface EmailListProps {
  view: EmailView;
}

export function EmailList({ view }: EmailListProps) {
  const filteredEmails = filterEmails(mockEmails, view);

  return (
    <Table>
      <EmailListHeader />
      <TableBody>
        {filteredEmails.map((email) => (
          <EmailRow key={email.id} email={email} />
        ))}
      </TableBody>
    </Table>
  );
}
