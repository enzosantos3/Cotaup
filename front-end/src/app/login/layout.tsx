import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - CotaUp",
  description: "Acesse sua conta CotaUp",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
