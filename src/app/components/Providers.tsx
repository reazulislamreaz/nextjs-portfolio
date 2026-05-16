import Navbar from "./Navbar";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
