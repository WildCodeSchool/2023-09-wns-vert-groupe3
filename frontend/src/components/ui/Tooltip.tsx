import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import React from "react";

export default function Tooltip({
  children,
  content,
  open,
  defaultOpen,
  onOpenChange,
  ...props
}: TooltipPrimitive.TooltipProps & { content: React.ReactNode }) {
  return (
    <TooltipPrimitive.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Content
        sideOffset={5}
        className="select-none rounded-[4px] bg-neutral-300 px-[15px] py-[10px] text-[15px] leading-none text-hightcontrast will-change-[transform,opacity] data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade"
      >
        {content}
        <TooltipPrimitive.Arrow className="fill-neutral-300" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Root>
  );
}
