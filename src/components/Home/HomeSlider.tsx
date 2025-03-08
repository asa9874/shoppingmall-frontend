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
    <div className="w-full max-w-screen-xl mx-auto flex gap-10 flex-col items-center justify-center bg-gray-300 rounded-2xl relative p-4">
      <div className="embla w-full" ref={emblaRef}>
        <div className="embla__container flex">
          {images.map((_, index) => (
            <div className="embla__slide flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%]" key={index}>
              <HomeSliderComponents />
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={scrollPrev}
        className="absolute left-4 sm:left-8 p-2 bg-gray-400 text-white rounded-full"
      >
        {"<"}
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 sm:right-8 p-2 bg-gray-400 text-white rounded-full"
      >
        {">"}
      </button>
    </div>
  );
}

export default HomeSlider;