import { supabase } from "@/lib/supabase";
import type { HeroData } from "@/types";

export const heroService = {
  async get(): Promise<HeroData> {
    // Hero Section
    const { data: hero, error: heroError } = await supabase
      .from("hero_section")
      .select("*")
      .single();

    if (heroError) throw heroError;

    // Hero Stats
    const { data: stats, error: statsError } = await supabase
      .from("hero_stats")
      .select("*")
      .eq("hero_section_id", hero.id)
      .order("display_order");

    if (statsError) throw statsError;

    return {
      id: hero.id,
      greeting: hero.greeting,
      name: hero.name,
      title: hero.title,
      subtitle: hero.subtitle,
      description: hero.description,

      // Snake_case → CamelCase
      ctaText: hero.cta_text,
      ctaLink: hero.cta_link,
      resumeLink: hero.resume_link,

      stats: stats,
    };
  },

  async update(updates: Partial<HeroData>) {
    const { id, ...rest } = updates;

    const { data, error } = await supabase
      .from("hero_section")
      .update({
        greeting: rest.greeting,
        name: rest.name,
        title: rest.title,
        subtitle: rest.subtitle,
        description: rest.description,
        cta_text: rest.ctaText,
        cta_link: rest.ctaLink,
        resume_link: rest.resumeLink,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return data;
  },
};