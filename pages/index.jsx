import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>欢迎来到CANVAS</h1>
        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>MLGB-人间失格</code>
        </p>

        <div className={styles.grid}>
          <Link href="/curvediagram">
            <div className={styles.card}>
              <h2>曲线图 &rarr;</h2>
              <p>在canvas里点击可以生成曲线图，调节系数可以改变曲线图曲度.</p>
            </div>
          </Link>

          <a className={styles.card}>
            <h2>柱状图&rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>
          <Link href="/linechartdiagram">
            <a className={styles.card}>
              <h2>折线图 &rarr;</h2>
              <p>体验折线图带来的快感，拖动产生数据提示</p>
            </a>
          </Link>

          <a className={styles.card}>
            <h2>饼图 &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
          <Link href="/palette">
            <a className={styles.card}>
              <h2>调色板 &rarr;</h2>
              <p>这是一个调色板:THIS IS THE PALETTE</p>
            </a>
          </Link>
          <a className={styles.card}>
            <h2>调色板 &rarr;</h2>
            <p>这是一个调色板,this is the palette</p>
          </a>
          <a className={styles.card}>
            <h2>调色板 &rarr;</h2>
            <p>这是一个调色板,this is the palette</p>
          </a>
          <a className={styles.card}>
            <h2>调色板 &rarr;</h2>
            <p>这是一个调色板,this is the palette</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a target="_blank" rel="noopener noreferrer">
          Powered by MLGB
        </a>
      </footer>
    </div>
  );
}
