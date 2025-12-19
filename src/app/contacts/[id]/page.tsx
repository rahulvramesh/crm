import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateContact } from "@/lib/actions";
import { ArrowLeft, Building2, Mail, Phone } from "lucide-react";

export default async function ContactDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [contact, companies] = await Promise.all([
    prisma.contact.findUnique({
      where: { id },
      include: { company: true },
    }),
    prisma.company.findMany({
      orderBy: { name: "asc" },
    }),
  ]);

  if (!contact) {
    notFound();
  }

  const updateContactWithId = updateContact.bind(null, id);

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        href="/contacts"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Contacts
      </Link>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Edit Form */}
        <div className="lg:col-span-2">
          <Card className="bg-card border-border">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                  {contact.firstName[0]}
                  {contact.lastName[0]}
                </div>
                <div>
                  <CardTitle className="text-xl">Edit Contact</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Update contact information
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form action={updateContactWithId} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium">
                      First Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      defaultValue={contact.firstName}
                      required
                      className="h-11 bg-secondary border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium">
                      Last Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      defaultValue={contact.lastName}
                      required
                      className="h-11 bg-secondary border-border"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={contact.email || ""}
                    placeholder="john@example.com"
                    className="h-11 bg-secondary border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    defaultValue={contact.phone || ""}
                    placeholder="+1 (555) 123-4567"
                    className="h-11 bg-secondary border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyId" className="text-sm font-medium">
                    Company
                  </Label>
                  <Select
                    name="companyId"
                    defaultValue={contact.companyId || undefined}
                  >
                    <SelectTrigger className="h-11 bg-secondary border-border">
                      <SelectValue placeholder="Select a company (optional)" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      {companies.map((company) => (
                        <SelectItem key={company.id} value={company.id}>
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="bg-primary hover:bg-primary/90">
                    Update Contact
                  </Button>
                  <Button variant="outline" asChild className="border-border">
                    <Link href="/contacts">Cancel</Link>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Contact Info Sidebar */}
        <div>
          <Card className="bg-card border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Quick Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-medium truncate">
                      {contact.email}
                    </p>
                  </div>
                </a>
              )}
              {contact.phone && (
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="text-sm font-medium">{contact.phone}</p>
                  </div>
                </a>
              )}
              {contact.company && (
                <Link
                  href={`/companies/${contact.company.id}`}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">Company</p>
                    <p className="text-sm font-medium truncate">
                      {contact.company.name}
                    </p>
                  </div>
                </Link>
              )}
              {!contact.email && !contact.phone && !contact.company && (
                <div className="text-center py-4">
                  <p className="text-sm text-muted-foreground">
                    No additional info
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
