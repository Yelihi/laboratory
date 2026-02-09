import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | 아이더스",
    default: "아이더스 상품 목록",
  },
  description: "아이더스 상품 목록",
  keywords: ["아이더스", "상품 목록", "상품 학습"],
  creator: "아이더스",
  robots: {
    index: true, // 페이지 인덱싱 허용
    follow: true, // 링크 팔로우 허용
    nocache: false, // 캐시를 허용(혹은 true로 막기)
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body>{children}</body>
    </html>
  );
}
