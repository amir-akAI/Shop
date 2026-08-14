import { useState } from "react";
import { Link } from "react-router-dom";
import {Mail, MapPin, Phone} from "lucide-react";
import {FaInstagram, FaTelegramPlane, FaYoutube, FaFacebookF, FaLinkedinIn} from "react-icons/fa";

export default function Footer() {

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) return;

    setSubmitted(true);
    setEmail("");

    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <footer dir="rtl" className="mt-20 border-t border-gray-200 bg-[#f8f7f3] text-gray-800">

      {/* ================= Newsletter ================= */}

      <section className="border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

          <div className="grid items-center gap-8 lg:grid-cols-2">

            {/* متن خبرنامه */}

            <div>
              <p className="mb-2 text-sm font-medium text-gray-500">
                عضویت در خبرنامه
              </p>

              <h2 className="font-serif text-2xl font-bold sm:text-3xl">
                از محصولات جدید باخبر شوید
              </h2>

              <p className="mt-3 max-w-lg text-sm leading-7 text-gray-500">
                ایمیل خود را وارد کنید تا از جدیدترین محصولات،
                تخفیف‌ها و پیشنهادهای ویژه نورا باخبر شوید.
              </p>
            </div>


            {/* فرم ایمیل */}

            <div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">

                <div className="relative flex-1">

                  <Mail size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"/>

                  <input type="email" value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)}
                    placeholder="ایمیل خود را وارد کنید"
                    required
                    className="h-12 w-full rounded-md border border-gray-300 bg-white pr-11 pl-4 text-sm outline-none transition focus:border-black"/>

                </div>

                <button type="submit" className="h-12 rounded-md bg-black px-7 text-sm font-medium text-white transition hover:bg-gray-800">

                  {submitted
                    ? "عضویت انجام شد ✓"
                    : "عضویت"}
                </button>

              </form>

              <p className="mt-2 text-xs text-gray-400">
                با عضویت در خبرنامه، با قوانین و حریم خصوصی
                سایت موافقت می‌کنید.
              </p>

            </div>

          </div>

        </div>
      </section>


      {/* ================= Main Footer ================= */}

      <section>
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">


            {/* ================= Brand ================= */}

            <div>

              <Link to="/" className="font-serif text-3xl font-bold tracking-tight">
                Norra
              </Link>

              <p className="mt-4 max-w-xs text-sm leading-7 text-gray-500">
                فروشگاهی برای انتخاب محصولات زیبا،
                کاربردی و باکیفیت برای خانه و زندگی مدرن.
              </p>


              {/* Social Media */}

              <div className="mt-6 flex flex-wrap items-center gap-2">

                {/* Instagram */}

                <Link
                  to="#"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 transition hover:bg-black hover:text-white">
                  <FaInstagram size={18} />
                </Link>


                {/* Telegram */}

                <a
                  href="#"
                  aria-label="Telegram"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 transition hover:bg-black hover:text-white"
                >
                  <FaTelegramPlane size={18} />
                </a>


                {/* YouTube */}

                <a
                  href="#"
                  aria-label="YouTube"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 transition hover:bg-black hover:text-white"
                >
                  <FaYoutube size={18} />
                </a>


                {/* Facebook */}

                <a
                  href="#"
                  aria-label="Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 transition hover:bg-black hover:text-white"
                >
                  <FaFacebookF size={17} />
                </a>


                {/* LinkedIn */}

                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 transition hover:bg-black hover:text-white"
                >
                  <FaLinkedinIn size={17} />
                </a>

              </div>

            </div>


            {/* ================= Shop ================= */}

            <div>

              <h3 className="mb-5 font-semibold">
                فروشگاه
              </h3>

              <ul className="space-y-3 text-sm text-gray-500">

                <li>
                  <Link
                    to="/store"
                    className="transition hover:text-black">
                    همه محصولات
                  </Link>
                </li>

                <li>
                  <Link
                    to="/store?category=furniture"
                    className="transition hover:text-black"
                  >
                    مبلمان
                  </Link>
                </li>

                <li>
                  <Link
                    to="/store?category=ceramics"
                    className="transition hover:text-black"
                  >
                    سرامیک
                  </Link>
                </li>

                <li>
                  <Link
                    to="/store?category=lighting"
                    className="transition hover:text-black"
                  >
                    روشنایی
                  </Link>
                </li>

                <li>
                  <Link
                    to="/store?category=textiles"
                    className="transition hover:text-black"
                  >
                    منسوجات
                  </Link>
                </li>

              </ul>

            </div>


            {/* ================= Important Links ================= */}

            <div>

              <h3 className="mb-5 font-semibold">
                لینک‌های مهم
              </h3>

              <ul className="space-y-3 text-sm text-gray-500">

                <li>
                  <Link
                    to="/"
                    className="transition hover:text-black"
                  >
                    صفحه اصلی
                  </Link>
                </li>

                <li>
                  <Link
                    to="/wishlist"
                    className="transition hover:text-black"
                  >
                    علاقه‌مندی‌ها
                  </Link>
                </li>

                <li>
                  <Link
                    to="/carts"
                    className="transition hover:text-black"
                  >
                    سبد خرید
                  </Link>
                </li>

                <li>
                  <Link
                    to="/account"
                    className="transition hover:text-black"
                  >
                    حساب کاربری
                  </Link>
                </li>

                <li>
                  <Link
                    to="/login"
                    className="transition hover:text-black"
                  >
                    ورود / ثبت‌نام
                  </Link>
                </li>

              </ul>

            </div>


            {/* ================= Contact ================= */}

            <div>

              <h3 className="mb-5 font-semibold">
                ارتباط با ما
              </h3>

              <ul className="space-y-4 text-sm text-gray-500">


                {/* Address */}

                <li className="flex items-start gap-3">

                  <MapPin
                    size={18}
                    className="mt-0.5 shrink-0 text-gray-700"
                  />

                  <span>
                    تهران، خیابان ولیعصر
                  </span>

                </li>


                {/* Phone */}

                <li className="flex items-center gap-3">

                  <Phone
                    size={18}
                    className="shrink-0 text-gray-700"
                  />

                  <span dir="ltr">
                    021-12345678
                  </span>

                </li>


                {/* Email */}

                <li className="flex items-center gap-3">

                  <Mail
                    size={18}
                    className="shrink-0 text-gray-700"
                  />

                  <span dir="ltr">
                    info@norra.ir
                  </span>

                </li>

              </ul>


              {/* Support Box */}

              <div className="mt-6 rounded-lg border border-gray-200 bg-white p-4">

                <p className="text-xs text-gray-400">
                  نیاز به کمک دارید؟
                </p>

                <p className="mt-1 text-sm font-medium">
                  پشتیبانی همه‌روزه
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  شنبه تا پنجشنبه، ۹ تا ۱۸
                </p>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ================= Bottom Footer ================= */}

      <section className="border-t border-gray-200">

        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 text-xs text-gray-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">

          {/* Copyright */}

          <p>
            © ۱۴۰۵ نورا. تمامی حقوق محفوظ است.
          </p>


          {/* Bottom Links */}

          <div className="flex flex-wrap items-center gap-5">

            <Link
              to="/privacy"
              className="transition hover:text-black"
            >
              حریم خصوصی
            </Link>

            <Link
              to="/terms"
              className="transition hover:text-black"
            >
              قوانین و مقررات
            </Link>

            <Link
              to="/shipping"
              className="transition hover:text-black"
            >
              شرایط ارسال
            </Link>

          </div>

        </div>

      </section>

    </footer>
  );
}