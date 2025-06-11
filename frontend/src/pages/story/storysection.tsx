import { StoryCard } from "./story";

const poeticBlocks = [
  // First poetic block
  <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-left font-extrabold">
    I craft <br />
    <span className="text-5xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl">
      stories
    </span>
    <br />
    <span className="text-2xl">
      from <span className="text-[#B0BEC5] font-thin italic">thin</span> air’s
      grace,
    </span>
  </h1>,

  // Second poetic block
  <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-left font-extrabold">
    <span className="text-2xl">Sometimes born of</span>
    <br />
    <span className="text-5xl ">Rain's</span>
    <br />
    embrace ,
  </h1>,

  // Third poetic block
  <h1 className="text-2xl md:text-5xl lg:text-5xl xl:text-7xl text-left font-extrabold">
    Sometimes shaped
    <br />
    from my own
    <br />
    <span className="text-5xl font-extrabold text-gray-400"> Face </span>
    ...
  </h1>,
];

const poetry = [
  <p>
    Haathon ki lakeerein na <br />
    karma ka karm maanta <br />
    Amrit ke mulya shwed Mera <br />
    itna hi mai jaanta <br />
  </p>,
  <p>
    Haathon ki lakeerein na <br />
    karma ka karm maanta <br />
    Amrit ke mulya shwed Mera <br />
    itna hi mai jaanta <br />
  </p>,
  <p>
    Haathon ki lakeerein na <br />
    karma ka karm maanta <br />
    Amrit ke mulya shwed Mera <br />
    itna hi mai jaanta <br />
  </p>,
];

export const StorySection = () => {
  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20">
      {poeticBlocks.map((textElement, idx) => {
        const direction = idx % 2 === 0 ? "left" : "right";
        return (
          <div
            key={idx}
            className="h-[60vh] overflow-hidden sm:min-h-[65vh] md:min-h-[70vh] mb-25 sm:mb-12 md:mb-16 bg-black"
          >
            <StoryCard
              imgSrc={`images/${6 + idx}.jpg`}
              textelement={textElement}
              poetry={poetry[idx]} // pass the poetry down here
              direction={direction}
            />
          </div>
        );
      })}
    </section>
  );
};
