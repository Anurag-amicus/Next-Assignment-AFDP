import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

interface RatingProps {
    rating: number;
}

export default function Rating({ rating }: RatingProps) {
    const fullStars = Math.floor(rating);

    return (
        <span
            className="flex items-center gap-0.5 text-lg"
            role="img"
            aria-label={`Rated ${rating.toFixed(1)} out of 5`}
        >
            {Array.from({ length: 5 }, (_, i) => (
                <FontAwesomeIcon
                    key={i}
                    icon={faStar}
                    className={`w-[1em] h-[1em] shrink-0 ${i < fullStars ? "text-orange" : "text-gray-200"}`}
                />
            ))}
        </span>
    );
}
