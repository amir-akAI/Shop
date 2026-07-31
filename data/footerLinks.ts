export interface FooterSection {
    title: string;
    links: {
        label: string;
        href: string;
        badge?: string;
    }[];
}

export const footerSections: FooterSection[] = [
    {
        title: "Product",
        links: [
            {
                label: "Headless CMS",
                href: "#",
                badge: "New",
            },
            {
                label: "Pricing",
                href: "#",
            },
            {
                label: "GraphQL APIs",
                href: "#",
            },
            {
                label: "Open source Starter-kit",
                href: "#",
            },
        ],
    },

    {
        title: "Explore",
        links: [
            {
                label: "My feed",
                href: "#",
            },
            {
                label: "Case studies",
                href: "#",
            },
            {
                label: "Hashnode AI",
                href: "#",
            },
            {
                label: "Referral Program",
                href: "#",
            },
        ],
    },

    {
        title: "Company",
        links: [
            {
                label: "About",
                href: "#",
            },
            {
                label: "Careers",
                href: "#",
            },
            {
                label: "Logos & Media",
                href: "#",
            },
            {
                label: "Changelog",
                href: "#",
            },
            {
                label: "Feature Requests",
                href: "#",
            },
        ],
    },

    {
        title: "Blogs",
        links: [
            {
                label: "Official Blog",
                href: "#",
            },
            {
                label: "Engineering Blog",
                href: "#",
            },
            {
                label: "Townhall",
                href: "#",
            },
        ],
    },

    {
        title: "Support",
        links: [
            {
                label: "Support Docs",
                href: "#",
            },
            {
                label: "Contact",
                href: "#",
            },
            {
                label: "Discord",
                href: "#",
            },
        ],
    },
];