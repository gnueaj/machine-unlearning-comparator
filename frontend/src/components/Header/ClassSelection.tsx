import { useState } from "react";

import ClassButtons from "./ClassButtons";
import ClassPlusButton from "./ClassPlusButton";
import { CIFAR_10_CLASSES } from "../../constants/common";
import { Experiments } from "../../types/data";
import { useExperimentsStore } from "../../stores/experimentsStore";
import { useForgetClassStore } from "../../stores/forgetClassStore";
import { loadExperimentData } from "../../constants/models";

export default function ClassSelection() {
  const saveExperiments = useExperimentsStore((state) => state.saveExperiments);
  const selectedForgetClasses = useForgetClassStore(
    (state) => state.selectedForgetClasses
  );
  const setIsExperimentsLoading = useExperimentsStore(
    (state) => state.setIsExperimentsLoading
  );

  const hasNoSelectedForgetClass = selectedForgetClasses.length === 0;

  const [open, setOpen] = useState(hasNoSelectedForgetClass);

  const fetchAndSaveExperiments = async (forgetClass: string) => {
    const classIndex = CIFAR_10_CLASSES.indexOf(forgetClass);
    setIsExperimentsLoading(true);
    try {
      const data: Experiments = await loadExperimentData(classIndex);
      saveExperiments(data);
    } finally {
      setIsExperimentsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-1 relative -bottom-[11px]">
      <ClassButtons
        setOpen={setOpen}
        fetchAndSaveExperiments={fetchAndSaveExperiments}
      />
      <ClassPlusButton
        open={open}
        setOpen={setOpen}
        fetchAndSaveExperiments={fetchAndSaveExperiments}
        hasNoSelectedForgetClass={hasNoSelectedForgetClass}
      />
    </div>
  );
}
