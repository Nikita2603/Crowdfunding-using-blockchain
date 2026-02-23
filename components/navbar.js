export default function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <h1 className="text-green-600 font-bold text-2xl">
          KICKSTARTER
        </h1>

        {/* Search */}
        <input
          type="text"
          placeholder="Search projects, creators, and categories"
          className="hidden md:block w-1/2 border rounded-full px-4 py-2 focus:outline-none"
        />

        {/* Right buttons */}
        <div className="flex gap-4 items-center">
          <button className="border px-4 py-2 rounded-md">
            For creators
          </button>
          <button className="text-gray-700">
            Log in
          </button>
        </div>

      </div>

      {/* Categories */}
      <div className="border-t text-sm">
        <div className="max-w-7xl mx-auto px-6 py-2 flex gap-6 overflow-x-auto">
          {[
            "Art","Comics","Crafts","Design","Fashion","Film",
            "Food","Games","Music","Photography","Technology"
          ].map((cat) => (
            <span key={cat} className="whitespace-nowrap cursor-pointer hover:underline">
              {cat}
            </span>
          ))}
        </div>
      </div>
    </nav>
  );
}
