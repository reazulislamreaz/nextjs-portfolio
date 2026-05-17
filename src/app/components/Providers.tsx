import Navbar from "./Navbar";
import AiPortfolioAssistant from "./AiPortfolioAssistant";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <AiPortfolioAssistant />
    </>
  );
}
