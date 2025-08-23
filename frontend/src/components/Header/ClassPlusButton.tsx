import { useMemo, useEffect, useState } from "react";

import Button from "../common/CustomButton";
import { Label } from "../UI/label";
import { PlusIcon } from "../common/icons";
import { DATASETS, NEURAL_NETWORK_MODELS } from "../../constants/common";
import { useClasses } from "../../hooks/useClasses";
import { useBaseConfigStore } from "../../stores/baseConfigStore";
import { useForgetClassStore } from "../../stores/forgetClassStore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../UI/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../UI/select";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  fetchAndSaveExperiments: (forgetClass: string) => Promise<void>;
  hasNoSelectedForgetClass: boolean;
}

export default function ClassPlusButton({
  open,
  setOpen,
  fetchAndSaveExperiments,
  hasNoSelectedForgetClass,
}: Props) {
  const classes = useClasses();
  const saveForgetClass = useForgetClassStore((state) => state.saveForgetClass);
  const addSelectedForgetClass = useForgetClassStore(
    (state) => state.addSelectedForgetClass
  );
  const selectedForgetClasses = useForgetClassStore(
    (state) => state.selectedForgetClasses
  );
  const { dataset, setDataset, neuralNetworkModel, setNeuralNetworkModel } =
    useBaseConfigStore();

  const unselectForgetClasses = useMemo(
    () =>
      classes.filter(
        (item) => !selectedForgetClasses.includes(classes.indexOf(item))
      ),
    [classes, selectedForgetClasses]
  );

  const [forgetClass, setForgetClass] = useState(unselectForgetClasses[0]);

  useEffect(() => {
    setForgetClass(unselectForgetClasses[0]);
  }, [unselectForgetClasses]);

  const handleButtonClick = async () => {
    setOpen(false);
    addSelectedForgetClass(forgetClass);
    saveForgetClass(forgetClass);
    setDataset(dataset);
    setNeuralNetworkModel(neuralNetworkModel);
    await fetchAndSaveExperiments(forgetClass);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={
        hasNoSelectedForgetClass
          ? undefined
          : (value: boolean) => {
              setOpen(value);
              setForgetClass(unselectForgetClasses[0]);
            }
      }
    >
      <DialogTrigger className="w-8 h-[30px] flex justify-center items-center transition hover:bg-gray-800 rounded-t">
        <PlusIcon className="w-3.5 h-3.5" color="#64758B" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[320px] p-4">
        <DialogHeader>
          <DialogTitle>Unlearning Comparator</DialogTitle>
          <DialogDescription>
            <p>
              Select{" "}
              {hasNoSelectedForgetClass && "an architecture, a dataset, and "}a
              forget class.
            </p>
            {hasNoSelectedForgetClass && (
              <div className="grid grid-cols-2 gap-y-4 text-black mt-4">
                <div className="flex flex-col items-start">
                  <Label className="text-xs text-muted-foreground text-nowrap mb-0.5">
                    Architecture
                  </Label>
                  <Select
                    value={neuralNetworkModel ?? NEURAL_NETWORK_MODELS[0]}
                    onValueChange={(value: string) =>
                      setNeuralNetworkModel(value)
                    }
                  >
                    <SelectTrigger className="w-11/12">
                      <SelectValue
                        placeholder={
                          neuralNetworkModel ?? NEURAL_NETWORK_MODELS[0]
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {NEURAL_NETWORK_MODELS.map((model) => (
                        <SelectItem
                          key={model}
                          value={model}
                          disabled={model.startsWith("V")}
                        >
                          {model}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col items-start">
                  <Label className="text-xs text-muted-foreground text-nowrap mb-0.5">
                    Dataset
                  </Label>
                  <Select
                    value={dataset ?? DATASETS[0]}
                    onValueChange={(value: string) => setDataset(value)}
                  >
                    <SelectTrigger className="w-11/12">
                      <SelectValue placeholder={dataset ?? DATASETS[0]} />
                    </SelectTrigger>
                    <SelectContent>
                      {DATASETS.map((dataset) => (
                        <SelectItem
                          key={dataset}
                          value={dataset}
                          disabled={dataset === "Fashion-MNIST"}
                        >
                          {dataset}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-start">
          <Label className="text-xs text-muted-foreground text-center text-nowrap mb-0.5">
            Forget Class
          </Label>
          <Select value={forgetClass} onValueChange={setForgetClass}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={forgetClass} />
            </SelectTrigger>
            <SelectContent>
              {unselectForgetClasses.map((forgetClass) => (
                <SelectItem key={forgetClass} value={forgetClass}>
                  {forgetClass}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button
            className="h-[34px] flex items-center text-base px-4"
            onClick={handleButtonClick}
          >
            {hasNoSelectedForgetClass ? "APPLY" : "ADD"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
