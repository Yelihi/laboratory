"use client";
import Image from "next/image";

import styles from "./GiftSection.module.css";
import type { GiftItemDto } from "@/entities/gift/models/dtos";

import { UnitSectionTitle } from "../UnitSectionTitle";
import type { UnitSectionTitleProps } from "../UnitSectionTitle";

import { Gift } from "@/views/main/ui/components/gift/Gift";

export interface GiftSectionProps {
  id: number;
  icon: string;
  titles: UnitSectionTitleProps[];
  themeTitle: string;
  items: GiftItemDto[];
}

export const GiftSection = ({
  id,
  icon,
  titles,
  themeTitle,
  items,
}: GiftSectionProps) => {
  const iconSize = titles[0]?.fontSize || 18;

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleContainer}>
          <Image
            src={icon}
            alt={`${id} icon`}
            width={iconSize}
            height={iconSize}
            className={styles.icon}
          />
          {titles.map((title) => {
            return <UnitSectionTitle key={title.text} {...title} />;
          })}
        </div>
        <span className={styles.themeTitle}>{themeTitle}</span>
      </header>
      <div className={styles.itemsContainer}>
        {items.map((item) => {
          return (
            <Gift
              key={item.uuid}
              id={item.uuid}
              artistId={item.artistId.toString()}
              thumbImageUrl={item.thumbImageUrl}
              title={item.name}
              discountRate={item.saleRate}
              salePrice={item.priceSale}
            />
          );
        })}
      </div>
    </section>
  );
};
