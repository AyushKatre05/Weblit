import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6 text-white">
      <section className="flex flex-col items-center justify-center text-center py-24 px-6">
        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-pink-300">Weblit</span>
        </h1>
        <p className="text-lg max-w-2xl leading-relaxed text-white/90 mb-8">
          The ultimate online editor for HTML, CSS, and JavaScript. Instantly preview, collaborate, and unleash your web creativity.
        </p>
        <Link href="/login">
          <button className="bg-white cursor-pointer text-indigo-700 font-bold px-10 py-4 rounded-full shadow-xl hover:bg-indigo-100 transition duration-300">
            Login to Start Creating
          </button>
        </Link>
      </section>

      <section className="bg-white text-gray-800 py-20 px-8 rounded-t-3xl shadow-inner">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12 text-center">
          <div>
            <h3 className="text-2xl font-bold mb-2">Live Preview</h3>
            <p>Instant feedback as you type HTML, CSS, and JS. See your changes immediately.</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2">Collaboration Ready</h3>
            <p>Work with friends or teammates in real-time. Code together from anywhere.</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2">Simple & Fast</h3>
            <p>A distraction-free interface that keeps you focused and productive.</p>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 text-gray-800 py-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Why Choose Weblit?</h2>
          <p className="mb-4">
            Whether you're learning to code or rapidly prototyping a new UI, Weblit provides the tools and environment you need. It's perfect for students, developers, designers, and anyone who wants to bring their web ideas to life.
          </p>
          <p>
            No setup required. Just open Weblit and start coding. It's that easy.
          </p>
        </div>
      </section>

      <footer className="text-center py-6 text-sm text-white/80">
        &copy; {new Date().getFullYear()} Weblit. All rights reserved.
      </footer>
    </main>
  );
}
