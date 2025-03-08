import HomeCategoryComponents from "./HomeCategoryComponents";

function HomeCategory() {
  return (
    <div className="w-full max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-4 p-4">
      <HomeCategoryComponents />
      <HomeCategoryComponents />
      <HomeCategoryComponents />
      <HomeCategoryComponents />
      <HomeCategoryComponents />
      <HomeCategoryComponents />
      <HomeCategoryComponents />
      <HomeCategoryComponents />
    </div>
  );
}

export default HomeCategory;