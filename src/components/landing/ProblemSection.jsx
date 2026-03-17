import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, LayoutDashboard, Zap } from 'lucide-react';

const problems = [
  {
    icon: BarChart3,
    title: "You have the data",
    description: "Product usage metrics, health scores, CRM signals — it's all there, scattered across a dozen tools.",
    color: "text-chart-2"
  },
  {
    icon: LayoutDashboard,
    title: "You have the dashboards",
    description: "Beautiful charts and reports that show trends. But dashboards don't send emails, assign tasks, or coordinate teams.",
    color: "text-chart-3"
  },
  {
    icon: Zap,
    title: "But nothing happens automatically",
    description: "The gap between seeing a signal and taking action costs you renewals, expansion revenue, and customer trust.",
    color: "text-primary"
  }
];

export default function ProblemSection() {
  return (
    <section className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-4">The Problem</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Data without action is just noise
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((problem, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group relative p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-500"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-6">
                  <problem.icon className={`w-6 h-6 ${problem.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{problem.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{problem.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}