import "@notebook/ui/globals.css";
import Navbar from "../_components/navbar";
import Footer from "../_components/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
