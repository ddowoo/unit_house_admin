function Card(props: { title: string; price: number }) {
  const { title, price } = props;

  return (
    <div className="flex-1 mx-3 p-4 rounded-md bg-neutral-700 hover:scale-110 transition-all shadow-lg flex flex-col items-start">
      <p className="font-bold mb-2">{title}</p>
      <p className="font-basic text-2xl	">{Number(price).toLocaleString()}원</p>
    </div>
  );
}

export default Card;
