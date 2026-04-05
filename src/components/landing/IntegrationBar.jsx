import React from 'react';
import { motion } from 'framer-motion';

const integrations = ['Salesforce', 'HubSpot', 'Segment', 'Gainsight', 'Slack', 'Zendesk', 'Amplitude'];

export default function IntegrationBar() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">
            Connects with your existing stack
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {integrations.map((name) => (
              <span
                key={name}
                className="px-4 py-2 text-sm font-medium rounded-full border border-border text-foreground bg-background hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}