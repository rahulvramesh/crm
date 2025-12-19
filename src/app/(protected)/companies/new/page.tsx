import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createCompany } from "@/lib/actions";
import { Building2, ArrowLeft } from "lucide-react";

export default function NewCompanyPage() {
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

      <div className="max-w-2xl">
        <Card className="bg-card border-border">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">Add New Company</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Add a new organization to your network
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form action={createCompany} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Company Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Acme Inc."
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
                  placeholder="https://example.com"
                  className="h-11 bg-secondary border-border"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  Create Company
                </Button>
                <Button variant="outline" asChild className="border-border">
                  <Link href="/companies">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
