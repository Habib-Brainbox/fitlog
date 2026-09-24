"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import toast from "react-hot-toast";

export const MAX_PLAN = 5;

type PlanContextType = {
  planIds: number[];
  savedIds: number[];
  doneIds: number[];
  addToPlan: (id: number) => void;
  saveForLater: (id: number) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  markDone: (id: number) => void;
};

const PlanContext = createContext<PlanContextType | null>(null);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [planIds, setPlanIds] = useState<number[]>([]);
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [doneIds, setDoneIds] = useState<number[]>([]);
  const [loaded, setLoaded] = useState(false);

  // load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("fitlog-state");
      if (raw) {
        const data = JSON.parse(raw);
        setPlanIds(data.planIds || []);
        setSavedIds(data.savedIds || []);
        setDoneIds(data.doneIds || []);
      }
    } catch {}
    setLoaded(true);
  }, []);

  // save to localStorage
  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(
      "fitlog-state",
      JSON.stringify({ planIds, savedIds, doneIds })
    );
  }, [planIds, savedIds, doneIds, loaded]);

  const addToPlan = (id: number) => {
    if (planIds.includes(id)) {
      toast.error("Already in today's plan");
      return;
    }
    if (planIds.length >= MAX_PLAN) {
      toast.error("Plan is full (max 5 lifts)");
      return;
    }
    setPlanIds([...planIds, id]);
    toast.success("Added to today's plan");
  };

  const saveForLater = (id: number) => {
    if (savedIds.includes(id)) {
      toast.error("Already saved");
      return;
    }
    setSavedIds([...savedIds, id]);
    toast.success("Saved for later");
  };

  const removeFromPlan = (id: number) => {
    setPlanIds(planIds.filter((x) => x !== id));
    setDoneIds(doneIds.filter((x) => x !== id));
    toast.success("Removed from today's plan");
  };

  const removeFromSaved = (id: number) => {
    setSavedIds(savedIds.filter((x) => x !== id));
    toast.success("Removed from saved");
  };

  const markDone = (id: number) => {
    if (doneIds.includes(id)) {
      toast.error("Already marked as done");
      return;
    }
    setDoneIds([...doneIds, id]);
    toast.success("Workout marked as done");
  };

  return (
    <PlanContext.Provider
      value={{
        planIds,
        savedIds,
        doneIds,
        addToPlan,
        saveForLater,
        removeFromPlan,
        removeFromSaved,
        markDone,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used inside PlanProvider");
  return ctx;
}