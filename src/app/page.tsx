export default function Home() {
  return (
    <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
      <div className="main-content flex flex-col flex-grow p-4">
        <h1 className="font-bold text-2xl text-gray-700">Dashboard</h1>

        <div className="flex flex-col flex-grow border-4 border-gray-400 border-dashed bg-white rounded mt-4"></div>
      </div>
      {/* <footer className="footer px-4 py-6">
        <div className="footer-content">
          <p className="text-sm text-gray-600 text-center">
            © Brandname 2020. All rights reserved.{" "}
            <a href="https://twitter.com/iaminos">by iAmine</a>
          </p>
        </div>
      </footer> */}
    </main>
  );
}
