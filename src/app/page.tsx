import Link from "next/link";
import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Users,
  TrendingUp,
  TrendingDown,
  ChevronRight,
  MoreHorizontal,
  UserCheck,
  Search,
  Bell,
  Mail,
  FileDown,
} from "lucide-react";
import { Input } from "@/components/ui/input";

export default async function DashboardPage() {
  const [companyCount, contactCount, recentContacts, recentCompanies] =
    await Promise.all([
      prisma.company.count(),
      prisma.contact.count(),
      prisma.contact.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { company: true },
      }),
      prisma.company.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
      }),
    ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search ..."
              className="w-64 pl-10 bg-card border-border h-10"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button className="bg-primary hover:bg-primary/90 gap-2">
            <FileDown className="w-4 h-4" />
            Export Report
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Bell className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Mail className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3 ml-2 pl-4 border-l border-border">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-sm font-medium">
              AL
            </div>
            <div>
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-muted-foreground">admin@crm.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-card border-border">
          <CardContent className="p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Building2 className="w-4 h-4" />
                <span className="text-sm">Total Companies</span>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-4xl font-bold">{companyCount.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  +12 from last month
                </p>
              </div>
              <div className="flex items-center gap-1 text-emerald-400 text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>+33.15%</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <Link
                href="/companies"
                className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                View Details
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="w-4 h-4" />
                <span className="text-sm">Total Contacts</span>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-4xl font-bold">{contactCount.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  +8 from last month
                </p>
              </div>
              <div className="flex items-center gap-1 text-emerald-400 text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>+14.93%</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <Link
                href="/contacts"
                className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                View Details
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <UserCheck className="w-4 h-4" />
                <span className="text-sm">Active Relationships</span>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-4xl font-bold">
                  {companyCount > 0
                    ? Math.round((contactCount / companyCount) * 10)
                    : 0}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  -2 from last month
                </p>
              </div>
              <div className="flex items-center gap-1 text-red-400 text-sm">
                <TrendingDown className="w-4 h-4" />
                <span>-5.49%</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <Link
                href="/contacts"
                className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                View Details
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Company Summary */}
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Building2 className="w-4 h-4 text-muted-foreground" />
              Company Summary
            </CardTitle>
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </CardHeader>
          <CardContent>
            {/* Mini bar chart visualization */}
            <div className="flex gap-1 mb-4">
              <div className="h-8 bg-primary rounded flex-[46]" />
              <div className="h-8 bg-orange-400 rounded flex-[28]" />
              <div className="h-8 bg-orange-300 rounded flex-[16]" />
              <div className="h-8 bg-orange-200 rounded flex-[10]" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-primary" />
                  <span className="text-sm">Technology</span>
                </div>
                <span className="text-sm font-medium">46%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-orange-400" />
                  <span className="text-sm">Finance</span>
                </div>
                <span className="text-sm font-medium">28%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-orange-300" />
                  <span className="text-sm">Healthcare</span>
                </div>
                <span className="text-sm font-medium">16%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-orange-200" />
                  <span className="text-sm">Other</span>
                </div>
                <span className="text-sm font-medium">10%</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
              <span className="text-xs text-muted-foreground">+15 from last year</span>
              <Link
                href="/companies"
                className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                View Details
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Contact Metrics Chart */}
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              Contact Metrics
            </CardTitle>
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </CardHeader>
          <CardContent>
            {/* Bar chart visualization */}
            <div className="h-40 flex items-end gap-2">
              {[45, 60, 55, 70, 85, 120, 237, 180, 150, 140].map((value, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className={`w-full rounded-t transition-all ${
                      i === 6 ? "bg-primary" : "bg-muted"
                    }`}
                    style={{ height: `${(value / 237) * 100}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>2018</span>
              <span>2019</span>
              <span>2020</span>
              <span>2021</span>
              <span>2022</span>
              <span>2023</span>
              <span>2024</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Contacts Table */}
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            Recent Contacts
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="border-border text-muted-foreground">
              Filter
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              See All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {recentContacts.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground">No contacts yet</p>
              <Link
                href="/contacts/new"
                className="text-sm text-primary hover:underline mt-2 inline-block"
              >
                Add your first contact
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-muted-foreground border-b border-border">
                    <th className="pb-3 font-medium">Contact</th>
                    <th className="pb-3 font-medium">Company</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Email</th>
                    <th className="pb-3 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentContacts.map((contact) => (
                    <tr key={contact.id} className="border-b border-border last:border-0">
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
                        {contact.company?.name || "—"}
                      </td>
                      <td className="py-4">
                        <span className="badge-success">Active</span>
                      </td>
                      <td className="py-4 text-muted-foreground">
                        {contact.email || "—"}
                      </td>
                      <td className="py-4">
                        <Button variant="ghost" size="icon" className="text-muted-foreground">
                          <MoreHorizontal className="w-5 h-5" />
                        </Button>
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
