"use client";

import React from "react";
import { ThemeProvider as NextThemeProvider } from "next-themes";

export function ThemeProvider({ children, ...props }) {
    return <NextThemeProvider {...props}>{children}</NextThemeProvider>;
}
