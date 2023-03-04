
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import Navbar from './component/Navbar';
import gif from '.././/public/1.gif'
import Memes from './component/Memes';
import { useState } from 'react';
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi';
import configs from '../contractConfig.json'
import { BigNumber, ethers } from 'ethers';



const Home =  () => {
 const { data:mintCost  } = useContractRead({
   address: '0x1D9e503B84732758D5BEB5177be68bac75728AfE',
  abi: configs.abi,
   functionName: 'mintCost',
 
    
 });
  const formattedMintCost = mintCost ? ethers.utils.formatEther(ethers.BigNumber.from(mintCost)) : 'Loading...';

    const { address } = useAccount();
   const { config, isError, isLoading  } = usePrepareContractWrite({
     address: '0x1D9e503B84732758D5BEB5177be68bac75728AfE',
      abi: configs.abi,
     functionName: 'mint',
     args: [address, { value: mintCost?.toString() }],
   
    
  })
  const { writeAsync } = useContractWrite(config)
  const [mintSuccess, setMintSuccess] = useState(false);
  const [mintLoading, setMintLoading] = useState(false);

  const onMintClick = async () => {
    setMintSuccess(false)
    setMintLoading(true)
    try {
      const tc = await writeAsync?.();
      const res = await tc?.wait();
       setMintSuccess(true);
    } catch (error) {
      console.log(error);
    } finally {
      setMintLoading(false);
    }
  }
  

  return (
    <>
      <div> 
        <div><Navbar></Navbar> </div> 
        <div  className={styles.gif1}> <Image src={gif} alt="My Image" width={300} height={300}  /></div>
       <br />
        <button
          disabled={mintLoading} onClick={onMintClick} className={styles.mintButton}>
          {/* {mintLoading ? 'Minting...please check wallet and wait' : 'Mint'} */}
          {mintLoading ? 'Minting...' : 'Mint'}
        </button>
        
     
      </div>
         <p className={styles.p}>   { formattedMintCost} ETH</p>
   
   <div className={styles.art}>
      {mintSuccess && <p className={styles.p}>Your meme is minted</p>}
   
        <Memes mintSuccess={mintSuccess} />
        </div>
    </>
  );
};

export default Home;
