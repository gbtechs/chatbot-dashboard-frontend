import { Card } from "@/components/Card";

export default function Home() {
  return (
    <div className="main-content flex flex-col flex-grow p-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="">
            <Card title="Total Conversations">
              <h2 className="color-blue mt-2 pb-0">1890.92</h2>
            </Card>
          </div>

          <div className="">
            <Card title="Average time of conversation">
              <h2 className="color-blue mt-2 pb-0">1890.92</h2>
            </Card>
          </div>

          <div className="">
            <Card title="New Leads">
              <h2 className="color-blue mt-2 pb-0">1890.92</h2>
            </Card>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <Card
          title="Conversations / Date"
          desc="Data is sorted based on the date when the conversations were created."
        >
          <div className="h-[300px] border-4 border-gray-400 border-dashed bg-white rounded mt-3"></div>
        </Card>
      </div>

      <div className="mt-4">
        <Card
          title="Conversations / Time"
          desc="Data is sorted based on the time when the conversations were created."
        >
          <div className="h-[300px] border-4 border-gray-400 border-dashed bg-white rounded mt-3"></div>
        </Card>
      </div>
    </div>
  );
}
