import Sidebar from '../Components/sidebar.js'

export default function Home() {
  return (
    <div className="flex min-h-screen">
          <Sidebar/>
    <div className="flex-1 min-h-screen items-center justify-center font-sans bg-[#f0e1d1]">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="text-3xl font-semibold leading-10 tracking-tight">
            TEMPORARY HOMEPAGE
          </h1>
        </div>
      </main>
    </div>
    </div>
  );
}