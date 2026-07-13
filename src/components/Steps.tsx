import { useEffect, useState } from "react";
import { getMetaData } from "../services/apiMeta";
import type { MetaType } from "../types/meta.type";

import SensorIcon from "../assets/icons/sensor.svg?react";
import CameraIcon from "../assets/icons/camera.svg?react";
import PlanIcon from "../assets/icons/shield.svg?react";
import KeyPadIcon from "../assets/icons/keypad.svg?react";
import StepInfo from "./StepInfo";

export default function Steps() {
  const [meta, setMeta] = useState<null | MetaType>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    async function fetchMeta() {
      try {
        setIsLoading(() => true);
        const data = await getMetaData();
        console.log(data);
        setMeta(() => data);
      } catch (err) {
        setError(() => "Failed to fetch meta data...");
        console.error(err);
      } finally {
        setIsLoading(() => false);
      }
    }

    fetchMeta();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const stepsArr = meta?.steps.map((step, idx) => {
    switch (step.category) {
      case "Cameras":
        return { ...step, index: idx + 1, icon: CameraIcon };
      case "Sensors":
        return { ...step, index: idx + 1, icon: SensorIcon };
      case "Plan":
        return { ...step, index: idx + 1, icon: PlanIcon };
      case "Accessories":
        return { ...step, index: idx + 1, icon: KeyPadIcon };
      default:
        throw new Error(`unkown category ${step.category}`);
    }
  });

  return (
    <ul>
      {stepsArr?.map((step) => (
        <StepInfo step={step} totalSteps={stepsArr.length} key={step.index} />
      ))}
    </ul>
  );
}
