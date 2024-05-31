"use client";

import { NoDataCard } from "@/components/NoDataCard";
import useApiRequest from "@/hooks/useApiRequest";
import { useEffect, useState } from "react";

export default function ConversationHistory() {
  const { loading, error, makeRequest } = useApiRequest();
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    // const data = await makeRequest("/feedbacks", "GET");
    setFeedbacks([]);
  };

  return (
    <div className="main-content flex flex-col flex-grow p-4">
      {loading ? (
        <div>Loading</div>
      ) : error ? (
        <div>Error</div>
      ) : !feedbacks?.length ? (
        <div className="m-auto">
          <NoDataCard
            image="/no-feedback.png"
            title="No feedback found"
            desc="To have feedbacks, users or customers must interact with the chatbot. Interactions initiate sessions and enable personalized conversations."
          ></NoDataCard>
        </div>
      ) : (
        <div>Feedback List</div>
      )}
    </div>
  );
}
