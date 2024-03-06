export default function About() {
  return (
    <div className="flex flex-col w-full items-center justify-center py-3 py-3 gap-3">
      <div className="bg-gray-200 w-full p-3 text-center rounded-lg">
        <h1 className="text-5xl font-bold">
          About the Ecologistics Web Scraper
        </h1>
      </div>

      <div className="mb-3">
        <h2>Data Source #1</h2>
        <h2>Data Source #2</h2>
        <h2>Data Source #3</h2>
      </div>

      <div className="mb -3">
        <p>information on how to use each source</p>
      </div>
    </div>
  );
}
