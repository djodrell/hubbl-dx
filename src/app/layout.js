import './globals.css';
import { trirong } from '@/app/ui/fonts';

export const metadata = {
  title: 'Hubbl Dashboard',
  description: 'Dashboards for Hubbl DX',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={trirong.className}>{children}</body>
    </html>
  );
}
