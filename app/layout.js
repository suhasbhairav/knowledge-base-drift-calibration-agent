import "./globals.css";

export const metadata = {
  title: "Knowledge Base Drift Calibration Agent",
  description: "Detect stale knowledge, calibrate agent answers, and preserve trust in RAG systems.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
