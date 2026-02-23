export default function ProjectCard({ title, author, days, funded, img }) {
  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-md transition">
      <img src={img} className="h-48 w-full object-cover" />

      <div className="p-4">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">{author}</p>

        <div className="mt-3 text-sm text-gray-600">
          ⏱ {days} days left · 💚 {funded}% funded
        </div>
      </div>
    </div>
  );
}
