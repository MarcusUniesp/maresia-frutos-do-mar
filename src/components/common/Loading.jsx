export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-areia/30">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-teal-petroleo border-t-transparent"></div>
        <p className="mt-4 text-tinta font-medium">Carregando...</p>
      </div>
    </div>
  );
}
