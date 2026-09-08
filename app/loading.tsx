export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 border-2 border-green border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-slate-400">Načítám...</p>
      </div>
    </div>
  );
}
