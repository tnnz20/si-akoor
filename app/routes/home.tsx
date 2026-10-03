import { useState } from 'react';

import { ComparisonSection } from '~/components/home/comparison-section';
import { CtaSection } from '~/components/home/cta-section';
import { DivisionsSection } from '~/components/home/divisions-section';
import { FaqSection } from '~/components/home/faq-section';
import { FeaturesSection } from '~/components/home/features-section';
import { HeroSection } from '~/components/home/hero-section';
import { SimulatorSection } from '~/components/home/simulator-section';

import type { Route } from './+types/home';

export const meta: Route.MetaFunction = () => [
  { title: 'Si Akoor - Sekretariat DPRD Kabupaten Tapin' },
  {
    name: 'description',
    content:
      'Sistem Informasi Apel dan Koordinasi Internal Sekretariat DPRD Kabupaten Tapin. Presensi apel pagi terverifikasi geotagging, tindak lanjut arahan pimpinan, dan rekapitulasi kehadiran aparatur.',
  },
];

export default function Home() {
  const [statHadir, setStatHadir] = useState(142);

  return (
    <main>
      <HeroSection onCheckin={() => setStatHadir((n) => n + 1)} />
      <DivisionsSection />
      <FeaturesSection statHadir={statHadir} />
      <SimulatorSection onVerified={() => setStatHadir((n) => n + 1)} />
      <ComparisonSection />
      <FaqSection />
      <CtaSection />
    </main>
  );
}
