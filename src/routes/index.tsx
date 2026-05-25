import { Title } from "@solidjs/meta";
import { For, Show, createSignal, onMount, onCleanup } from "solid-js";
import "../styles/hex.css";

const SECTIONS = [
  { id: "work", label: "Work", angle: 0, icon: "//", color: "#e8c878", summary: "10 projects + OSS contributions" },
  { id: "stack", label: "Stack", angle: 60, icon: "{}", color: "#7dd87d", summary: "Go · TypeScript · Elixir · Rust · Python" },
  { id: "blog", label: "Blog", angle: 120, icon: ">>", color: "#d97a7a", summary: "LevelDB post live · Bedrock dev essay next" },
  { id: "now", label: "Now", angle: 180, icon: "~~", color: "#7ab8d9", summary: "Dragonfly · gophertunnel · board.ly" },
  { id: "about", label: "About", angle: 240, icon: "()", color: "#c49dd9", summary: "Backend eng. Building infra since 2019" },
  { id: "contact", label: "Contact", angle: 300, icon: "->", color: "#d9b07a", summary: "cqdetdisc@gmail.com · github · x.com" },
];

type ProjectFull = {
  name: string;
  desc: string;
  tech: string;
  year: string;
  role: string;
  repo: string;
  longDesc: string;
  highlights: string[];
  architecture: string;
};

const PROJECTS: ProjectFull[] = [
  {
    name: "Tedac", desc: "Multiversion Bedrock proxy", tech: "Go", year: "2024",
    role: "Author", repo: "github.com/cqdetdev/tedac",
    longDesc: "A multiversion proxy for Minecraft Bedrock that translates packets between different protocol versions. Handles session management, chunk translation, and inventory synchronization across version boundaries.",
    highlights: ["3k+ downloads", "Supports 6 protocol versions simultaneously", "Sub-millisecond packet translation", "Zero-copy buffer pooling for chunk data"],
    architecture: `flowchart LR
  Client["Bedrock client"]:::edge --> Ingress["RakNet listener"]:::core
  Ingress --> Session["client session"]:::core
  Session --> Detect{"protocol version"}:::decision
  Detect --> Registry["translator registry"]:::core
  Registry --> Codec["packet codec"]:::core
  Codec --> State["runtime ID + inventory mapping"]:::data
  State --> Relay["server relay"]:::core
  Relay --> Server["target Bedrock server"]:::edge
  Server -. packets .-> Relay
  Relay -. translated packets .-> Client

  classDef core fill:#181716,stroke:#e8c878,color:#f4f1ea;
  classDef data fill:#101820,stroke:#7ab8d9,color:#f4f1ea;
  classDef edge fill:#111114,stroke:#7a766d,color:#c8c2b6;
  classDef decision fill:#201714,stroke:#d9b07a,color:#f4f1ea;`,
  },
  {
    name: "BlazeDB", desc: "13× faster LevelDB replacement", tech: "Go", year: "2024",
    role: "Author", repo: "github.com/cqdetdev/blazedb",
    longDesc: "A specialized Dragonfly world provider that replaces LevelDB with append-only chunk storage, Z-order spatial indexing, sharded cache, optional delta records, and recovery by index rebuild.",
    highlights: ["Append-only chunk storage", "Z-order spatial locality", "Sharded LRU cache", "Overlay, delta, and segmented provider APIs"],
    architecture: `flowchart LR
  Server["Dragonfly world provider"]:::edge --> API["BlazeDB API"]:::core

  subgraph Write["write path"]
    API --> Encode["encode column + compress"]:::core
    Encode --> Compare{"unchanged hot record?"}:::decision
    Compare -->|skip| Cache["sharded LRU cache"]:::data
    Compare -->|changed| Buffer["write buffer"]:::core
    Buffer --> Flush["background flush"]:::core
    Flush --> Chunks[("chunks.dat append log")]:::disk
    Flush --> Index[("index.dat spatial map")]:::disk
  end

  subgraph Read["read path"]
    API --> Cache
    Cache -->|miss| Morton["Morton / Z-order lookup"]:::core
    Morton --> Index
    Index --> Chunks
    Chunks --> Decode["read + decompress"]:::core
    Decode --> Cache
  end

  API --> Delta[("deltas.dat optional block deltas")]:::disk
  API --> Overlay["overlay / segmented providers"]:::data

  classDef core fill:#181716,stroke:#e8c878,color:#f4f1ea;
  classDef data fill:#101820,stroke:#7ab8d9,color:#f4f1ea;
  classDef disk fill:#14120e,stroke:#d9b07a,color:#f4f1ea;
  classDef edge fill:#111114,stroke:#7a766d,color:#c8c2b6;
  classDef decision fill:#201714,stroke:#d97a7a,color:#f4f1ea;`,
  },
  {
    name: "Oomph AC", desc: "Anti-cheat for 5k+ daily players", tech: "Go", year: "2024",
    role: "Maintainer", repo: "github.com/oomph-ac/oomph",
    longDesc: "The most accurate anti-cheat for Minecraft Bedrock. Uses statistical heuristics over hard thresholds — reach analysis, aim pattern detection, movement prediction with latency compensation.",
    highlights: ["5k+ daily concurrent players", "Sub-ms detection latency", "Adaptive thresholds per-player", "Latency-compensated movement checks"],
    architecture: `flowchart TB
  Client["Bedrock client"]:::edge --> Proxy["Oomph MITM proxy"]:::core
  Proxy --> Packets["packet interceptor"]:::core

  subgraph Movement["server-authoritative movement"]
    Packets --> AuthInput["PlayerAuthInput stream"]:::data
    AuthInput --> Predict["movement simulation"]:::core
    Predict --> Correct{"position drift?"}:::decision
    Correct -->|yes| Setback["send correction"]:::action
    Correct -->|no| MovementPass["forward movement"]:::core
  end

  subgraph Combat["server-authoritative combat"]
    Packets --> Attack["attack / swing signal"]:::data
    Attack --> Rewind["entity position buffer"]:::core
    Rewind --> Raycast["raycast + reach check"]:::core
    Raycast --> Verdict{"valid hit?"}:::decision
    Verdict -->|valid| ForwardHit["forward attack"]:::action
    Verdict -->|invalid| Mitigate["flag or cancel"]:::action
  end

  MovementPass --> Server["upstream server"]:::edge
  ForwardHit --> Server
  Setback --> Client
  Mitigate --> Client

  classDef core fill:#181716,stroke:#e8c878,color:#f4f1ea;
  classDef data fill:#101820,stroke:#7ab8d9,color:#f4f1ea;
  classDef action fill:#1b2118,stroke:#7dd87d,color:#f4f1ea;
  classDef edge fill:#111114,stroke:#7a766d,color:#c8c2b6;
  classDef decision fill:#201714,stroke:#d97a7a,color:#f4f1ea;`,
  },
  {
    name: "Prism", desc: "Distributed data broker", tech: "Elixir/UDP", year: "2025",
    role: "Author", repo: "github.com/cqdetdev/prism",
    longDesc: "A distributed broker for clustered servers that pulls database logic behind a UDP packet layer, encrypted service requests, OTP cluster broadcast, telemetry, and service modules.",
    highlights: ["UDP packet server", "AES-secured service calls", "OTP cluster broadcast", "Practice service sample and TypeScript client"],
    architecture: `flowchart LR
  Client["game server / TS client"]:::edge --> UDP["Net.Server UDP socket"]:::core
  UDP --> Manager["Net.Manager"]:::core
  Manager --> Conn["Net.Conn session state"]:::data
  Conn --> Packet["protobuf packet"]:::data
  Packet --> Security["AES security"]:::core
  Security --> Reliability["retry + reliability layer"]:::core
  Reliability --> Dispatch["Net.Dispatch handlers"]:::core

  subgraph Services["service layer"]
    Dispatch --> Auth["service token auth"]:::decision
    Auth --> Default["Prism.Service.Default"]:::core
    Auth --> Practice["PracticeService"]:::core
    Practice --> Data[("database")]:::disk
  end

  Dispatch --> Cluster["Net.Cluster OTP broadcast"]:::data
  Cluster -. sync .-> Peer["regional broker peer"]:::edge
  Dispatch --> Metrics["telemetry reporter"]:::data

  classDef core fill:#181716,stroke:#e8c878,color:#f4f1ea;
  classDef data fill:#101820,stroke:#7ab8d9,color:#f4f1ea;
  classDef disk fill:#14120e,stroke:#d9b07a,color:#f4f1ea;
  classDef edge fill:#111114,stroke:#7a766d,color:#c8c2b6;
  classDef decision fill:#201714,stroke:#d97a7a,color:#f4f1ea;`,
  },
  {
    name: "Blink", desc: "Realtime chat widget", tech: "Elixir", year: "2025",
    role: "Author", repo: "github.com/cqdetdev/blink",
    longDesc: "An embeddable realtime chat widget built on Phoenix Channels. A tiny plain-JavaScript widget runs inside Shadow DOM, persists sessions locally, and stores messages in Postgres.",
    highlights: ["~2.1KB gzip widget transfer", "Phoenix Channels over WebSockets", "Shadow DOM host isolation", "Message persistence in Postgres"],
    architecture: `flowchart LR
  Host["host website"]:::edge --> Script["single script tag"]:::core
  Script --> Widget["plain JS widget"]:::core
  Widget --> Shadow["Shadow DOM UI"]:::data
  Widget --> Session["localStorage session"]:::data
  Widget --> Socket["Phoenix Channel WS"]:::core

  subgraph Backend["Phoenix backend"]
    Socket --> Endpoint["channel endpoint"]:::core
    Endpoint --> Project{"project key + origin"}:::decision
    Project --> Messages["message context"]:::core
    Messages --> Repo[("PostgreSQL messages")]:::disk
    Endpoint --> Static["serves widget.js"]:::data
  end

  Repo -. replay .-> Socket

  classDef core fill:#181716,stroke:#e8c878,color:#f4f1ea;
  classDef data fill:#101820,stroke:#7ab8d9,color:#f4f1ea;
  classDef disk fill:#14120e,stroke:#d9b07a,color:#f4f1ea;
  classDef edge fill:#111114,stroke:#7a766d,color:#c8c2b6;
  classDef decision fill:#201714,stroke:#d97a7a,color:#f4f1ea;`,
  },
  {
    name: "board.ly", desc: "CRDT whiteboard", tech: "Rust/SolidJS", year: "2025",
    role: "Author", repo: "github.com/cqdetdev/boardly",
    longDesc: "A collaborative whiteboard built for unreliable connections. Uses CRDTs for conflict-free merging — no operational transform, no central authority. Works offline-first.",
    highlights: ["Offline-first architecture", "CRDT-based conflict resolution", "Rust backend for performance", "Sub-100ms sync latency"],
    architecture: `flowchart LR
  User["pointer / keyboard input"]:::edge --> Canvas["SolidJS canvas UI"]:::core
  Canvas --> Ops["shape operations"]:::data
  Ops --> Doc["local CRDT document"]:::core
  Doc --> Store[("IndexedDB offline store")]:::disk
  Doc --> Sync["WebSocket sync client"]:::core
  Sync --> Server["Rust sync server"]:::core
  Server --> Merge["causal merge engine"]:::core
  Merge --> Broadcast["room broadcast"]:::data
  Broadcast --> PeerA["peer A"]:::edge
  Broadcast --> PeerB["peer B"]:::edge
  PeerA -. ops .-> Merge
  PeerB -. ops .-> Merge

  classDef core fill:#181716,stroke:#e8c878,color:#f4f1ea;
  classDef data fill:#101820,stroke:#7ab8d9,color:#f4f1ea;
  classDef disk fill:#14120e,stroke:#d9b07a,color:#f4f1ea;
  classDef edge fill:#111114,stroke:#7a766d,color:#c8c2b6;`,
  },
  {
    name: "clackcode", desc: "Competitive code typing", tech: "Next.js", year: "2025",
    role: "Author", repo: "github.com/cqdetdev/clackcode",
    longDesc: "Monkeytype, but for real source code. Compete on actual Go, Rust, and TypeScript files. Leaderboards, streaks, and accuracy tracking.",
    highlights: ["Real source code snippets", "Per-language leaderboards", "Streak tracking", "99th percentile: 140+ WPM"],
    architecture: `flowchart TB
  Player["player"]:::edge --> Race["typing race UI"]:::core
  Race --> Timer["keystroke timer"]:::data
  Race --> Diff["code-aware diff"]:::core
  Diff --> Score["WPM + accuracy score"]:::core

  subgraph Content["snippet pipeline"]
    Files["Go / Rust / TS files"]:::edge --> Parser["snippet extractor"]:::core
    Parser --> Pool[("snippet pool")]:::disk
    Pool --> Race
  end

  subgraph Platform["Next.js backend"]
    Score --> API["API routes"]:::core
    API --> DB[("Postgres")]:::disk
    DB --> Board["leaderboards"]:::data
    DB --> Profile["profiles + streaks"]:::data
  end

  Board --> Race
  Profile --> Race

  classDef core fill:#181716,stroke:#e8c878,color:#f4f1ea;
  classDef data fill:#101820,stroke:#7ab8d9,color:#f4f1ea;
  classDef disk fill:#14120e,stroke:#d9b07a,color:#f4f1ea;
  classDef edge fill:#111114,stroke:#7a766d,color:#c8c2b6;`,
  },
  {
    name: "Dragonfly", desc: "Minecraft Bedrock server in Go", tech: "Go", year: "2023 — now",
    role: "Contributor", repo: "github.com/df-mc/dragonfly",
    longDesc: "A high-performance Minecraft Bedrock server written in Go. Contributed to protocol handling, world management, and entity systems across multiple versions.",
    highlights: ["Public Go server library", "Production game server framework", "Full protocol implementation", "Extensible handler architecture"],
    architecture: `flowchart TB
  Main["server bootstrap"]:::edge --> Config["server.Config"]:::core
  Config --> Listen["listener / status"]:::core
  Listen --> Session["session accept loop"]:::core
  Session --> Player["player handler API"]:::core

  subgraph Runtime["server runtime"]
    Player --> World["world engine"]:::core
    World --> Blocks["block + item registries"]:::data
    World --> Entities["entity system"]:::data
    World --> Events["event bus"]:::data
    Player --> Commands["command tree"]:::data
  end

  World --> Provider["world provider"]:::edge
  Session --> Protocol["Bedrock protocol stack"]:::core

  classDef core fill:#181716,stroke:#e8c878,color:#f4f1ea;
  classDef data fill:#101820,stroke:#7ab8d9,color:#f4f1ea;
  classDef edge fill:#111114,stroke:#7a766d,color:#c8c2b6;`,
  },
  {
    name: "gophertunnel", desc: "Bedrock protocol library", tech: "Go", year: "2023 — now",
    role: "Contributor", repo: "github.com/sandertv/gophertunnel",
    longDesc: "The foundational Go library for Minecraft Bedrock protocol. Handles login, encryption, compression, and packet encoding/decoding. Used by dragonfly, tedac, and most Go-based Bedrock tools.",
    highlights: ["300+ stars", "Core protocol library for the ecosystem", "Login & encryption handling", "Used by 50+ downstream projects"],
    architecture: `flowchart LR
  App["proxy / server / client app"]:::edge --> Entry{"Dial or Listen"}:::decision
  Entry --> Listener["minecraft.Listener"]:::core
  Entry --> Dialer["minecraft.Dialer"]:::core
  Listener --> RakNet["RakNet transport"]:::core
  Dialer --> RakNet
  RakNet --> Conn["minecraft.Conn"]:::core

  subgraph Session["Bedrock session"]
    Conn --> Login["login chain + auth"]:::data
    Login --> Crypto["encryption"]:::core
    Crypto --> Compress["compression"]:::core
    Compress --> Codec["packet codec"]:::core
    Codec --> Packets["protocol/packet types"]:::data
  end

  Packets --> Resources["resource packs + game data"]:::data
  Packets --> App

  classDef core fill:#181716,stroke:#e8c878,color:#f4f1ea;
  classDef data fill:#101820,stroke:#7ab8d9,color:#f4f1ea;
  classDef edge fill:#111114,stroke:#7a766d,color:#c8c2b6;
  classDef decision fill:#201714,stroke:#d97a7a,color:#f4f1ea;`,
  },
  {
    name: "Oomph (core)", desc: "Anti-cheat engine internals", tech: "Go", year: "2024 — now",
    role: "Contributor", repo: "github.com/oomph-ac/oomph",
    longDesc: "Core engine contributions to the Oomph anti-cheat — movement simulation, combat analysis heuristics, and detection pipeline improvements.",
    highlights: ["Movement simulation engine", "Combat heuristic tuning", "Detection pipeline optimizations", "False-positive reduction"],
    architecture: `flowchart LR
  Stream["client/server packet stream"]:::edge --> Player["player.Packet handler"]:::core
  Player --> State["player state + world cache"]:::data

  subgraph Movement["movement pipeline"]
    State --> Sim["simulation/movement"]:::core
    Sim --> AckMove["movement acknowledgements"]:::data
    AckMove --> Correction["correction policy"]:::action
  end

  subgraph Combat["combat pipeline"]
    State --> Latency["latency acknowledgements"]:::data
    Latency --> Rewind["entity rewind buffer"]:::core
    Rewind --> Raycast["reach / hit validation"]:::core
    Raycast --> CombatAck["combat component"]:::action
  end

  Correction --> Outcome{"mitigation"}:::decision
  CombatAck --> Outcome
  Outcome -->|pass| Forward["forward packet"]:::edge
  Outcome -->|flag| Alert["detection record"]:::data
  Outcome -->|block| Cancel["cancel or setback"]:::action

  classDef core fill:#181716,stroke:#e8c878,color:#f4f1ea;
  classDef data fill:#101820,stroke:#7ab8d9,color:#f4f1ea;
  classDef action fill:#1b2118,stroke:#7dd87d,color:#f4f1ea;
  classDef edge fill:#111114,stroke:#7a766d,color:#c8c2b6;
  classDef decision fill:#201714,stroke:#d97a7a,color:#f4f1ea;`,
  },
];

const BLOG_POSTS = [
  { title: "How I made LevelDB 13x faster for writes and 70x faster for reads", tag: "Storage", read: "9 min", href: "/blog/leveldb" },
  { title: "My two cents on the Minecraft Bedrock development space", tag: "Opinion", read: "soon", href: "#", comingSoon: true },
  { title: "A pragmatic anti-cheat: heuristics over heroics", tag: "Realtime", read: "soon", href: "#", comingSoon: true },
  { title: "Designing a proxy that survives protocol drift", tag: "Networking", read: "soon", href: "#", comingSoon: true },
];

const STACK_ITEMS = [
  { cat: "languages", items: ["Go", "TypeScript", "Elixir", "Rust", "Python"] },
  { cat: "frameworks", items: ["Next.js", "Phoenix", "SolidJS", "Tailwind"] },
  { cat: "data", items: ["Postgres", "Redis", "Supabase"] },
  { cat: "infra", items: ["AWS", "Cloudflare", "R2", "D1"] },
];

const HEX_RADIUS = 245;
const UNIVERSE_SIZE = 760;

function nodePosition(angle: number, radius: number) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return { x: Math.cos(rad) * radius, y: Math.sin(rad) * radius };
}

export default function HexPage() {
  const [active, setActive] = createSignal<string | null>(null);
  const [transitioning, setTransitioning] = createSignal(false);
  const [entered, setEntered] = createSignal(false);
  const [mousePos, setMousePos] = createSignal({ x: 0, y: 0 });
  const [theme, setTheme] = createSignal<"dark" | "light">("dark");
  const [deepDive, setDeepDive] = createSignal<ProjectFull | null>(null);
  const [worldOffset, setWorldOffset] = createSignal({ x: 0, y: 0 });
  const [pageOffset, setPageOffset] = createSignal({ x: 0, y: 0 });

  const PAGE_DISTANCE = 1400;
  let universeRef: HTMLDivElement | undefined;
  const activeSection = () => SECTIONS.find(s => s.id === active());

  function getCurrentRotation(): number {
    if (!universeRef) return 0;
    const style = window.getComputedStyle(universeRef);
    const matrix = style.transform;
    if (!matrix || matrix === "none") return 0;
    const values = matrix.match(/matrix\(([^)]+)\)/);
    if (!values) return 0;
    const parts = values[1].split(", ");
    return Math.atan2(parseFloat(parts[1]), parseFloat(parts[0])) * (180 / Math.PI);
  }

  const toggleTheme = () => {
    const next = theme() === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
  };

  onMount(() => {
    setTimeout(() => setEntered(true), 100);

    const onMove = (e: MouseEvent) => {
      if (!active()) setMousePos({ x: e.clientX, y: e.clientY });
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (deepDive()) { setDeepDive(null); return; }
        if (active()) goBack();
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("keydown", onKey);
    onCleanup(() => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("keydown", onKey);
    });
  });

  const navigate = (id: string) => {
    if (transitioning()) return;
    setTransitioning(true);

    const section = SECTIONS.find(s => s.id === id);
    if (!section) return;

    const rot = getCurrentRotation();
    const target = nodePosition(section.angle + rot, PAGE_DISTANCE);
    setPageOffset(target);
    setActive(id);

    requestAnimationFrame(() => {
      setWorldOffset({ x: -target.x, y: -target.y });
    });

    setTimeout(() => setTransitioning(false), 1000);
  };

  const goBack = () => {
    if (transitioning()) return;
    setTransitioning(true);
    setWorldOffset({ x: 0, y: 0 });
    setTimeout(() => {
      setActive(null);
      setTransitioning(false);
    }, 900);
  };

  const halfSize = UNIVERSE_SIZE / 2;

  return (
    <main class="hex-shell">
      <Title>cqdetdev — backend portfolio</Title>

      <div class="hex-grain" />
      <div class="hex-glow" style={{ left: `${mousePos().x}px`, top: `${mousePos().y}px` }} />
      <div class="hex-noise" />

      <header class="hex-header">
        <Show when={active()} fallback={<span />}>
          <button class="hex-back mono" onClick={() => { if (deepDive()) setDeepDive(null); else goBack(); }}>
            ← {deepDive() ? "projects" : "back"}
          </button>
        </Show>
        <div class="hex-header__right">
          <button class="theme-toggle mono" onClick={toggleTheme} aria-label="Toggle theme">
            {theme() === "dark" ? "◐" : "◑"}
          </button>
          <span class="hex-header__label mono upper">cqdetdev</span>
        </div>
      </header>

      <div
        class="hex-world"
        style={{
          transform: `translate(${worldOffset().x}px, ${worldOffset().y}px)`,
        }}
      >
        <div
          ref={universeRef}
          class={`hex-universe ${entered() ? "is-entered" : ""}`}
          style={{
            width: `${UNIVERSE_SIZE}px`,
            height: `${UNIVERSE_SIZE}px`,
          }}
        >
          <div class="hex-center">
            <div class="hex-center__ring" />
            <div class="hex-center__ring hex-center__ring--2" />
            <div class="hex-center__ring hex-center__ring--3" />
            <div class="hex-center__core">
              <img src="/avatar.png" alt="cqdetdev" class="hex-center__avatar" />
              <span class="hex-center__name">cqdetdev</span>
              <span class="hex-center__tag serif">builds backends.</span>
            </div>
          </div>

          <For each={SECTIONS}>
            {(section, i) => {
              const pos = nodePosition(section.angle, HEX_RADIUS);
              let bodyRef: HTMLDivElement | undefined;

              const onNodeMove = (e: MouseEvent) => {
                if (!bodyRef) return;
                const rect = bodyRef.getBoundingClientRect();
                const dx = e.clientX - (rect.left + rect.width / 2);
                const dy = e.clientY - (rect.top + rect.height / 2);
                bodyRef.style.setProperty("--mag-x", `${dx * 0.12}px`);
                bodyRef.style.setProperty("--mag-y", `${dy * 0.12}px`);
              };

              const onNodeLeave = () => {
                if (!bodyRef) return;
                bodyRef.style.setProperty("--mag-x", "0px");
                bodyRef.style.setProperty("--mag-y", "0px");
              };

              return (
                <div
                  class="hex-node"
                  style={{
                    "--node-x": `${pos.x}px`,
                    "--node-y": `${pos.y}px`,
                    "--node-color": section.color,
                    "--node-delay": `${i() * 80 + 200}ms`,
                  }}
                  onClick={() => navigate(section.id)}
                  onMouseMove={onNodeMove}
                  onMouseLeave={onNodeLeave}
                >
                  <div class="hex-node__body" ref={bodyRef}>
                    <span class="hex-node__icon mono">{section.icon}</span>
                    <span class="hex-node__label">{section.label}</span>
                    <span class="hex-node__summary">{section.summary}</span>
                  </div>
                </div>
              );
            }}
          </For>

          <svg class="hex-lines" viewBox={`-${halfSize} -${halfSize} ${UNIVERSE_SIZE} ${UNIVERSE_SIZE}`}>
            <defs>
              <For each={SECTIONS}>
                {(section) => {
                  const pos = nodePosition(section.angle, HEX_RADIUS);
                  return <path id={`path-${section.id}`} d={`M 0 0 L ${pos.x} ${pos.y}`} />;
                }}
              </For>
            </defs>
            <For each={SECTIONS}>
              {(section) => {
                const pos = nodePosition(section.angle, HEX_RADIUS);
                return <line class="hex-line" x1="0" y1="0" x2={pos.x} y2={pos.y} stroke={section.color} />;
              }}
            </For>
            <For each={SECTIONS}>
              {(section, i) => {
                const p1 = nodePosition(section.angle, HEX_RADIUS);
                const next = SECTIONS[(i() + 1) % SECTIONS.length];
                const p2 = nodePosition(next.angle, HEX_RADIUS);
                return <line class="hex-edge" x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} />;
              }}
            </For>
            <For each={SECTIONS}>
              {(section, i) => (
                <>
                  <circle class="particle" r="1.5" fill={section.color} opacity="0.4">
                    <animateMotion dur={`${3 + i() * 0.7}s`} repeatCount="indefinite" begin={`${i() * 0.5}s`}>
{/* @ts-ignore */}
                      <mpath href={`#path-${section.id}`} />
                    </animateMotion>
                  </circle>
                  <circle class="particle" r="1" fill={section.color} opacity="0.25">
                    <animateMotion dur={`${4.5 + i() * 0.4}s`} repeatCount="indefinite" begin={`${i() * 0.8 + 1.2}s`}>
{/* @ts-ignore */}
                      <mpath href={`#path-${section.id}`} />
                    </animateMotion>
                  </circle>
                  <circle class="particle particle--return" r="0.8" fill={section.color} opacity="0.2">
                    <animateMotion dur={`${5 + i() * 0.3}s`} repeatCount="indefinite" begin={`${i() * 0.6 + 2}s`} keyPoints="1;0" keyTimes="0;1" calcMode="linear">
{/* @ts-ignore */}
                      <mpath href={`#path-${section.id}`} />
                    </animateMotion>
                  </circle>
                </>
              )}
            </For>
          </svg>
        </div>

        <Show when={active()}>
          <div
            class="hex-page"
            style={{
              left: `calc(50% + ${pageOffset().x}px)`,
              top: `calc(50% + ${pageOffset().y}px)`,
              "--accent": activeSection()?.color ?? "#fff",
            }}
          >
            <div class="hex-page__accent-line" />
            <div class="hex-page__inner">
              <Show when={!deepDive()}>
                <div class="hex-page__header">
                  <span class="hex-page__icon mono" style={{ color: activeSection()?.color }}>{activeSection()?.icon}</span>
                  <h2 class="hex-page__title">{activeSection()?.label}</h2>
                  <span class="hex-page__sub serif">{activeSection()?.summary}</span>
                </div>
              </Show>

              <div class="hex-page__body">
                <Show when={deepDive()} fallback={
                  <>
                    {active() === "work" && <PageWork onSelect={setDeepDive} />}
                    {active() === "stack" && <PageStack />}
                    {active() === "blog" && <PageBlog />}
                    {active() === "now" && <PageNow />}
                    {active() === "about" && <PageAbout />}
                    {active() === "contact" && <PageContact />}
                  </>
                }>
                  <ProjectDeepDive project={deepDive()!} onBack={() => setDeepDive(null)} />
                </Show>
              </div>
            </div>
          </div>
        </Show>
      </div>

    </main>
  );
}

function MermaidDiagram(props: { chart: string }) {
  let ref: HTMLDivElement | undefined;

  onMount(async () => {
    if (!ref) return;
    const mermaid = (await import("mermaid")).default;
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: "strict",
      theme: "base",
      flowchart: {
        curve: "basis",
        padding: 18,
        useMaxWidth: true,
      },
      themeVariables: {
        primaryColor: "#181716",
        primaryTextColor: "#f4f1ea",
        primaryBorderColor: "#e8c878",
        lineColor: "#8a857c",
        secondaryColor: "#101820",
        tertiaryColor: "#0a0a09",
        fontFamily: "JetBrains Mono, monospace",
        fontSize: "13px",
        nodeBorder: "#3a3833",
        mainBkg: "#181716",
        clusterBkg: "#0f0f12",
        clusterBorder: "#3a3833",
        edgeLabelBackground: "#111114",
      },
    });
    const id = `mermaid-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    try {
      const { svg } = await mermaid.render(id, props.chart);
      ref.innerHTML = svg;
    } catch (error) {
      console.error("Unable to render Mermaid diagram", error);
      ref.textContent = "Unable to render architecture diagram.";
      ref.classList.add("mermaid-container--error");
    }
  });

  return <div ref={ref} class="mermaid-container" />;
}

function ProjectDeepDive(props: { project: ProjectFull; onBack: () => void }) {
  const p = () => props.project;
  return (
    <div class="deep-dive">
      <div class="deep-dive__header">
        <div class="deep-dive__meta">
          <span class="deep-dive__role mono upper">{p().role}</span>
          <span class="deep-dive__year mono">{p().year}</span>
        </div>
        <h2 class="deep-dive__name">{p().name}</h2>
        <p class="deep-dive__desc">{p().longDesc}</p>
        <a href={`https://${p().repo}`} target="_blank" rel="noreferrer" class="deep-dive__repo mono">
          {p().repo} ↗
        </a>
      </div>

      <div class="deep-dive__section">
        <h3 class="deep-dive__section-title mono upper">Highlights</h3>
        <div class="deep-dive__highlights">
          <For each={p().highlights}>
            {(h, i) => (
              <div class="deep-dive__highlight" style={{ "--row-delay": `${i() * 60 + 100}ms` }}>
                <span class="deep-dive__highlight-dot" />
                <span>{h}</span>
              </div>
            )}
          </For>
        </div>
      </div>

      <div class="deep-dive__section">
        <h3 class="deep-dive__section-title mono upper">Architecture</h3>
        <MermaidDiagram chart={p().architecture} />
      </div>

      <div class="deep-dive__section">
        <h3 class="deep-dive__section-title mono upper">Tech</h3>
        <span class="deep-dive__tech">{p().tech}</span>
      </div>
    </div>
  );
}

function PageWork(props: { onSelect: (p: ProjectFull) => void }) {
  const authored = () => PROJECTS.filter(p => p.role === "Author");
  const contributed = () => PROJECTS.filter(p => p.role !== "Author");

  return (
    <div class="page-content">
      <div class="work-grid">
        <For each={authored()}>
          {(p, i) => (
            <div class="work-card" style={{ "--row-delay": `${i() * 40 + 50}ms` }} onClick={() => props.onSelect(p)}>
              <div class="work-card__top">
                <span class="work-card__name">{p.name}</span>
                <span class="work-card__tech mono">{p.tech}</span>
              </div>
              <span class="work-card__desc">{p.desc}</span>
            </div>
          )}
        </For>
      </div>
      <div class="work-section-label mono upper">open source contributions</div>
      <div class="work-grid">
        <For each={contributed()}>
          {(p, i) => (
            <div class="work-card work-card--oss" style={{ "--row-delay": `${i() * 40 + 300}ms` }} onClick={() => props.onSelect(p)}>
              <div class="work-card__top">
                <span class="work-card__name">{p.name}</span>
                <span class="work-card__tech mono">{p.tech}</span>
              </div>
              <span class="work-card__desc">{p.desc}</span>
            </div>
          )}
        </For>
      </div>
    </div>
  );
}

function PageStack() {
  return (
    <div class="page-content">
      <div class="page-stack-grid">
        <For each={STACK_ITEMS}>
          {(group, gi) => (
            <div class="page-stack-col" style={{ "--col-delay": `${gi() * 80 + 100}ms` }}>
              <div class="page-stack-col__title mono upper">{group.cat}</div>
              <For each={group.items}>
                {(item, ii) => (
                  <div class="page-stack-item" style={{ "--item-delay": `${gi() * 80 + ii() * 40 + 200}ms` }}>
                    <span class="page-stack-item__num mono">0{ii() + 1}</span>
                    <span>{item}</span>
                  </div>
                )}
              </For>
            </div>
          )}
        </For>
      </div>
    </div>
  );
}

function PageBlog() {
  return (
    <div class="page-content">
      <div class="page-posts">
        <For each={BLOG_POSTS}>
          {(post, i) => (
            <a
              href={post.href}
              class={`page-post ${post.comingSoon ? "page-post--soon" : ""}`}
              style={{ "--row-delay": `${i() * 70 + 100}ms` }}
              onClick={(event) => {
                if (post.comingSoon) event.preventDefault();
              }}
            >
              <div class="page-post__meta">
                <span class="page-post__tag mono upper">{post.tag}</span>
                <span class="page-post__meta-right">
                  <Show when={post.comingSoon}>
                    <span class="page-post__chip mono upper">coming soon</span>
                  </Show>
                  <span class="page-post__read mono">{post.read}</span>
                </span>
              </div>
              <h3 class="page-post__title">{post.title}</h3>
              <div class="page-post__foot">
                <span class="page-post__line" />
                <span class="page-post__arrow">{post.comingSoon ? "..." : "↗"}</span>
              </div>
            </a>
          )}
        </For>
      </div>
    </div>
  );
}

function PageNow() {
  return (
    <div class="page-content">
      <div class="page-now-items">
        <For each={[
          "Optimizing Dragonfly and gophertunnel across protocol handling, hot paths, and server runtime behavior.",
          "Working on board.ly and migrating the backend from Rust to Cloudflare Workers.",
          "Drafting a post on my two cents about the Minecraft Bedrock development space and the problems in it.",
        ]}>
          {(item, i) => (
            <div class="page-now-row" style={{ "--row-delay": `${i() * 70 + 100}ms` }}>
              <span class="page-now-row__num mono">0{i() + 1}</span>
              <span class="page-now-row__text">{item}</span>
            </div>
          )}
        </For>
      </div>
      <div class="page-now-note mono" style={{ "margin-top": "40px", "font-size": "11px", color: "var(--ink-4)" }}>updated weekly</div>
    </div>
  );
}

function PageAbout() {
  return (
    <div class="page-content">
      <div class="page-about">
        <p class="page-about__lead">
          Self-taught developer since 2019, graduating with a Bachelor's in Computer Science.
        </p>
        <p>
          I started by building basic Discord bots before moving heavily into web development and Minecraft server development. That eventually pulled me toward backend and distributed systems work, where most of my current work is in Go and Elixir.
        </p>
        <p>
          I'm an avid user of AI and vibecoding tools, and I'm actively trying to learn how to use them more effectively. I'm also interested in the intersection between medicine and software engineering, especially how better systems can make healthcare easier to access, operate, and improve.
        </p>
      </div>
    </div>
  );
}

function PageContact() {
  return (
    <div class="page-content">
      <div class="page-contact-grid">
        <a href="mailto:cqdetdisc@gmail.com" class="page-contact-card" style={{ "--row-delay": "100ms" }}>
          <span class="page-contact-card__label mono upper">email</span>
          <span class="page-contact-card__value">cqdetdisc@gmail.com</span>
          <span class="page-contact-card__hint">I reply within a day. usually faster.</span>
        </a>
        <a href="https://github.com/cqdetdev" target="_blank" rel="noreferrer" class="page-contact-card" style={{ "--row-delay": "180ms" }}>
          <span class="page-contact-card__label mono upper">github</span>
          <span class="page-contact-card__value">github.com/cqdetdev</span>
          <span class="page-contact-card__hint">everything, more or less, in public.</span>
        </a>
        <a href="https://x.com/cqdetdev" target="_blank" rel="noreferrer" class="page-contact-card" style={{ "--row-delay": "260ms" }}>
          <span class="page-contact-card__label mono upper">x / twitter</span>
          <span class="page-contact-card__value">x.com/cqdetdev</span>
          <span class="page-contact-card__hint">occasional posts. mostly memes.</span>
        </a>
      </div>
    </div>
  );
}
