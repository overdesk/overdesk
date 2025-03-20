import './root.css';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';

import { AppContextProvider } from '../widgets';

export default function App() {
  return (
    <AppContextProvider>
      <Outlet />
    </AppContextProvider>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
