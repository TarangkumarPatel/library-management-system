// import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/bootstrap.min.css';
import '@/styles/globals.css';
import { Sora, Manrope } from 'next/font/google';
import Layout from '@/components/Layout';
import { SWRConfig} from 'swr';
import RouteGuard from '@/components/RouteGuard';

const display = Sora({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const body = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-body',
  display: 'swap',
});

const fetcher = async (...args) => {
  const response = await fetch(...args);
  if (!response.ok) {
    throw new Error(`Request failed with status: ${response.status}`);
  }
  return response.json();
};

export default function App({ Component, pageProps }) {
  return (
    <div className={`${display.variable} ${body.variable} app-shell`}>
      <RouteGuard>
        <SWRConfig value={{ fetcher }}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SWRConfig>
      </RouteGuard>
    </div>
  )
}
