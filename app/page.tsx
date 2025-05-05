import News from "@/components/News";

export default function HomePage() {
  return (
    <div className="p-4">
      <h3 className="text-2xl text-black">Novinky</h3>
      <News displayItemsCount={3} />
    </div>
  );
}
