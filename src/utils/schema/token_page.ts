import { defineCollection, z } from "astro:content";

export const tokenPage = defineCollection({
  // Type-check frontmatter using a schema
  schema: ({ image }) => {
    return z.object({
      heroSection: z.object({
        title: z.string(),
        description: z.string(),
      }),

      ecosystemSection: z.object({
        title: z.string(),
        description: z.string(),

        table: z.array(
          z.object({
            row: z.array(
              z.object({
                title: z.string(),

                link: z.string().optional(),
              }),
            ),
          }),
        ),
      }),

      buyingAKTSection: z.object({
        title: z.string(),
        description: z.string(),

        table: z.array(
          z.object({
            row: z.array(
              z.object({
                title: z.string(),

                link: z.string().optional(),
              }),
            ),
          }),
        ),
      }),

      aktFeaturesSection: z.object({
        title: z.string(),
        description: z.string(),
      }),

      howItWorksSection: z.object({
        title: z.string(),
        cards: z.array(
          z.object({
            title: z.string(),
            description: z.string(),
            icon: image(),
          }),
        ),
      }),

      faqsSection: z.object({
        title: z.string(),
        faqs: z.array(
          z.object({
            title: z.string(),
            description: z.string(),
          }),
        ),
      }),
    });
  },
});
