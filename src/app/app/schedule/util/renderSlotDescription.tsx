import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const renderSlotContent = (
  slot: string | { name: string; description: string }
) => {
  if (typeof slot === "object") {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>{slot.name}</TooltipTrigger>
          <TooltipContent side="right">
            <p>{slot.description}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  return null;
};
