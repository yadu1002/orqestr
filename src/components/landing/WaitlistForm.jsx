import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function WaitlistForm() {
  const [form, setForm] = useState({
    full_name: '',
    work_email: '',
    company_name: '',
    company_size: '',
    current_tool: '',
    biggest_pain_point: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.work_email) return;
    setLoading(true);
    await base44.entities.WaitlistSignup.create(form);
    setLoading(false);
    setSubmitted(true);
  };

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  return (
    <section id="waitlist" className="py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/[0.03] to-transparent" />
      <div className="max-w-2xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-4">Early Access</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Get on the waitlist
          </h2>
          <p className="text-muted-foreground mt-4">
            Be the first to turn your adoption data into automated action.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-8 space-y-6"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Full name</Label>
                  <Input
                    placeholder="Jane Smith"
                    value={form.full_name}
                    onChange={(e) => update('full_name', e.target.value)}
                    className="h-11 bg-secondary border-border/50 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Work email *</Label>
                  <Input
                    type="email"
                    required
                    placeholder="jane@company.com"
                    value={form.work_email}
                    onChange={(e) => update('work_email', e.target.value)}
                    className="h-11 bg-secondary border-border/50 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Company name</Label>
                  <Input
                    placeholder="Acme Inc."
                    value={form.company_name}
                    onChange={(e) => update('company_name', e.target.value)}
                    className="h-11 bg-secondary border-border/50 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Company size</Label>
                  <Select value={form.company_size} onValueChange={(v) => update('company_size', v)}>
                    <SelectTrigger className="h-11 bg-secondary border-border/50 rounded-xl">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-50">1–50</SelectItem>
                      <SelectItem value="51-200">51–200</SelectItem>
                      <SelectItem value="201-500">201–500</SelectItem>
                      <SelectItem value="500+">500+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Current CS / RevOps tool</Label>
                  <Select value={form.current_tool} onValueChange={(v) => update('current_tool', v)}>
                    <SelectTrigger className="h-11 bg-secondary border-border/50 rounded-xl">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Gainsight">Gainsight</SelectItem>
                      <SelectItem value="ChurnZero">ChurnZero</SelectItem>
                      <SelectItem value="Vitally">Vitally</SelectItem>
                      <SelectItem value="Totango">Totango</SelectItem>
                      <SelectItem value="Salesforce only">Salesforce only</SelectItem>
                      <SelectItem value="Spreadsheets/manual">Spreadsheets / manual</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Biggest pain point</Label>
                  <Select value={form.biggest_pain_point} onValueChange={(v) => update('biggest_pain_point', v)}>
                    <SelectTrigger className="h-11 bg-secondary border-border/50 rounded-xl">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Slow response to churn signals">Slow response to churn signals</SelectItem>
                      <SelectItem value="Poor feature adoption visibility">Poor feature adoption visibility</SelectItem>
                      <SelectItem value="Manual cross-team coordination">Manual cross-team coordination</SelectItem>
                      <SelectItem value="No clear playbooks">No clear playbooks</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full group flex items-center justify-center gap-2 h-12 text-base font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20 disabled:opacity-70"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Join the Waitlist
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl border border-primary/30 bg-primary/5 p-12 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">You're on the list!</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Thanks for your interest in Signaly. We'll be in touch soon with early access details 
                and a personal demo walkthrough.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}