import Image from "next/image";
import { useState } from "react";
interface SkillTreeImagesCarouselProps {
  imagesArray: StaticImageData[];
  altTexts: string[];
}
export const SkillTreeImagesCarousel: React.FC<
  SkillTreeImagesCarouselProps
> = ({ imagesArray, altTexts }) => {
  const [viewedImage, setViewedImage] = useState<number>(0);

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <figure>
        <Image src={imagesArray[viewedImage]} alt={altTexts[viewedImage]} />
      </figure>
      <aside className="flex gap-1 items-center justify-center">
        <button
          className="btn bg-purple-400"
          disabled={viewedImage - 1 < 0}
          onClick={() => setViewedImage((prev) => prev - 1)}
        >
          BACK
        </button>
        <button
          className="btn bg-purple-400"
          disabled={viewedImage + 1 > imagesArray.length - 1}
          onClick={() => setViewedImage((prev) => prev + 1)}
        >
          NEXT
        </button>
      </aside>
    </div>
  );
};
