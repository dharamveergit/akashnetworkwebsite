import type { CollectionEntry } from "astro:content";
import { useEffect, useState } from "react";
import { BlogGrid } from "./BlogGrid";
import { BlogPagination } from "./BlogPagination";
import { BlogSearch } from "./BlogSearch";
import { FeaturedPost } from "./FeaturedPost";

const Blogs = ({ blogs }: { blogs: CollectionEntry<"Blog">[] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState(blogs);
  const [selectedTag, setSelectedTag] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;

  // Sort blogs by pubDate in descending order (newest first)
  const sortedBlogs = [...blogs].sort(
    (a, b) =>
      new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime(),
  );

  // Get all unique tags
  const tags = Array.from(
    new Set(sortedBlogs.flatMap((blog) => blog.data.tags)),
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const page = parseInt(params.get("page") || "1");
      const tag = params.get("tag") || "all";
      const search = params.get("search") || "";

      setSelectedTag(tag);
      setSearchTerm(search);
      setCurrentPage(page);
    }
  }, []);

  useEffect(() => {
    let filtered = sortedBlogs;

    if (searchTerm) {
      filtered = filtered.filter(
        (blog) =>
          blog.data.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.data.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
      );
    }

    if (selectedTag !== "all") {
      filtered = filtered.filter((blog) =>
        blog.data.tags.includes(selectedTag),
      );
    }

    setFilteredBlogs(filtered);

    if (typeof window !== "undefined") {
      const params = new URLSearchParams();
      if (searchTerm) params.set("search", searchTerm);
      if (selectedTag !== "all") params.set("tag", selectedTag);
      params.set("page", currentPage.toString());
      window.history.replaceState(
        {},
        "",
        `${window.location.pathname}?${params.toString()}`,
      );
    }
  }, [searchTerm, selectedTag, sortedBlogs, currentPage]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredBlogs.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredBlogs.length / postsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const pinnedPost = sortedBlogs[0];

  return (
    <div className="container-small 8 mx-auto mt-[120px] px-4">
      <FeaturedPost post={pinnedPost} />

      <BlogSearch
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        selectedTag={selectedTag}
        onTagSelect={setSelectedTag}
        tags={tags}
      />

      <BlogGrid posts={currentPosts} />

      <BlogPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Blogs;
