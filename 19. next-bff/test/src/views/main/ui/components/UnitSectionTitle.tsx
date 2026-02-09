import styles from "./UnitSectionTitle.module.css";

export interface UnitSectionTitleProps {
  text: string;
  fontSize: number;
  fontColor: string | null;
  backgroundColor: string | null;
  type: "BOLD" | "REGULAR";
}

export const UnitSectionTitle = ({
  text,
  fontSize,
  fontColor,
  backgroundColor,
  type,
}: UnitSectionTitleProps) => {
  return (
    <span
      className={styles.text}
      style={{
        fontSize: `${fontSize}px`,
        color: fontColor || "#F0F0F0",
        backgroundColor: backgroundColor || "#FFFFFF",
        fontWeight: type === "BOLD" ? "700" : "500",
      }}
    >
      {text}
    </span>
  );
};
