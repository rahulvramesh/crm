import Link from "next/link";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { deleteContact } from "@/lib/actions";
import {
  Users,
  Plus,
  Search,
  MoreHorizontal,
  Filter,
} from "lucide-react";

export default async function ContactsPage() {
  const contacts = await prisma.contact.findMany({
    orderBy: { createdAt: "desc" },
    include: { company: true },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-bold">Contacts</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search contacts..."
              className="w-64 pl-10 bg-card border-border h-10"
            />
          </div>
        </div>
        <Button asChild className="bg-primary hover:bg-primary/90 gap-2">
          <Link href="/contacts/new">
            <Plus className="w-4 h-4" />
            Add Contact
          </Link>
        </Button>
      </div>

      {/* Contacts Table */}
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            All Contacts
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="border-border text-muted-foreground gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              See All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {contacts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No contacts yet</h3>
              <p className="text-muted-foreground text-center max-w-sm mx-auto mb-6">
                Start building your network by adding your first contact.
              </p>
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link href="/contacts/new">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Contact
                </Link>
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-muted-foreground border-b border-border">
                    <th className="pb-3 font-medium">Contact</th>
                    <th className="pb-3 font-medium">Company</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Type</th>
                    <th className="pb-3 font-medium">Email</th>
                    <th className="pb-3 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <tr key={contact.id} className="border-b border-border last:border-0 group">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
                            {contact.firstName[0]}
                            {contact.lastName[0]}
                          </div>
                          <div>
                            <Link
                              href={`/contacts/${contact.id}`}
                              className="font-medium hover:text-primary transition-colors"
                            >
                              {contact.firstName} {contact.lastName}
                            </Link>
                            <p className="text-xs text-muted-foreground">
                              {contact.phone || "No phone"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-muted-foreground">
                        {contact.company ? (
                          <Link
                            href={`/companies/${contact.company.id}`}
                            className="hover:text-primary transition-colors"
                          >
                            {contact.company.name}
                          </Link>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="py-4">
                        <span className="badge-success">Active</span>
                      </td>
                      <td className="py-4 text-muted-foreground">
                        Full-Time
                      </td>
                      <td className="py-4 text-muted-foreground">
                        {contact.email || "—"}
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-1">
                          <form
                            action={async () => {
                              "use server";
                              await deleteContact(contact.id);
                            }}
                          >
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-opacity"
                              type="submit"
                            >
                              Delete
                            </Button>
                          </form>
                          <Button variant="ghost" size="icon" className="text-muted-foreground">
                            <MoreHorizontal className="w-5 h-5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
