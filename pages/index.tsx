import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { contractAddress } from "../src/contracts/config"
import TabContract from '../src/components/Tab';
import { Button } from '@mui/material';
import { copyClipboard } from '../src/utils/copyClipboard';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>RainbowKit App</title>
        <meta
          name="description"
          content="Generated by @rainbow-me/create-rainbowkit"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <div style={{width: '1000px'}}>
          <main style={{marginTop: "60px", display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <ConnectButton />
          </main>

          <div style={{marginTop: "60px", display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Contract Address: {contractAddress?.protocol} <Button variant="outlined" onClick={() => copyClipboard(contractAddress?.protocol)}>Copy</Button></div>

          <div className="" >
              <TabContract />
          </div>
        </div>
    </div>
  );
};

export default Home;
