/*
 * Home Page
 * Design: Editorial Kinetic — 编辑动态主义
 * Composition: Hero → Timeline → Footer
 * The entire page is a single scrollable narrative
 */

import Hero from '@/components/Hero';
import Timeline from '@/components/Timeline';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      <Hero />
      <Timeline />
      <Footer />
    </div>
  );
}
