/**
 * Renders rich-text HTML produced by the admin editor inside the themed
 * `.prose-body` container. Content is authored only by the authenticated
 * site owner, so it is trusted.
 */
export default function HtmlBody({ html }: { html: string }) {
  return (
    <div className="prose-body" dangerouslySetInnerHTML={{ __html: html }} />
  );
}
