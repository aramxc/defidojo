import { NFTStorage, File } from 'nft.storage'
import path from 'path'
import fs from 'fs'

export const uploadToIPFS = async () => {
  const NFT_STORAGE_KEY = process.env.NFT_STORAGE_KEY

  const client = new NFTStorage({ token: NFT_STORAGE_KEY })

  // Upload image
  const imagePath = path.join(__dirname, '../assets/dojo-master.png')
  const image = new File(
    [await fs.promises.readFile(imagePath)],
    'dojo-master.png',
    { type: 'image/png' }
  )
  const imageCid = await client.storeBlob(image)

  // Create and upload metadata
  const metadata = {
    name: "Dojo Master Achievement",
    description: "Awarded for mastering DeFi challenges",
    image: `ipfs://${imageCid}`,
    attributes: [
      {
        trait_type: "Achievement Type",
        value: "Master"
      },
      {
        trait_type: "Rarity",
        value: "Legendary"
      }
    ]
  }

  const metadataCid = await client.storeBlob(
    new File([JSON.stringify(metadata)], 'metadata.json')
  )

  console.log(`Image CID: ${imageCid}`)
  console.log(`Metadata CID: ${metadataCid}`)
  
  return metadataCid
}

uploadToIPFS()