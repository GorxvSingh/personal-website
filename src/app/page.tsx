import { projects } from "@/data/projects";
import ThemeToggle from "@/components/ThemeToggle";

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path
        d="M3.33337 8H12.6667"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.66663 4L12.6666 8L8.66663 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20 sm:py-32">
      {/* Header / Nav */}
      <header className="mb-20">
        <nav className="flex items-center justify-between">
          <a
            href="/"
            className="text-lg font-semibold tracking-tight text-foreground"
          >
            Gorav Saluja
          </a>
          <ThemeToggle />
        </nav>
      </header>

      {/* Hero */}
      <section className="mb-20">
        <h1 className="mb-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          Hey, I&apos;m Gorav
        </h1>
        <p className="max-w-lg text-lg leading-relaxed text-muted">
          I build data systems and AI-powered workflows that turn messy
          operational data into clear decisions. From automated dashboards to
          agentic tools that cut manual work — I make complex systems easy to
          act on.
        </p>
      </section>

      {/* Projects */}
      <section>
        <h2 className="mb-8 text-sm font-medium uppercase tracking-widest text-muted">
          Projects
        </h2>
        <div className="flex flex-col gap-1">
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.url ?? "#"}
              target={project.url && project.url !== "#" ? "_blank" : undefined}
              rel={
                project.url && project.url !== "#"
                  ? "noopener noreferrer"
                  : undefined
              }
              className="group -mx-4 flex items-start justify-between gap-4 rounded-lg px-4 py-4 transition-colors hover:bg-hover"
            >
              <div className="min-w-0">
                <h3 className="font-medium text-foreground">
                  {project.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  {project.description}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-tag-bg px-2.5 py-0.5 text-xs font-medium text-tag-text"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-1 text-muted transition-transform group-hover:translate-x-1">
                <ArrowIcon />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 border-t border-border pt-8">
        <p className="text-sm text-muted">
          &copy; {new Date().getFullYear()} Gorav Saluja
        </p>
      </footer>
    </div>
  );
}
