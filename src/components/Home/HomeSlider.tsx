import { useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import HomeSliderComponents from "./HomeSliderComponents";
import "../../styles/embla.css";

const images = [1, 2, 3]; 

function HomeSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () => {});
  }, [emblaApi]);

  return (
    <div className="w-[80%] h-[500px] flex gap-10 flex-col items-center justify-center bg-gray-300 rounded-2xl relative p-4">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {images.map((_, index) => (
            <div className="embla__slide" key={index}>
              <HomeSliderComponents />
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={scrollPrev}
        className="absolute left-[60px] p-2 bg-gray-400 text-white rounded-full"
      >
        {"<"}
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-[60px]  p-2 bg-gray-400 text-white rounded-full"
      >
        {">"}
      </button>
    </div>
  );
}

export default HomeSlider;