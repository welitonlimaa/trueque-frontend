import React from 'react';
import ReactMarkdown from 'react-markdown';

type MarkdownMessageProps = {
  content: string;
};

function normalizeLinks(text: string) {
  return text.replace(
    /\/\('\s*([a-z0-9-]+)\s*',\s*''\)/gi,
    '/$1'
  );
}

export function MarkdownMessage({ content }: MarkdownMessageProps) {
  return (
    <ReactMarkdown
      components={{
        a: ({ node, ...props }) => (
          <a
            {...props}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          />
        ),
        p: ({ node, ...props }) => (
          <p className="mb-2 leading-relaxed" {...props} />
        ),
        ul: ({ node, ...props }) => (
          <ul className="list-disc pl-5 mb-2" {...props} />
        ),
        li: ({ node, ...props }) => (
          <li className="mb-1" {...props} />
        ),
        strong: ({ node, ...props }) => (
          <strong className="font-semibold" {...props} />
        ),
      }}
    >
      {normalizeLinks(content)}
    </ReactMarkdown>
  );
}