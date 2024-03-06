export default function About() {
  return (
    <main>
      <div className="w-full">
        <div className="flex flex-col items-center justify-center py-3 py-3">
          <div
            className="bg-gray-200 mb-3"
            style={{ fontSize: "250%", fontWeight: "bold" }}
          >
            <h1>About Ecologistics</h1>
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
      </div>
    </main>
  );
}
