import AkashLogoDark from "@/assets/akash-logo-dark.svg";
import AkashLogo from "@/assets/akash-logo.svg";

// interface Props extends HTMLAttributes<"image"> {
//   width?: number;
//   height?: number;
// }

// const { width = 128, height = 26, ...props } = Astro.props;

{
  /* <Image
  quality="max"
  loading="eager"
  src={AkashLogo}
  width={width}
  height={height}
  alt="Akash Network Logo"
  format="svg"
  class={"dark:hidden"}
/>

<Image
  quality="max"
  loading="eager"
  src={AkashLogoDark}
  width={width}
  height={height}
  alt="Akash Network Logo"
  format="svg"
  class={"hidden dark:block"}
/> */
}

const Logo = ({
  width = 128,
  height = 26,
  ...props
}: {
  width?: number;
  height?: number;
  [key: string]: any;
}) => {
  return (
    <>
      <img
        src={AkashLogo.src}
        width={width}
        height={height}
        alt="Akash Network Logo"
        className="dark:hidden"
      />

      <img
        src={AkashLogoDark.src}
        width={width}
        height={height}
        alt="Akash Network Logo"
        className="hidden dark:block"
      />
    </>
  );
};

export default Logo;
