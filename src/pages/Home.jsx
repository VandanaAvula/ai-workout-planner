import { useState, useEffect } from "react";
import { generateWorkoutPlan } from "../api/aiService";
import { useDispatch, useSelector } from "react-redux";
import PlanCard from "../components/PlanCard";
import Loader from "../components/Loader";
import { fetchWorkoutPlan } from "../redux/planSlice";
import {clearPlan} from "../redux/planSlice";
// import addPlan from "../redux/planSlice";

export default function Home() {
  const [goal, setGoal] = useState("");
  const dispatch = useDispatch();
  const data = useSelector((state) => state.plan);

  const handleGenerate = () => {
    if (!goal) return;
    dispatch(fetchWorkoutPlan(goal));

  };
  const clearPlaning= ()=>{
    dispatch(clearPlan());
  }

  useEffect(() => {
    if (data.plan) {
      document.querySelector(".plan-card")?.focus();
    }
  }, [data.plan]);

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 bg-white rounded shadow">
      <input
        className="w-full p-2 border border-gray-300 rounded mb-4"
        placeholder="Enter your goal (e.g., muscle gain)"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        aria-label="Workout goal input"
      />

      <div className="flex gap-4 mb-4 flex-grow ">
      <button
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        onClick={handleGenerate}
      >
        Generate Plan
      </button>


      <button
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        onClick={clearPlaning}
      >
        Clear Plan
      </button>
      </div>

      {data.loading && <Loader />}
      {data.plan && <PlanCard text={data.plan} />}
    </div>
  );
}
