import styles from "@/views/main/ui/components/item-image/PromotionLabel.module.css";

export interface PromotionLabelProps {
  colorBackground: string;
  type: "BOLD";
  text: string;
  colorFont: string;
  size: number;
}

export const PromotionLabel = ({
  colorBackground,
  type,
  text,
  colorFont,
  size,
}: PromotionLabelProps) => {
  // TODO: type 에 따른 디자인 시스템 설정

  return (
    <div
      className={styles.badgeContainer}
      style={{ backgroundColor: colorBackground }}
    >
      <span
        className={styles.label}
        style={{
          color: colorFont,
          fontSize: `${size}px`,
        }}
      >
        {text}
      </span>
    </div>
  );
};
