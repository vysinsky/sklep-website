import News from "@/components/News";

export const metadata = {
  title: "Novinky",
};

export default function NewsListPage() {
  return (
    <div className="p-4">
      <h3 className="text-2xl text-black">Novinky</h3>
      <News />
    </div>
  );
}
