import { Approach } from "@/components/home/Approach";
import { Contact } from "@/components/home/Contact";
import { Hero } from "@/components/home/Hero";
import { Skills } from "@/components/home/Skills";
import { WorkIndex } from "@/components/home/WorkIndex";
import { JsonLd } from "@/components/seo/JsonLd";
import { personJsonLd } from "@/lib/seo";

export default function HomePage() {
  return (
    <>
      <JsonLd data={personJsonLd()} />
      <Hero />
      <WorkIndex />
      <Approach />
      <Skills />
      <Contact />
    </>
  );
}
