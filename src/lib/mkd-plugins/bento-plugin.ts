/* eslint-disable @typescript-eslint/no-explicit-any */
import { visit } from "unist-util-visit";
import type { Root, Node, Parent, Link, Paragraph } from "mdast";

interface DirectiveNode extends Node {
  type: "containerDirective";
  name: string;
  data: {
    hName: string;
    hProperties: Record<string, any>;
  };
  children: Node[];
}

const isVideoUrl = (url: string) => /\.(mp4|webm|ogg|mov)($|\?)/i.test(url);

const isMediaNode = (node: Node): boolean => {
  if (node.type === "image") return true;
  if (node.type === "link") {
    return isVideoUrl((node as Link).url);
  }
  return false;
};

const isMediaParagraph = (node: Node): boolean => {
  if (node.type !== "paragraph") return false;
  const p = node as Paragraph;
  if (p.children.length === 1 && isMediaNode(p.children[0])) {
    return true;
  }
  return false;
};

export function remarkAutoBento() {
  return (tree: Root) => {
    visit(tree, (node) => {
      if (!("children" in node)) return;
      if (node.type === "containerDirective" && (node as any).name === "carousel") {
        return;
      }
      if (node.type === "containerDirective" && (node as any).name === "bento") {
        return;
      }

      const parent = node as Parent;

      const newChildren: any[] = [];
      let mediaBuffer: any[] = [];

      const flushBuffer = () => {
        if (mediaBuffer.length >= 3) {
          const bentoNode: DirectiveNode = {
            type: "containerDirective",
            name: "bento",
            data: {
              hName: "div",
              hProperties: { className: "bento-grid" },
            },
            children: [...mediaBuffer],
          };

          newChildren.push(bentoNode);
        } else {
          newChildren.push(...mediaBuffer);
        }
        mediaBuffer = [];
      };

      for (const child of parent.children) {
        if (isMediaNode(child)) {
          mediaBuffer.push(child);
          continue;
        }

        if (isMediaParagraph(child)) {
          mediaBuffer.push((child as Paragraph).children[0]);
          continue;
        }

        flushBuffer();
        newChildren.push(child);
      }

      flushBuffer();

      parent.children = newChildren as any;
    });
  };
}
