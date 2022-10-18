import UnderlineLink from "@modules/common/components/underline-link"
import Image from "next/image"

const Hero = () => {
  return (
    <div className="relative w-screen overflow-hidden h-[90%]">
      <div className="absolute inset-0 wide:ml-[25vw] z-10 flex flex-col items-center justify-center text-center text-white small:text-left small:justify-end small:items-start small:p-32">
        <h1 className="mb-4 text-xl-semi md:text-2xl-semi drop-shadow-md shadow-black">
          0 | X Streetwear
        </h1>
        <p className="text-base-regular md:max-w-[32rem] max-w-[15rem] mb-6 drop-shadow-md shadow-black">
          This year, our new summer collection will shelter you from the harsh
          elements of a world that doesn&apos;t care if you live or die.
        </p>
        <UnderlineLink href="/store">Explore products</UnderlineLink>
      </div>
      <video
        id="vid" 
        className="object-none max-h-screen min-h-screen mx-auto md:object-fill aspect-video saturate-80 md:w-screen brightness-75"
        autoPlay={true}
        loop
        muted={true}
        playsInline={true}
      >
        <source src="/polo.mp4" />
      </video>
    </div>
  )
}

export default Hero
