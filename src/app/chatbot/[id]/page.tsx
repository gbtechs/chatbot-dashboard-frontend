"use client";

// import { Layout } from "@/components/Layout";

export default function Chatbot({ params }: { params: { id: Number } }) {
  return (
    <div className="chat-font">
      Hello {params.id.toString()}
      {/* <Layout chatBotId={parseInt(params.id.toString())}></Layout> */}
    </div>
  );
}
