import Button from "../button/Button";
import Container from "../container/Container";

const socialLinks = [
  {
    label: "Instagram",
  },
  {
    label: "Twitter",
  },
  {
    label: "YouTube",
  },
];

const shopLinks = [
  { label: "All products", href: "/store" },
  { label: "New arrivals", href: "/store" },
  { label: "Best sellers", href: "/store" },
  { label: "Gift cards", href: "/store" },
];

const helpLinks = [
  { label: "Shipping" },
  { label: "Returns" },
  { label: "Contact" },
  { label: "FAQ" },
];

const companyLinks = [
  { label: "About" },
  { label: "Journal" },
  { label: "Sustainability" },
  { label: "Careers" },
];

export function Footer() {
  return (
    <Container>
      <footer className="mt-16 border-t border-border bg-surface sm:mt-20 lg:mt-24">
        <div className="container-page px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-12">

            <div className="sm:col-span-2 lg:col-span-2">
              <a
                href="/"
                className="inline-block font-display text-2xl font-semibold tracking-tight text-foreground"
              >
                LUXE
              </a>

              <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
                Considered objects for a quieter home. Small-batch goods from
                independent studios, shipped carbon neutral.
              </p>

              <form
                className="mt-6 flex w-full max-w-md flex-col gap-3 sm:flex-row"
                onSubmit={(e) => e.preventDefault()}
                aria-label="Newsletter subscription"
              >
                <input
                  type="email"
                  placeholder="Your email address"
                  aria-label="Email address"
                  required
                  className="h-11 min-w-0 flex-1 rounded-md border border-border bg-background px-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-foreground"
                />

                <Button
                  type="submit"
                  varient="black"
                >
                  Subscribe
                </Button>
              </form>

              <div className="mt-7 flex items-center gap-2">
              
                {socialLinks.map(({ label }) => (
                  <button
                    key={label}
                    type="button"
                    aria-label={label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-border text-xs text-muted-foreground transition hover:border-foreground hover:bg-foreground hover:text-background"
                  >
                    {label.charAt(0)}
                  </button>
                ))}
              </div>
            </div>

            <FooterCol
              title="Shop"
              links={shopLinks}
              clickable
            />

            <FooterCol
              title="Help"
              links={helpLinks}
            />

            <FooterCol
              title="Company"
              links={companyLinks}
            />
          </div>
        </div>

        <div className="border-t border-border">
          <div className="container-page flex flex-col gap-4 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">

            <p className="text-center sm:text-left">
              © {new Date().getFullYear()} LUXE Studio. All rights reserved.
            </p>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 sm:justify-end">
              <a
                href="/privacy"
                className="transition hover:text-foreground"
              >
                Privacy
              </a>

              <a
                href="/terms"
                className="transition hover:text-foreground"
              >
                Terms
              </a>

              <a
                href="/cookies"
                className="transition hover:text-foreground"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </Container>
  );
}

function FooterCol({
  title,
  links,
  clickable = false,
}: {
  title: string;
  links: {
    label: string;
    href?: string;
  }[];
  clickable?: boolean;
}) {
  return (
    <div>
      <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-foreground">
        {title}
      </h3>

      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            {clickable && link.href ? (
              <a
                href={link.href}
                className="text-sm text-muted-foreground transition hover:text-foreground"
              >
                {link.label}
              </a>
            ) : (
              <span className="text-sm text-muted-foreground">
                {link.label}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
