import { ReactElement, ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  buttonText?: string;
  className?: string;
  handleClick?: () => void;
  children?: ReactNode;
  image?: string;
  buttonIcon?: string | ReactElement;
}
const MeetingModal = ({
  isOpen,
  onClose,
  title,
  buttonText,
  className,
  handleClick,
  children,
  image,
  buttonIcon,
}: MeetingModalProps) => {
  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="flex flex-col gap-6">
          <div className="flex flex-col gap-6">
            {image && (
              <div className="flex justify-center">
                <Image src={image} alt="Image" width={72} height={72} />
              </div>
            )}
            <h1 className={cn("text-3xl font-bold leading-[42px]", className)}>
              {title}
            </h1>
            {children}
            <Button onClick={handleClick} className="gap-1 w-full">
              {buttonText || "Schedule Meeting"}
              {buttonIcon && buttonIcon}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MeetingModal;
