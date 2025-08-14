// ファイル: /pages/index.js
import Head from 'next/head';
import TokenAnalyticsDashboard from '../components/TokenAnalyticsDashboard';

export default function Home() {
  return (
    <>
      <Head>
        <title>OSHIスキャン</title>
      </Head>
      <main className="p-6">
        <TokenAnalyticsDashboard />
      </main>
    </>
  );
}
