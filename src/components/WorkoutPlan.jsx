import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWorkoutPlan, clearPlan } from "../redux/planSlice";

const WorkoutPlan = () => {
  const dispatch = useDispatch();
  const { plan, loading, error } = useSelector((state) => state.plan);

  useEffect(() => {
    dispatch(fetchWorkoutPlan("Muscle gain, 7 days, PPL split"));

    return () => {
      dispatch(clearPlan());
    };
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Workout Plan</h2>
      <pre>{JSON.stringify(plan, null, 2)}</pre>
    </div>
  );
};

export default WorkoutPlan;
