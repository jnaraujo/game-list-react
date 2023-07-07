export default function CardSkeleton() {
  return (
    <div className="relative flex h-[200px] w-full animate-pulse overflow-hidden rounded-lg bg-white shadow-md md:h-[400px] md:flex-col">
      <div className="h-full w-28 shrink-0 bg-zinc-300 md:h-56 md:w-full" />
      <div className="flex flex-1 flex-col justify-between p-2">
        <div>
          <div className="h-3 w-16 bg-zinc-300" />
          <div className="mt-1 h-6 w-44 bg-zinc-300" />
          <div className="mt-1 h-16 bg-zinc-300" />
        </div>

        <div className="mt-2 h-8 rounded-lg bg-zinc-300" />
      </div>
    </div>
  )
}
