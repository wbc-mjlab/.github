/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    "../profile/assets/wbc_g1_hardware_collage.mp4": "assets/wbc_g1_hardware_collage.mp4",
    "../profile/assets/collage.jpg": "assets/collage.jpg",
    "../profile/assets/demo_screen.png": "assets/demo_screen.png",
  });
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");

  const pathPrefix = process.env.PATH_PREFIX ?? "/.github";

  return {
    pathPrefix,
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
}
