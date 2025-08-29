import '../styles/globals.css';
import { appDescr, appName } from './consts';

export const metadata = {
  title: appName,
  description: appDescr,
  icons: {
    icon: 'favicon.ico'
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
