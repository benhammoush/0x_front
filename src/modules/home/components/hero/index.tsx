import UnderlineLink from "@modules/common/components/underline-link"
import Image from "next/image"

const Hero = () => {
  return (
    <div className="relative w-full overflow-hidden h-[90%]">
      <section className="absolute z-10 items-center w-full text-white mt-36 md:mt-0">
        <div className="max-w-screen-xl px-4 py-32 mx-auto lg:flex lg:h-screen lg:items-center">
          <div className="max-w-3xl py-20 mx-auto text-center backdrop-blur-[2px]">
            <h1 className="text-5xl font-normal tracking-widest text-white uppercase">
              0 | X
            </h1>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <UnderlineLink href="/store">
                SHOP
              </UnderlineLink>
            </div>
          </div>
        </div>
      </section>
      <video
        id="vid"
        className="object-none max-h-screen min-h-screen mx-auto md:object-fill aspect-video saturate-100 md:w-screen brightness-100"
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
