import { MetaProvider, Title, Link, Meta } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";

export default function App() {
  return (
    <Router
      root={props => (
        <MetaProvider>
          <Title>cqdetdev</Title>
          <Meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta name="description" content="cqdetdev - backend, distributed systems, Minecraft Bedrock infrastructure, Go, Elixir, and systems writing." />
          <Meta name="theme-color" content="#08080a" />
          <Meta property="og:type" content="website" />
          <Meta property="og:site_name" content="cqdetdev" />
          <Meta property="og:title" content="cqdetdev - backend portfolio" />
          <Meta property="og:description" content="Backend work, distributed systems, Minecraft Bedrock infrastructure, and writing by cqdetdev." />
          <Meta property="og:url" content="https://cqdetdev.github.io/" />
          <Meta property="og:image" content="https://cqdetdev.github.io/avatar.png" />
          <Meta property="og:image:alt" content="cqdetdev profile picture" />
          <Meta name="twitter:card" content="summary" />
          <Meta name="twitter:title" content="cqdetdev - backend portfolio" />
          <Meta name="twitter:description" content="Backend work, distributed systems, Minecraft Bedrock infrastructure, and writing by cqdetdev." />
          <Meta name="twitter:image" content="https://cqdetdev.github.io/avatar.png" />
          <Link rel="icon" type="image/png" href="/favicon.png" />
          <Link rel="apple-touch-icon" href="/avatar.png" />
          <Link rel="canonical" href="https://cqdetdev.github.io/" />
          <Suspense>{props.children}</Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
