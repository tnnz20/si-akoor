import { FAQ_ITEMS } from '~/constants/home';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';

import { Reveal } from './reveal';

export function FaqSection() {
  return (
    <section id="faq" className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal className="mb-12 text-center">
        <Badge
          variant="outline"
          className="border-amber-200 bg-amber-100 px-3 py-1 text-xs font-bold tracking-wider text-amber-700 uppercase"
        >
          FAQ
        </Badge>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-900">
          Pertanyaan yang Sering Diajukan
        </h2>
      </Reveal>

      <Reveal delay={80}>
        <Accordion type="single" collapsible defaultValue="faq1" className="space-y-4">
          {FAQ_ITEMS.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="rounded-2xl border border-neutral-200/80 bg-white px-6 shadow-sm data-[state=open]:border-neutral-300"
            >
              <AccordionTrigger className="text-left text-sm font-bold text-neutral-800 hover:no-underline sm:text-base">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="pt-1 pb-4 text-xs leading-relaxed text-neutral-600 sm:text-sm">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  );
}
