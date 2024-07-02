import { cn } from "@/lib/utils";
import Image from "next/image";
interface HomeCardProps {
  className: string;
  img: string;
  title: string;
  description: string;
  handleClick: () => void;
}
const HomeCard = ({
  className,
  img,
  title,
  description,
  handleClick,
}: HomeCardProps) => {
  return (
    <div
      className={cn(
        "px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-lg cursor-pointer",
        className
      )}
      onClick={handleClick}
    >
      <div className="flex-center bg-muted size-12 rounded-md">
        <Image src={img} alt={title} width={27} height={27} />
      </div>
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-primary/70">{description}</p>
      </div>
    </div>
  );
};

export default HomeCard;
