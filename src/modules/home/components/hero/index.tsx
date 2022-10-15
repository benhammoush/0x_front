import UnderlineLink from "@modules/common/components/underline-link"
import Image from "next/image"

const Hero = () => {
  return (
    <div className="relative w-full h-[90%]">
      <div className="absolute inset-0 wide:ml-[25vw] z-10 flex flex-col items-center justify-center text-center text-white small:text-left small:justify-end small:items-start small:p-32">
        <h1 className="mb-4 text-xl-semi md:text-2xl-semi drop-shadow-md shadow-black">
          Summer styles are finally here
        </h1>
        <p className="text-base-regular max-w-[32rem] mb-6 drop-shadow-md shadow-black">
          This year, our new summer collection will shelter you from the harsh
          elements of a world that doesn&apos;t care if you live or die.
        </p>
        <UnderlineLink href="/store">Explore products</UnderlineLink>
      </div>
      <video
        id="vid" 
        className="saturate-80 mx-auto min-h-[100vh] max-h-screen w-screen object-fill brightness-75"
        autoPlay={true}
        loop
        muted={true}
      >
        <source src="/polo.mp4" />
      </video>
    </div>
  )
}

export default Hero
