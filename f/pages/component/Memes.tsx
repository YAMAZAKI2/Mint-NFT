import Image from 'next/image';
import styles from '../../styles/Home.module.css';
import { getContract } from '@wagmi/core'
import configs from '../../contractConfig.json'
import { useEffect, useState } from 'react';
import {useContractRead,} from 'wagmi';



const contract = getContract({
  address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  abi: configs.abi,
})
interface MemesProps {
  mintSuccess: boolean;
}

const Memes = ({ mintSuccess }: MemesProps) => {

 const { data:tokenURI  } = useContractRead({
   address: '0x1D9e503B84732758D5BEB5177be68bac75728AfE',
  abi: configs.abi,
    functionName: 'commonTokenURI',
  });

  
  const [imageHash, setImageHash] = useState('')
  
  useEffect(() => {
    (async () => {
      const gateway = tokenURI
      // console.log(gateway);
     
      const json = await fetch(gateway as RequestInfo).then((res) => res.json());
      setImageHash(json.image)
    })();
   
  }, [tokenURI])

  return (
   <>
      {mintSuccess &&<h2>Memes</h2> &&
        (
      <div className={styles.img}>
      <Image  src={imageHash} width={400} height={400} alt="Image 1" />
      </div>
 
)}
    </>
  );
};

export default Memes;
