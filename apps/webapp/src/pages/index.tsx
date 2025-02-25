export default function Index() {
  return (
    <div className="text-center">
      <h1 className="text-2xl">Hi, there. 👋</h1>
      <div className="flex">
        username: <input className="w-full" />
      </div>
      <div className="flex">
        message: <input className="w-full" />
      </div>
    </div>
  );
}
