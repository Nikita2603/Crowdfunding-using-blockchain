import { useRouter } from "next/router";
import { ConnectButton } from "@rainbow-me/rainbowkit";



export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      {/* NAVBAR */}
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">
            Crowd<span className="text-green-600">Fund</span>
          </h1>

          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <button onClick={() => router.push("/explore")}>Discover</button>
            <button onClick={() => router.push("/start")}>Start a project</button>
            <button onClick={() => router.push("/login")}>Log in</button>
          </nav>

          <ConnectButton />
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-5xl font-semibold tracking-tight mb-6">
          Bring your creative projects to life
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10 text-lg">
          A decentralized crowdfunding platform where creators and backers
          connect directly — transparent, secure, and global.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => router.push("/explore")}
            className="bg-green-600 text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-green-700"
          >
            Explore projects
          </button>

          <button
            onClick={() => router.push("/start")}
            className="border px-8 py-3 rounded-full text-sm font-medium hover:bg-gray-100"
          >
            Start a project
          </button>
        </div>
      </section>

      {/* FEATURE STRIP */}
      <section className="bg-gray-50 py-14">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center">
          <div>
            <h3 className="font-semibold mb-2">🌍 Global Reach</h3>
            <p className="text-gray-600 text-sm">
              Connect with backers across the world.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">🔐 Blockchain Secure</h3>
            <p className="text-gray-600 text-sm">
              Smart contracts ensure full transparency.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">🚀 Creator First</h3>
            <p className="text-gray-600 text-sm">
              No middlemen. You own your project.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t py-10 text-center text-sm text-gray-500">
        © 2025 CrowdFund — Decentralized Crowdfunding Platform
      </footer>
    </div>
  );
}
