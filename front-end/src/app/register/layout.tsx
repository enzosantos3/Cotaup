import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register - CotaUp",
  description: "Crie sua conta CotaUp",
};

export default function RegisterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}