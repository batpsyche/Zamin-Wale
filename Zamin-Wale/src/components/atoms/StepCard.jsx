import { Circle, CircleCheck, CircleDot } from "lucide-react";

const StepCard = ({ stepNumber, status, title }) => {
    return (
        <div
            className={`flex flex-col md:flex-row items-center justify-center w-fit md:w-full border rounded-lg gap-2 p-2 md:p-4 ${
                status === "complete"
                    ? "border-[#6f272b] bg-[#6f272b] text-white"
                    : status === "current"
                    ? "border-[#6f272b] bg-blue-50 text-black"
                    : "border-neutral-200"
            }`}
        >
            {status === "complete" ? (
                <CircleCheck className="text-white" />
            ) : status === "current" ? (
                <CircleDot className="text-black" />
            ) : (
                <Circle className="text-neutral-400" />
            )}
            {/* <span className="flex md:hidden text-sm">{stepNumber}</span> */}
            <div className="hidden md:flex w-full flex-col">
                <span className="text-sm">Step {stepNumber}</span>
                <span className="text-base font-bold">{title}</span>
            </div>
        </div>
    );
};

export default StepCard;
