import { projectContexts } from "@/data/projectContexts";

export default function ProjectContext({ projectId }: { projectId: string }) {
  const context = projectContexts[projectId];
  if (!context) return null;

  return (
    <p
      data-project-context={projectId}
      style={{
        marginTop: ".55rem",
        marginBottom: ".35rem",
        fontFamily: '"Noto Sans JP", system-ui, sans-serif',
        fontSize: ".75rem",
        fontWeight: 400,
        lineHeight: 1.7,
        letterSpacing: ".025em",
        color: "inherit",
        opacity: .75,
      }}
    >
      {context.period && <>{context.period}<span aria-hidden="true"> ｜ </span></>}
      {context.stage}<span aria-hidden="true"> ｜ </span>{context.activity}
    </p>
  );
}
