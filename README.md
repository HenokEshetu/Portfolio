# Portfolio

A visually stunning, accessible, and modern portfolio built with Next.js (App Router), React, and Tailwind CSS. This project showcases advanced skills in full-stack development, cybersecurity, automation, and infrastructure engineering, with a focus on narrative-driven blog content and beautiful, responsive design.

<img src="https://github.com/HenokEshetu/Portfolio/blob/master/public/portfolio.png?raw=true" width="100%" alt="" />

## Features

- **Next.js App Directory**: Utilizes the latest Next.js features for fast, scalable, and maintainable routing.
- **Static Blog System**: All blog posts are statically routed and rendered as `.tsx` React components for maximum performance and SEO.
- **Elegant UI/UX**: Custom, accessible layouts with hidden scrollbars, soft dark backgrounds, high-contrast text, and accent colors for a comfortable reading experience.
- **Responsive Design**: Fully responsive across devices, with wide content areas, generous spacing, and modern typography.
- **Narrative Blog Content**: Each blog post is a long-form, essay-style narrative, covering topics such as cryptography, virtualization, full-stack automation, scripting, network security, penetration testing, and threat intelligence.
- **Image-Rich**: All referenced images are present and optimized for fast loading and accessibility.
- **Consistent Navigation**: Clean, intuitive navigation with proper margins and spacing to account for the navbar.
- **Accessible**: Follows best practices for color contrast, keyboard navigation, and semantic HTML.

## Blog Topics

- **Cryptography in Practice**: Securing Data in a Digital World
- **Data Center Virtualization & Infrastructure Design**: Powering the Modern Enterprise
- **Full Stack Development & Automation**: Building Secure, Scalable Systems
- **Languages & Scripting**: The Power of Polyglot Programming in Cybersecurity
- **Network Security Engineering**: Building Resilient Digital Fortresses
- **Penetration Testing & System Engineering**: Breaking to Build Stronger Systems
- **Threat Intelligence & SOC Analysis**: Staying Ahead of Cyber Threats

Each blog post is statically routed and features:

- A wide, comfortable reading area
- Hidden scrollbars for a clean look
- Large, readable headings and accent colors
- Narrative, paragraph-style content (no short lists or sections)
- Consistent date formatting matching the blog index

## Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript, React
- **Styling**: Tailwind CSS, custom classes for accessibility and aesthetics
- **Image Optimization**: next/image
- **Content**: All blog posts as `.tsx` files for static, file-based routing

## Getting Started

1. **Install dependencies**
   ```sh
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```
2. **Run the development server**
   ```sh
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```
3. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000) to view the portfolio.

## Project Structure

- `app/` — Next.js app directory
  - `blog/` — All blog posts as `.tsx` files and static `[slug]/page.tsx` for routing
  - `components/` — Reusable UI components (navbar, hero, skills, projects, etc.)
  - `public/` — Static assets (images, videos)
- `constants/`, `config/`, `lib/` — Project configuration and utilities
- `tailwind.config.ts` — Tailwind CSS configuration
- `README.md` — This file

## Accessibility & Best Practices

- All colors and backgrounds are chosen for high contrast and comfort
- Headings use semantic HTML and accent colors
- Images include descriptive alt text
- Scrollbars are hidden for aesthetics but content remains accessible
- Responsive and mobile-friendly design

## Contributing

Contributions are welcome! Please see `CONTRIBUTING.md` for guidelines.

## License

This project is licensed under the MIT License. See `LICENSE` for details.

## Author

Henok Eshetu

---

> "Building secure, beautiful, and accessible digital experiences."
