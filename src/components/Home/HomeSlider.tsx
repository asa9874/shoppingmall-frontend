import table from "../../assets/table.jpg";
import Slider from "react-slick";
import HomeSliderComponents from "./HomeSliderComponents";

function HomeSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="w-full flex gap-10 flex-col items-center justify-center bg-gray-300 rounded-2xl">
      <Slider
        {...settings}
        className=" w-[800px] flex items-center justify-center p-5 rounded-2xl"
      >
        <div>
          <img
            src={table}
            alt="Table"
            className="w-full object-cover rounded-xl shadow-lg"
          />
        </div>
        {[...Array(5)].map((_, index) => (
          <HomeSliderComponents key={index} />
        ))}
      </Slider>
    </div>
  );
}

export default HomeSlider;
