import React from "react";

const TailwindTest = () => {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-center text-indigo-600">Tailwind CSS is Working!</h1>
      <div className="mt-6 p-4 bg-indigo-100 rounded-lg shadow-lg">
        <p className="text-lg text-gray-800">This is a test of Tailwind's utility classes.</p>
      </div>
    </div>
  );
};

export default TailwindTest;
