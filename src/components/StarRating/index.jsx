import { AiFillStar } from "react-icons/ai";
import { cn } from "../../utils/tailwind";

export function StarRating(props) {
  const stars = [
    { value: 1, id: 1 },
    { value: 2, id: 2 },
    { value: 3, id: 3 },
    { value: 4, id: 4 },
    { value: 5, id: 5 },
  ];

  return (
    <>
      <div className="flex flex-row gap-1">
        {stars.map((star) => (
          <AiFillStar
            key={star.id}
            onClick={() => props?.setExpertise(props?.skillId, star.value)}
            className={cn(
              "text-xl text-gray-300 hover:text-gray-400 cursor-pointer",
              props?.expertise >= star.value &&
                "text-yellow-400 hover:text-yellow-500"
            )}
          />
        ))}
      </div>
    </>
  );
}
