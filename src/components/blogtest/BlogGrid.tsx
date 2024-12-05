import type { CollectionEntry } from "astro:content";

interface BlogGridProps {
  posts: CollectionEntry<"Blog">[];
}

export function BlogGrid({ posts }: BlogGridProps) {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((blog) => (
        <a
          key={blog.slug}
          aria-label={blog.data.title}
          href={`/blog/${blog.slug}`}
          className="group  block overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
        >
          <div className="relative aspect-video">
            <img
              src={blog.data.bannerImage.src}
              alt={blog.data.title}
              className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            {blog.data.tags && blog.data.tags.length > 0 && (
              <div className="absolute left-4 top-4 z-10">
                <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white shadow-lg">
                  {blog.data.tags[0]}
                </span>
              </div>
            )}
          </div>
          <div className="p-6">
            <h3 className="mb-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-primary">
              {blog.data.title}
            </h3>
            <p className="mb-4 line-clamp-2 text-sm text-gray-600">
              {blog.data.description}
            </p>
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-lg font-semibold text-primary">
                {blog.data.contributors[0]?.charAt(0).toUpperCase() || "?"}
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {blog.data.contributors[0] || "Anonymous"}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(blog.data.pubDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
