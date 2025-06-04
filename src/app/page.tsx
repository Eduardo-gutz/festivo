import Sidebar from "@/components/editor/Sidebar";
import Canvas from "@/components/editor/Canvas";

export default function Home() {
  return (
    <div className="bg-page flex min-h-screen">
      <Sidebar />
      <main className="flex flex-1 items-center justify-center p-6">
        <Canvas />
      </main>
    </div>
  );
}
