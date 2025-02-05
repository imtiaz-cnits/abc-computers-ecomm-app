import "@/assets/css/vendor/bootstrap.min.css";
import "@/assets/css/vendor/owl.carousel.min.css";
import "@/assets/css/vendor/owl.theme.default.min.css";
import "./globals.css";
import "@/assets/css/app.css";
import favicon from "@/assets/img/abc-logo-icon.svg";
import JavascriptClient from "@/Components/JavascriptClient/JavascriptClient";
import "@/assets/css/vendor/swiper-bundle.min.css";
import Navbar from "@/Components/Shared/Navbar/Navbar";
import "@/assets/css/navbar-footer.css";
import Footer from "@/Components/Shared/Footer/Footer";
import Preloader from "@/Components/Shared/Preloader/Preloader";
import BackToTop from "@/Components/Shared/BackToTop/BackToTop";

export const metadata = {
  title: "Home | ABC Computers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href={favicon.src} type="image/x-icon" />
      </head>
      <body>
        <Preloader />
        <Navbar />
        {children}
        <Footer />
        <BackToTop />
        <JavascriptClient />
      </body>
    </html>
  );
}
