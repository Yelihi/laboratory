import styles from "./UnitSection.module.css";

interface UnitSectionProps {
  backgroundColor: string;
  isMargin?: number;
  children: React.ReactNode;
}

export const UnitSection = ({
  children,
  backgroundColor,
  isMargin,
}: UnitSectionProps) => {
  return (
    <section
      className={styles.container}
      style={{
        backgroundColor: backgroundColor,
        margin: isMargin ? `${isMargin}px` : "0px",
      }}
    >
      {children}
    </section>
  );
};
