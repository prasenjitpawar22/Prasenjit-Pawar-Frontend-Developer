const SectionOne = () => {
  return (
    <div
      style={{ backgroundImage: "url('/banner.jpg')" }}
      className="h-[550px] w-full bg-cover bg-no-repeat"
    >
      <div className="w-fit h-full relative">
        <div> </div>
        <div className="absolute md:w-[400px] w-[200px] sm:w-[200px] bottom-36 left-9">
          <p className="text-3xl text-slate-800 font-bold">
            The title of your Link Course
          </p>
          <p className="text-2xl text-slate-900 font-medium">
            Learn how to build faster and better
          </p>
          <p className="font-medium text-slate-900">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
            voluptas ipsa.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SectionOne;
