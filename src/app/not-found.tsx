import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-32 text-center text-[#111311]">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#008877]">404 / Not Found</p>
      <h1
        className="mt-6 text-4xl font-normal leading-snug sm:text-5xl"
        style={{ fontFamily: '"Shippori Mincho", serif', textWrap: "balance" }}
      >
        その具材は、まだ入っていません。
      </h1>
      <p className="mt-6 max-w-xl leading-loose text-gray-600">
        お探しのページは見つかりませんでした。アドレスが変わったか、まだ準備中のページかもしれません。
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link href="/" className="inline-flex min-h-11 items-center rounded-full bg-[#111311] px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-[#008877]">
          トップへ戻る
        </Link>
        <Link href="/works" className="inline-flex min-h-11 items-center rounded-full border border-[#111311] px-5 py-2 text-sm font-bold transition-colors hover:bg-gray-50">
          Worksを見る
        </Link>
      </div>
    </main>
  );
}
