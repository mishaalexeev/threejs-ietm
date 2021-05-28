import React, { useEffect, useState } from "react";
import withStores from "hocs/withStores";
import "./step-view.css";

const StepView = ({ stores }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const step = Math.floor(
      JSON.parse(JSON.stringify(stores.modelStore.currentStep))
    );
    if (currentStep !== step) {
      setCurrentStep(step);
    }
  }, [stores.modelStore.currentStep]);

  useEffect(() => {
    document.getElementsByClassName("current")[0].scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [currentStep]);

  return (
    <div className="step-menu">
      {stores.modelStore.stepData.map((s, i) => {
        return (
          <div key={i} className={currentStep === i ? "current" : "step"}>
            <span className="step-number">{i + 1}</span>
            <span className="step-content">{s}</span>
          </div>
        );
      })}
    </div>
  );
};

export default withStores(StepView);
