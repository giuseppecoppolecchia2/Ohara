
export default function Logo({ className = "w-32" }) {
  return (
    <img
      src="/src/assets/logo.png"
      alt="logo"
      className={className}
    />
  );
}