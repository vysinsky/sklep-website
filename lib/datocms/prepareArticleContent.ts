import { JSDOM } from "jsdom";

export default function prepareArticleContent(content: string) {
  const { document } = new JSDOM(content).window;

  // Walk all first images and mark its parentElement with special class
  document
    .querySelectorAll("span > img:first-child, p > img:first-child")
    .forEach((el) => {
      el.parentElement?.classList.add("with-images");
    });

  return document.body.innerHTML;
}
