export default function Card({ title, children, actions }: any){
  return (
    <div className="bg-white rounded border p-4 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div>{actions}</div>
      </div>
      <div>{children}</div>
    </div>
  )
}
