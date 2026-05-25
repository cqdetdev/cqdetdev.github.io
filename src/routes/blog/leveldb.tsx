import { Title, Meta, Link } from "@solidjs/meta";
import "../../styles/hex.css";

export default function LevelDBPost() {
  const title = "How I made LevelDB 13x faster for writes and 70x faster for reads";
  const description = "BlazeDB is a Bedrock-focused storage engine that beats LevelDB by matching Minecraft's chunk workload: append-only writes, Z-order spatial locality, and hot chunk caching.";
  const url = "https://cqdetdev.github.io/blog/leveldb";

  return (
    <main class="portfolio-shell">
      <Title>{title} - cqdetdev</Title>
      <Meta name="description" content={description} />
      <Meta property="og:type" content="article" />
      <Meta property="og:site_name" content="cqdetdev" />
      <Meta property="og:title" content={title} />
      <Meta property="og:description" content={description} />
      <Meta property="og:url" content={url} />
      <Meta property="og:image" content="https://cqdetdev.github.io/avatar.png" />
      <Meta property="og:image:alt" content="cqdetdev profile picture" />
      <Meta property="article:published_time" content="2026-04-18" />
      <Meta property="article:author" content="cqdetdev" />
      <Meta name="twitter:card" content="summary" />
      <Meta name="twitter:title" content={title} />
      <Meta name="twitter:description" content={description} />
      <Meta name="twitter:image" content="https://cqdetdev.github.io/avatar.png" />
      <Link rel="canonical" href={url} />
      <article class="blog-post">
        <header class="blog-post__header">
          <a href="/" class="blog-post__back mono upper">{"<- back"}</a>
          <div class="blog-post__meta mono upper">
            <span>2026.04.18</span>
            <span class="hairline hairline--wide" />
            <span>Storage - 9 min read</span>
          </div>
          <h1 class="blog-post__title">{title}</h1>
          <p class="blog-post__subtitle">
            BlazeDB is a storage engine built around the way Minecraft actually reads and writes chunks, and that
            workload-specific shape is where the wins come from.
          </p>
        </header>

        <div class="blog-post__body">
          <section>
            <h2>The problem with LevelDB</h2>
            <p>
              <a href="https://github.com/google/leveldb" target="_blank" rel="noreferrer">
                LevelDB
              </a>{" "}
              is a fast key-value storage library created at Google and already publicly benchmarked in 2011. It was
              designed as an ordered string-to-string map with efficient writes, snapshots, iteration, compression, and
              background compaction.
            </p>
            <p>
              Minecraft Bedrock leaned on LevelDB because it was already native C++, portable across operating
              systems, and one of the best practical storage choices available when Bedrock needed consistent world
              saves. Unlike Java's Anvil region-file format, Bedrock could use a system-agnostic embedded database with
              better behavior for frequent large write batches. It made sense: chunks are persisted constantly, worlds
              get large, and a small embedded database is much easier to ship than a custom storage engine.
            </p>
            <p>
              The strength that makes LevelDB good for broad workloads is also where Bedrock servers feel pain:
              compaction. When the LSM tree is below compaction pressure, writes are fast. As files accumulate and
              thresholds are hit, background work starts rewriting data, and that extra I/O shows up as write spikes.
              Large worlds make this worse because chunk writes are bursty, not uniform. Players move, arenas reset,
              explosions happen, and autosaves bunch work into uneven waves.
            </p>
            <p>
              The other problem is layout. Minecraft wants chunks near the player before almost anything else because
              rendering and simulation are spatial. LevelDB stores keys in sorted byte order. That lexicographic order
              is correct for a general key-value database, but it does not naturally mean "nearby in the world." A
              storage engine can spend time walking data that is sorted correctly as bytes but poorly arranged for the
              way the game needs to access it.
            </p>
          </section>

          <section>
            <h2>What BlazeDB does differently</h2>
            <p>
              BlazeDB is the specialized answer to those two mismatches: compaction pressure and missing spatial
              locality. Three design choices account for most of the improvement:
            </p>
            <ol>
              <li>
                <strong>Append-only chunk storage.</strong> Chunk records are encoded, compressed, and appended to{" "}
                <code>chunks.dat</code>. The write path avoids random rewrites during gameplay, so the hot path is
                sequential I/O rather than compaction-heavy LSM maintenance.
              </li>
              <li>
                <strong>Z-order spatial indexing.</strong> BlazeDB maps chunk X/Z coordinates through a Morton curve,
                then stores offsets in a spatial index. Nearby chunks become nearby in the index, which lines disk
                access up with how players actually load areas.
              </li>
              <li>
                <strong>Workload-aware cache and provider APIs.</strong> A sharded LRU cache keeps hot chunks in
                memory, async writes keep the server thread from waiting on ordinary flushes, and overlay, delta,
                pinned-area, and segmented providers handle arenas, resets, and small block mutations without forcing
                every edit through a full world-save pattern.
              </li>
            </ol>
          </section>

          <section>
            <h2>The tradeoff</h2>
            <p>
              The critical drawback is RAM usage. BlazeDB deliberately keeps more operational data in memory: the
              spatial index, sharded hot-chunk cache, negative miss cache, pinned areas, and in some modes recently
              encoded records used to skip unchanged saves.
            </p>
            <p>
              That is not free. The point is that memory is usually the right place to spend budget for active Bedrock
              worlds. If the storage engine can avoid unnecessary disk seeks, avoid repeated decompression, skip
              unchanged records, and keep nearby chunks hot, the extra memory buys smoother chunk saves and fewer
              visible latency spikes.
            </p>
          </section>

          <section>
            <h2>Benchmarks</h2>
            <p>
              These are the current benchmark rows from the BlazeDB repo. Lower is better; allocation numbers are per
              operation.
            </p>
            <div class="blog-post__bench">
              <div class="bench-row bench-row--header bench-row--six">
                <span>Workload</span>
                <span>BlazeDB</span>
                <span>LevelDB</span>
                <span>Speedup</span>
                <span>Blaze alloc</span>
                <span>LevelDB alloc</span>
              </div>
              <div class="bench-row bench-row--six">
                <span>Hot cached chunk load</span>
                <span>~82.9 ns/op</span>
                <span>~43.8 us/op</span>
                <span>~529x</span>
                <span>0 B</span>
                <span>~15.6 KB</span>
              </div>
              <div class="bench-row bench-row--six">
                <span>Store chunk, default LZ4</span>
                <span>~4.2 us/op</span>
                <span>~74.8 us/op</span>
                <span>~18x</span>
                <span>~2.8 KB</span>
                <span>~15.6 KB</span>
              </div>
              <div class="bench-row bench-row--six">
                <span>Repeated unchanged save</span>
                <span>~5.47 us/op</span>
                <span>~55.8 us/op</span>
                <span>~10x</span>
                <span>~2.1 KB</span>
                <span>~17.3 KB</span>
              </div>
              <div class="bench-row bench-row--six">
                <span>Reopened tiny-cache load</span>
                <span>~26.9 us/op</span>
                <span>~1.93 ms/op</span>
                <span>~72x</span>
                <span>~12.2 KB</span>
                <span>~734 KB</span>
              </div>
              <div class="bench-row bench-row--six">
                <span>Reopened 11x11 area</span>
                <span>~3.21 ms/op</span>
                <span>~236.6 ms/op</span>
                <span>~74x</span>
                <span>~1.48 MB</span>
                <span>~86.2 MB</span>
              </div>
              <div class="bench-row bench-row--six">
                <span>Dense chunk store</span>
                <span>~11.2 us/op</span>
                <span>~166.4 us/op</span>
                <span>~15x</span>
                <span>~15.4 KB</span>
                <span>~48.0 KB</span>
              </div>
              <div class="bench-row bench-row--six">
                <span>Dense reopened load</span>
                <span>~84.0 us/op</span>
                <span>~1.48 ms/op</span>
                <span>~18x</span>
                <span>~28.1 KB</span>
                <span>~637 KB</span>
              </div>
            </div>
            <p>
              The biggest wins come from making the storage model match the workload. Hot chunk reads become memory
              lookups, unchanged saves can skip appending, and reopened area loads benefit from spatial indexing
              instead of byte-order key locality.
            </p>
          </section>

          <section>
            <h2>What's next</h2>
            <p>
              The APIs worth exploring next are the ones that make the game-server workload even more explicit:
              dirty-chunk adapters for Dragonfly handlers, arena lease cleanup for overlay providers, region-level
              compaction scheduling for segmented providers, and metrics hooks for cache pressure, delta records, and
              per-segment write pressure.
            </p>
          </section>
        </div>

        <footer class="blog-post__footer">
          <a href="/" class="blog-post__back mono upper">{"<- back to portfolio"}</a>
        </footer>
      </article>
    </main>
  );
}
