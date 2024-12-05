import type { CollectionEntry } from "astro:content";

interface FeaturedPostProps {
  post: CollectionEntry<"Blog">;
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <div className="mb-16 overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-purple-700 p-1 shadow-2xl transition-all duration-300 hover:shadow-blue-500/25">
      <a href={`/blog/${post.slug}`} className="group block">
        <div className="relative overflow-hidden rounded-[calc(1.5rem-4px)] bg-white">
          <div className="aspect-video max-h-[500px] w-full overflow-hidden">
            <img
              src={post.data.bannerImage.src}
              alt={post.data.title}
              className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="space-y-4">
              {post.data.tags && post.data.tags.length > 0 && (
                <span className="inline-block rounded-full bg-primary px-4 py-1 text-sm font-semibold text-white shadow-lg transition-all duration-300 group-hover:bg-blue-400">
                  {post.data.tags[0]}
                </span>
              )}
              <h2 className="text-3xl font-bold text-white transition-all duration-300 group-hover:text-blue-300 sm:text-4xl md:text-5xl">
                {post.data.title}
              </h2>
              <p className="text-lg text-gray-300 transition-all duration-300 group-hover:text-white">
                {post.data.description}
              </p>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-gray-200 text-xl font-bold text-primary">
                  {post.data.contributors[0]?.charAt(0).toUpperCase() || "?"}
                </div>
                <div>
                  <p className="font-medium text-white">
                    {post.data.contributors[0] || "Anonymous"}
                  </p>
                  <p className="text-sm text-gray-300">
                    {new Date(post.data.pubDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
