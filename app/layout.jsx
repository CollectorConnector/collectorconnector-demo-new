
import './globals.css';

export const metadata = {
  title: 'CollectorConnector',
  description: 'A premium home for collectors',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
