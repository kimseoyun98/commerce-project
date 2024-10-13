"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCounterStore } from "./store/counterStore";

// 카운터 데이터의 타입 정의
export interface CounterData {
  count: number; // 카운터의 값
}

export default function Home() {
  const queryClient = useQueryClient();
  const { count, increment, decrement } = useCounterStore();

  // 카운터 데이터 미리 가져오기
  const { data, error, isLoading } = useQuery({
    queryKey: ["count"], // 쿼리 키를 객체 형태로 지정
    queryFn: async () => {
      const res = await fetch("http://localhost:4000/count");
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      return { count: data.count }; // count 값을 포함한 객체로 반환
    },
  });

  const handleIncrement = async () => {
    increment(); // Zustand 상태 업데이트
    try {
      const response = await fetch("http://localhost:4000/count", {
        method: "PATCH",
        body: JSON.stringify({ count: count + 1 }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to update count");
      queryClient.invalidateQueries({ queryKey: ["count"] }); // 쿼리 무효화 시 객체 형태로 전달
    } catch (error) {
      console.error("Error updating count:", error);
    }
  };

  const handleDecrement = async () => {
    decrement(); // Zustand 상태 업데이트
    try {
      const response = await fetch("http://localhost:4000/count", {
        method: "PATCH",
        body: JSON.stringify({ count: count - 1 }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to update count");
      queryClient.invalidateQueries({ queryKey: ["count"] }); // 쿼리 무효화 시 객체 형태로 전달
    } catch (error) {
      console.error("Error updating count:", error);
    }
  };

  // 로딩 상태 처리
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col justify-center items-center gap-10 mt-10">
      <h1>Counter: {data?.count ?? count}</h1> {/* data의 count 값 사용 */}
      <div className="flex flex-row gap-4">
        <button
          className="bg-gray-800 border border-gray-500 px-4 rounded hover:bg-gray-500 hover:border-gray-200"
          onClick={handleIncrement}
        >
          증가
        </button>
        <button
          className="bg-gray-800 border border-gray-500 px-4 rounded hover:bg-gray-500 hover:border-gray-200"
          onClick={handleDecrement}
        >
          감소
        </button>
      </div>
    </div>
  );
}
