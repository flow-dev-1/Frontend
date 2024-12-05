import React, { useState } from "react";
import QuestionBox from "../../../components/QuestionBox";
import Frame from "./components/Frame";

function Page6() {
  const [currentStep, setCurrentStep] = useState(6);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <QuestionBox>
            <div className="text-center mb-5">
              <h2 className=" text-white bg-primary p-4 fs-1 rounded d-inline">
                Seeing, Caring and Doing!
              </h2>
            </div>
            <div className="d-flex  gap-2 ">
              <h2 className="text-blue fs-1 ">Instructions: </h2>
              <h2 className="text-gray fs-1">
                Read the following scenarios, and apply the Seeing, Caring and
                Doing Principle of Compassion.{" "}
              </h2>
            </div>
          </QuestionBox>
        );
      case 2:
        return (
          <Frame
            data={{
              title: `A classmate is sitting alone at lunch, looking usePrefetchInfiniteQuery. You notice they haven't touched thier food.`,
              questions: [
                { Seeing: `What do you notice about the situation?` },
                {
                  Caring: `What do you think your classmate might be feeling?`,
                },
                { Doing: `What could you do to show compassion?` },
              ],
            }}
          />
        );
      case 3:
        return (
          <Frame
            data={{
              title: `You see a new student struggling to find their way around the school, looking lost and unsure of where to go.`,
              questions: [
                { Seeing: `What do you notice about the situation?` },
                {
                  Caring: `What do you think the new student might be feeling?`,
                },
                { Doing: `What could you do to show compassion?` },
              ],
            }}
          />
        );
      case 4:
        return (
          <Frame
            data={{
              title: `Your friend did'nt do well on a test they studied hard for and seems very disappointed.`,
              questions: [
                { Seeing: `What do you notice about the situation?` },
                {
                  Caring: `What do you think your friend might be feeling?`,
                },
                { Doing: `What could you do to show compassion?` },
              ],
            }}
          />
        );
      case 5:
        return (
          <Frame
            data={{
              title: `During recess, you notice a group of students excluding someone from a game. That student is standing alone, looking sad.`,
              questions: [
                { Seeing: `What do you notice about the situation?` },
                {
                  Caring: `What do you think the student might be feeling?`,
                },
                { Doing: `What could you do to show compassion?` },
              ],
            }}
          />
        );
      case 6:
        return (
          <Frame
            data={{
              title: `You overhear a classmate being teased for a mistake they made during a presentation. They seem embarassed and are avoiding eye contact with others.`,
              questions: [
                { Seeing: `What do you notice about the situation?` },
                {
                  Caring: `What do you think your classmate might be feeling?`,
                },
                { Doing: `What could you do to show compassion?` },
              ],
            }}
          />
        );
      default:
        return <div>Invalid Step</div>;
    }
  };
  return <>{renderStep()}</>;
}

export default Page6;
