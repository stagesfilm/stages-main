"use client";

import React from "react";
import {
  RichText,
  type JSXConvertersFunction,
} from "@payloadcms/richtext-lexical/react";
import type {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedUploadNode,
} from "@payloadcms/richtext-lexical";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

type TextSectionBlock = {
  blockType: "textSection";
  content: SerializedEditorState;
  width?: "small" | "medium" | "full" | null;
};

type VideoEmbedBlock = {
  blockType: "videoEmbed";
  url: string;
  caption?: string | null;
};

type LogoItem = {
  image: { url?: string; alt?: string } | number;
  link?: string | null;
  id?: string;
};

type LogoBarBlock = {
  blockType: "logoBar";
  logos: LogoItem[];
  height?: "small" | "medium" | "large" | null;
  alignment?: "left" | "center" | null;
};

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<TextSectionBlock>
  | SerializedBlockNode<VideoEmbedBlock>
  | SerializedBlockNode<LogoBarBlock>;

const TEXT_WIDTHS = {
  small: "max-w-[40ch]",
  medium: "max-w-[60ch]",
  full: "max-w-full",
} as const;

function TextSection({ content, width }: TextSectionBlock) {
  const wClass = TEXT_WIDTHS[width ?? "medium"];
  return (
    <div className={`${wClass} mx-auto my-8 lexical-content lexical-content--unstyled`}>
      <RichText data={content} converters={textSectionConverters} disableContainer />
    </div>
  );
}

function parseVideoUrl(url: string): { provider: "youtube" | "vimeo" | null; id: string | null } {
  // YouTube: various URL formats
  const ytMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  );
  if (ytMatch) return { provider: "youtube", id: ytMatch[1] };

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return { provider: "vimeo", id: vimeoMatch[1] };

  return { provider: null, id: null };
}

function VideoEmbedBlock({ url, caption }: { url: string; caption?: string | null }) {
  const { provider, id } = parseVideoUrl(url);

  let embedSrc: string | null = null;
  if (provider === "youtube" && id) {
    embedSrc = `https://www.youtube-nocookie.com/embed/${id}?rel=0`;
  } else if (provider === "vimeo" && id) {
    embedSrc = `https://player.vimeo.com/video/${id}?dnt=1`;
  }

  if (!embedSrc) {
    return (
      <div className="my-8 p-4 border border-foreground/10 rounded text-foreground/50 text-sm">
        Unsupported video URL: {url}
      </div>
    );
  }

  return (
    <figure className="my-8">
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        <iframe
          src={embedSrc}
          className="absolute inset-0 w-full h-full rounded"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-foreground/40 text-sm font-meta">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

const LOGO_HEIGHTS = { small: "h-[28px]", medium: "h-[36px]", large: "h-[48px]" } as const;

function LogoBar({ logos, height, alignment }: LogoBarBlock) {
  const hClass = LOGO_HEIGHTS[height ?? "medium"];
  const justifyClass = alignment === "center" ? "justify-center" : "justify-start";

  return (
    <div className={`my-8 flex flex-wrap items-center ${justifyClass} gap-x-[40px] md:gap-x-[56px] gap-y-[24px]`}>
      {logos?.map((item, i) => {
        const doc = typeof item.image === "object" ? item.image : null;
        if (!doc?.url) return null;

        const img = (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={doc.url}
            alt={doc.alt ?? ""}
            className={`${hClass} w-auto`}
            loading="lazy"
          />
        );

        if (item.link) {
          return (
            <a key={item.id ?? i} href={item.link} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              {img}
            </a>
          );
        }

        return <span key={item.id ?? i}>{img}</span>;
      })}
    </div>
  );
}

function UploadImage({ node }: { node: SerializedUploadNode }) {
  const doc = node.value;
  if (typeof doc !== "object" || !doc) return null;

  const { url, alt, width, height } = doc as {
    url?: string;
    alt?: string;
    width?: number;
    height?: number;
  };
  if (!url) return null;

  const fields = (node.fields ?? {}) as {
    caption?: string;
    link?: string;
    size?: string;
  };

  const sizeClass =
    fields.size === "small"
      ? "max-w-[320px]"
      : fields.size === "full"
        ? "max-w-full"
        : "max-w-[60ch]";

  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={url}
      alt={alt ?? ""}
      width={width}
      height={height}
      className={`${sizeClass} w-full h-auto rounded`}
      loading="lazy"
    />
  );

  const wrapped = fields.link ? (
    <a href={fields.link} target="_blank" rel="noopener noreferrer">
      {img}
    </a>
  ) : (
    img
  );

  return (
    <figure className="my-6">
      {wrapped}
      {fields.caption && (
        <figcaption className="mt-2 text-foreground/40 text-sm font-meta">
          {fields.caption}
        </figcaption>
      )}
    </figure>
  );
}

const textSectionConverters: JSXConvertersFunction<DefaultNodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
});

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  blocks: {
    textSection: ({ node }) => (
      <TextSection
        blockType="textSection"
        content={node.fields.content as unknown as SerializedEditorState}
        width={node.fields.width as TextSectionBlock["width"]}
      />
    ),
    videoEmbed: ({ node }) => (
      <VideoEmbedBlock
        url={node.fields.url}
        caption={node.fields.caption}
      />
    ),
    logoBar: ({ node }) => (
      <LogoBar
        blockType="logoBar"
        logos={node.fields.logos as LogoItem[]}
        height={node.fields.height as LogoBarBlock["height"]}
        alignment={node.fields.alignment as LogoBarBlock["alignment"]}
      />
    ),
  },
  upload: ({ node }) => <UploadImage node={node} />,
});

interface LexicalContentProps {
  content: SerializedEditorState;
  className?: string;
}

export function LexicalContent({ content, className }: LexicalContentProps) {
  return (
    <div className={`lexical-content ${className ?? ""}`}>
      <RichText data={content} converters={jsxConverters} disableContainer />
    </div>
  );
}
