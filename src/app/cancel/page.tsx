import React from "react";

const CancelPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Payment failed/canceled.</h1>
      <p>Your payment was not completed. Please try again or contact support.</p>
    </div>
  );
};

export default CancelPage;
