"use client";

import { ReactNode } from "react";

export default function ClientWrapper({ children }: { children: ReactNode }) {
  return <div className="min-h-screen animate-fade-in">{children}</div>;
}
