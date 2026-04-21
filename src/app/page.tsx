import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen p-24">
      {/* Testing the Tonal Lift and Surface-lowest card */}
      <div className="bg-surface-container-lowest shadow-tonal-lift p-8 rounded-xl">
        <h1 className="text-primary text-4xl font-bold">
          Digital Curator Test
        </h1>
        <p className="text-on-surface-variant mt-4">
          If this text is dark grey and the heading is blue, your config is live.
        </p>
        <button className="primary-gradient text-white px-6 py-2 rounded-xl mt-6">
          Premium CTA
        </button>
      </div>
    </main>
  );
}
