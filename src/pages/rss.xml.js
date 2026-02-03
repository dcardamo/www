import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const blog = await getCollection("blog");
  
  // Sort by pubDate descending
  const sortedPosts = blog.sort(
    (a, b) => new Date(b.data.pubDate).valueOf() - new Date(a.data.pubDate).valueOf()
  );

  return rss({
    title: "Dan Cardamore",
    description: "Photography, AI, and building things",
    site: context.site,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.id}/`,
      author: post.data.author || "Dan",
      categories: post.data.tags || [],
    })),
    customData: `<language>en-us</language>`,
  });
}
