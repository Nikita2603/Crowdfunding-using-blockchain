import Navbar from "../components/navbar";
import ProjectCard from "../components/ProjectCard";

export default function Explore() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="text-center py-16 bg-gray-50">
        <h1 className="text-4xl font-light">
          Bring a creative project to life.
        </h1>
      </section>

      {/* Projects */}
      <section className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="md:col-span-2">
          <h2 className="font-semibold mb-4">FEATURED PROJECT</h2>
          <ProjectCard
            title="Adapt to Chaos"
            author="Rhino Rdy"
            days={21}
            funded={572}
            img="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
          />
        </div>

        <div>
          <h2 className="font-semibold mb-4">RECOMMENDED FOR YOU</h2>
          <div className="space-y-6">
            <ProjectCard
              title="Pavo | Intelligent Pilates Reformer"
              author="pavofitness"
              days={38}
              funded={5261}
              img="https://images.unsplash.com/photo-1584735175315-9d5df23860e6"
            />
            <ProjectCard
              title="Glow-in-the-dark Wormhole Marbles"
              author="Tyler Kathol"
              days={3}
              funded={3641}
              img="https://images.unsplash.com/photo-1523413651479-597eb2da0ad6"
            />
          </div>
        </div>

      </section>
    </>
  );
}
