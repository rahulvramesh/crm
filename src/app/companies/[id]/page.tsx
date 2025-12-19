import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateCompany } from "@/lib/actions";
import { ArrowLeft, Users, ArrowUpRight } from "lucide-react";

export default async function CompanyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const company = await prisma.company.findUnique({
    where: { id },
    include: { contacts: true },
  });

  if (!company) {
    notFound();
  }

  const updateCompanyWithId = updateCompany.bind(null, id);

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        href="/companies"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Companies
      </Link>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Edit Form */}
        <div className="lg:col-span-2">
          <Card className="bg-card border-border">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl">
                  {company.name[0]}
                </div>
                <div>
                  <CardTitle className="text-xl">Edit Company</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Update company information
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form action={updateCompanyWithId} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Company Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={company.name}
                    required
                    className="h-11 bg-secondary border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry" className="text-sm font-medium">
                    Industry
                  </Label>
                  <Input
                    id="industry"
                    name="industry"
                    defaultValue={company.industry || ""}
                    placeholder="Technology, Healthcare, Finance..."
                    className="h-11 bg-secondary border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website" className="text-sm font-medium">
                    Website
                  </Label>
                  <Input
                    id="website"
                    name="website"
                    type="url"
                    defaultValue={company.website || ""}
                    placeholder="https://example.com"
                    className="h-11 bg-secondary border-border"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="bg-primary hover:bg-primary/90">
                    Update Company
                  </Button>
                  <Button variant="outline" asChild className="border-border">
                    <Link href="/companies">Cancel</Link>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Contacts Sidebar */}
        <div>
          <Card className="bg-card border-border">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="w-5 h-5 text-muted-foreground" />
                  Contacts
                </CardTitle>
                <span className="text-sm text-muted-foreground">
                  {company.contacts.length}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              {company.contacts.length === 0 ? (
                <div className="text-center py-6">
                  <Users className="w-10 h-10 text-muted-foreground/30 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    No contacts yet
                  </p>
                  <Link
                    href="/contacts/new"
                    className="text-sm text-primary hover:underline mt-2 inline-block"
                  >
                    Add a contact
                  </Link>
                </div>
              ) : (
                <ul className="space-y-2">
                  {company.contacts.map((contact) => (
                    <li key={contact.id}>
                      <Link
                        href={`/contacts/${contact.id}`}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-xs font-medium">
                          {contact.firstName[0]}
                          {contact.lastName[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                            {contact.firstName} {contact.lastName}
                          </p>
                          {contact.email && (
                            <p className="text-xs text-muted-foreground truncate">
                              {contact.email}
                            </p>
                          )}
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
