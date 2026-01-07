import { visit } from "unist-util-visit";
import type { Root, Node, Text, Image, Paragraph } from "mdast";
import type { Plugin } from "unified";

function isAside(node: Node): boolean {
  return node.type === "containerDirective" && "name" in node && node.name === "aside";
}

function isCarouselNode(node: Node): boolean {
  return node.type === "containerDirective" && "name" in node && node.name === "carousel";
}

export const remarkCarousel: Plugin<void[], Root> = () => {
  return (tree: Root) => {
    visit(tree, (node) => {
      if (isCarouselNode(node)) handleCarousel(node);
      if (isAside(node)) handleAside(node);
    });
  };
};

function handleCarousel(node: Node): void {
  node.data = { hName: "div", hProperties: { className: "carousel" } };
  if ("children" in node && Array.isArray(node.children)) {
    node.children = transformChildNodes(node.children);
  }
}

function handleAside(node: Node): void {
  node.data = { hName: "aside", hProperties: { className: "aside-block" } };
}

function transformChildNodes(children: Node[]): Node[] {
  return children.flatMap((child) => {
    if (isParagraphWithChildren(child)) {
      return child.children.map(transformTextToImage);
    }
    if (child.type === "image") return child as Image;
    return [];
  });
}

function isParagraphWithChildren(node: Node): node is Paragraph {
  return node.type === "paragraph" && "children" in node;
}

function transformTextToImage(node: Node): Node {
  if (node.type === "text") {
    const value = (node as Text).value.trim();
    if (value.startsWith("http")) {
      return { type: "image", url: value, alt: "Imagen" } as Image;
    }
  }
  return node;
}
