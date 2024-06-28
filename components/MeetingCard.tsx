import { avatarImages } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { Copy, Play, Share, SquareArrowOutUpRight } from "lucide-react";
import { ReactElement } from "react";
import { toast } from "./ui/use-toast";

interface MeetingCardProps {
  title: string;
  date: string;
  icon: string;
  isPreviousMeeting?: boolean;
  buttonIcon1?: string | ReactElement;
  buttonText?: string;
  handleClick?: () => void;
  link: string;
}

const MeetingCard = ({
  title,
  date,
  icon,
  link,
  buttonIcon1,
  buttonText,
  handleClick,
  isPreviousMeeting,
}: MeetingCardProps) => {
  return (
    <section className="flex flex-col bg-dark-1 w-full justify-between rounded-md px-5 py-8 min-h-[258px] xl:max-w-[568px]">
      <article className="flex flex-col gap-3">
        <Image src={icon} alt="upcoming" width={28} height={28} />
        <h3 className="text-2xl font-semibold">{title}</h3>
        <p className="text-sm text-gray-400">{date}</p>
      </article>
      <article className={cn("flex justify-center relative", {})}>
        <div className="relative flex w-full max-sm:hidden">
          {avatarImages.map((img, index) => (
            <Image
              src={img}
              alt="person"
              key={index}
              width={40}
              height={40}
              className={cn("rounded-full bg-dark-2 p-1", {
                absolute: index > 0,
              })}
              style={{ top: 0, left: index * 28 }}
            />
          ))}
          <div className="flex-center text-xs font-medium absolute left-[109px] size-10 rounded-full border-[4px] border-dark-2 bg-dark-1">
            +3
          </div>
        </div>
        {!isPreviousMeeting && (
          <div className="flex gap-2">
            <Button className="gap-1" onClick={handleClick}>
              {buttonIcon1 && buttonIcon1}
              {buttonText}
            </Button>
            <Button
              variant="secondary"
              className="gap-1"
              onClick={() => {
                navigator.clipboard.writeText(link);
                toast({
                  title: "Link Copied",
                });
              }}
            >
              <Copy size={15} />
              Copy Link
            </Button>
          </div>
        )}
      </article>
    </section>
  );
};

export default MeetingCard;
