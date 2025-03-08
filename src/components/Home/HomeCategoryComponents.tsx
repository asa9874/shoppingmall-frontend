import shirts from "../../assets/shirts.svg";

function HomeCategoryComponents() {
  return (
    <div className="justify-center items-center flex flex-col w-full h-full">
      <img src={shirts} className="h-[100px]" />
      <span className="text-2xl">의류</span>
    </div>
  );
}

export default HomeCategoryComponents;
