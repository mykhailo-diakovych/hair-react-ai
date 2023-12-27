import React from "react";
import Prism from "prismjs";
import beautify from "js-beautify";
import { StyledCodeBlock } from "@components/CodeBlock/styled/CodeBlock.styled";
import "prismjs/themes/prism.css";

interface CodeBlockProps {
  text: string;
}

export const CodeBlock = React.forwardRef<HTMLPreElement, CodeBlockProps>(
  ({ text }, ref) => {
    const getFormattedCode = (code: string) => {
      try {
        const formattedCode = beautify.html(code, {
          indent_size: 2,
          wrap_line_length: 80
        });
        const highlightedCode = Prism.highlight(
          formattedCode,
          Prism.languages.html,
          "html"
        );
        return highlightedCode;
      } catch (e) {
        return code;
      }
    };

    return (
      <StyledCodeBlock size="lg" className="prism-code" ref={ref}>
        <code
          className="language-html"
          dangerouslySetInnerHTML={{
            __html: getFormattedCode(text)
          }}
        />
      </StyledCodeBlock>
    );
  }
);
