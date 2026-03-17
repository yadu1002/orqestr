import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download, ArrowLeft, Lock, Loader2, Users } from 'lucide-react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const ADMIN_PASSWORD = 'signaly2024';

export default function Admin() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold">Admin Access</h1>
            <p className="text-muted-foreground text-sm mt-2">Enter admin password to view submissions</p>
          </div>
          <form onSubmit={(e) => {
            e.preventDefault();
            if (password === ADMIN_PASSWORD) setAuthenticated(true);
          }} className="space-y-4">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 bg-secondary border-border/50 rounded-xl"
            />
            <button
              type="submit"
              className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <AdminDashboard />;
}

function AdminDashboard() {
  const { data: signups = [], isLoading } = useQuery({
    queryKey: ['waitlist-signups'],
    queryFn: () => base44.entities.WaitlistSignup.list('-created_date', 500),
  });

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Company', 'Company Size', 'Current Tool', 'Pain Point', 'Signup Date'];
    const rows = signups.map(s => [
      s.full_name || '',
      s.work_email || '',
      s.company_name || '',
      s.company_size || '',
      s.current_tool || '',
      s.biggest_pain_point || '',
      s.created_date ? format(new Date(s.created_date), 'yyyy-MM-dd HH:mm') : ''
    ]);
    const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `signaly-waitlist-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Link to="/Landing" className="p-2 rounded-lg hover:bg-secondary transition-colors">
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Waitlist Submissions</h1>
              <div className="flex items-center gap-2 mt-1">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{signups.length} total signups</span>
              </div>
            </div>
          </div>
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : signups.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            No signups yet.
          </div>
        ) : (
          <div className="rounded-xl border border-border/50 overflow-hidden bg-card/50">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary/50">
                    <TableHead className="font-semibold">Name</TableHead>
                    <TableHead className="font-semibold">Email</TableHead>
                    <TableHead className="font-semibold">Company</TableHead>
                    <TableHead className="font-semibold">Size</TableHead>
                    <TableHead className="font-semibold">Current Tool</TableHead>
                    <TableHead className="font-semibold">Pain Point</TableHead>
                    <TableHead className="font-semibold">Signup Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {signups.map((signup) => (
                    <TableRow key={signup.id} className="hover:bg-secondary/30 transition-colors">
                      <TableCell className="font-medium">{signup.full_name || '—'}</TableCell>
                      <TableCell>{signup.work_email}</TableCell>
                      <TableCell>{signup.company_name || '—'}</TableCell>
                      <TableCell>
                        {signup.company_size ? (
                          <Badge variant="secondary" className="font-normal">{signup.company_size}</Badge>
                        ) : '—'}
                      </TableCell>
                      <TableCell>
                        {signup.current_tool ? (
                          <Badge variant="outline" className="font-normal">{signup.current_tool}</Badge>
                        ) : '—'}
                      </TableCell>
                      <TableCell className="max-w-[200px]">
                        <span className="text-sm text-muted-foreground truncate block">
                          {signup.biggest_pain_point || '—'}
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {signup.created_date ? format(new Date(signup.created_date), 'MMM d, yyyy') : '—'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}