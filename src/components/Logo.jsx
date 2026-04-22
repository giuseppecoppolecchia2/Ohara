import logoSrc from "../assets/logo.png";

export default function Logo({ className = "w-32" }) {
  return (
    <img
      src={logoSrc}
      alt="logo"
      className={className}
    />
  );
}