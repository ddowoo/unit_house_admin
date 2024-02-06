function Header() {
  return (
    <header>
      <div className="max-w-screen-2xl m-auto flex justify-between py-4 px-4">
        <h1 className="text-lg font-bold">다가구 주택 관리</h1>
        <div className="flex">
          <button className="mx-2">버튼</button>
          <button className="mx-2">버튼</button>
          <button className="mx-2">버튼</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
