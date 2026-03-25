import type { Post, PostPreview } from "~/libs/types/post";

import { PostContinuation } from "./post-continuation";
import { PostOpeningPanel } from "./post-opening-panel";
import { Previewer } from "./previewer";

type PostPageProps = {
  newerPost?: PostPreview;
  olderPost?: PostPreview;
  post: Post;
};

export function PostPage({ newerPost, olderPost, post }: PostPageProps) {
  const isMarp = post.marp;

  return (
    <article className="-mt-header pb-16 md:pb-24">
      <section className="page-bleed relative overflow-hidden border-b border-black/10 dark:border-white/10">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_14%_20%,rgba(245,158,11,0.18),transparent_22%),radial-gradient(circle_at_84%_18%,rgba(217,119,6,0.14),transparent_22%),linear-gradient(180deg,#f7f1e6_0%,#fbf8f2_46%,#ffffff_100%)] dark:bg-[radial-gradient(circle_at_14%_20%,rgba(251,191,36,0.09),transparent_24%),radial-gradient(circle_at_84%_18%,rgba(249,115,22,0.08),transparent_24%),linear-gradient(180deg,#141416_0%,#0e0e10_48%,#09090b_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(255,255,255,0.08)_0,rgba(255,255,255,0.08)_1px,transparent_1px,transparent_100%)] bg-[length:26px_26px] opacity-35 dark:opacity-10" />

        <div className="container relative px-4 pb-10 pt-[calc(var(--spacing-header)_+_1.5rem)] sm:px-6 md:pb-14 lg:px-8 lg:pt-[calc(var(--spacing-header)_+_2.25rem)]">
          <PostOpeningPanel post={post} />
        </div>
      </section>

      <section className="page-bleed border-b border-black/10 bg-[#f4ede1] dark:border-white/10 dark:bg-[#101013]">
        <div className="container grid gap-3 px-4 py-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-black/42 dark:text-white/40 md:grid-cols-[minmax(0,1fr)_auto_auto] md:items-center sm:px-6 lg:px-8">
          <span>Transition band / reading field</span>
          <span>{isMarp ? "Slide deck" : "Long-form note"}</span>
          <span>{post.date}</span>
        </div>
      </section>

      <section className="container px-4 py-10 sm:px-6 md:py-14 lg:px-8">
        {isMarp ? (
          <div className="rounded-[1.75rem] border border-black/10 bg-white/50 p-4 dark:border-white/10 dark:bg-white/[0.04] md:p-6">
            <Previewer className="signal-ledger-marp" isMarp post={post} />
          </div>
        ) : (
          <div className="grid gap-10 xl:grid-cols-[minmax(0,3.5rem)_minmax(0,48rem)_minmax(0,1fr)] xl:gap-12">
            <div className="hidden xl:block" />

            <div className="signal-ledger-body heti">
              <Previewer className="signal-ledger-article" post={post} />
            </div>

            <aside className="hidden xl:block">
              <div className="sticky top-[calc(var(--spacing-header)_+_2rem)] space-y-4 border-l border-black/10 pl-6 text-sm leading-7 text-black/56 dark:border-white/10 dark:text-white/54">
                <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-black/42 dark:text-white/40">
                  Reading note
                </div>
                <p>
                  The opening panel carries the visual weight. The body tightens
                  into a quieter field so the long-form note stays legible.
                </p>
              </div>
            </aside>
          </div>
        )}
      </section>

      <PostContinuation newerPost={newerPost} olderPost={olderPost} />
    </article>
  );
}
