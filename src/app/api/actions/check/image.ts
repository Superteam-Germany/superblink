import { createCanvas, loadImage, Canvas } from 'canvas';
import fs from 'fs';
import * as cloudinary from 'cloudinary';
import path from 'path';
import env from 'dotenv';
export async function createNFT(attributes: any, name:string, discord: string, imageUrl: string) {
    const totalXP = attributes[0].value;
    const writingXP = attributes[1].value;
    const strategyXP = attributes[2].value;
    const opsXP = attributes[3].value;
    const designXP = attributes[4].value;
    const devXP = attributes[5].value;
    const videoXP = attributes[6].value;
    try {
        const dpi = 1; // Higher DPI for sharper images
        const width = 1080 * dpi;
        const height = 1080 * dpi;
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        // Scale for high DPI
        ctx.scale(dpi, dpi);

        // Fill the background

        ctx.fillRect(0, 0, width / dpi, height / dpi);

        // Load an image (optional)
        try {
            const image = await loadImage('./nfts/base.jpg');
            ctx.drawImage(image, 0, 0, width / dpi, height / dpi);
        } catch (error) {
            console.error('Error loading image:', error);
        }

        // Add text with shadow
        let fontSize = 58; // Base font size
        ctx.font = `${fontSize}px sans-serif`;
        ctx.fillStyle = '#FFFFFF';
        ctx.textBaseline = 'top';


        ctx.fillText(name, 99, 212);
        fontSize = 47;
        ctx.font = `${fontSize}px sans-serif`;
        ctx.fillText(discord, 180, 318);
        fontSize = 40;
        ctx.font = `${fontSize}px sans-serif`;
        ctx.fillText(totalXP, 264, 445);
        ctx.fillText(writingXP, 345, 502);
        ctx.fillText(strategyXP, 362, 555);
        ctx.fillText(opsXP, 290, 615);
        ctx.fillText(designXP, 330, 669);
        ctx.fillText(devXP, 291, 725);
        ctx.fillText(videoXP, 315, 780);

        // Remove shadow for future elements if needed
        ctx.shadowColor = 'transparent';

        // Save to a file
        const buffer = canvas.toBuffer('image/png', {
            compressionLevel: 3, // Low compression for better quality
            filters: Canvas.PNG_FILTER_NONE,
        });
        fs.writeFileSync('./nfts/output.png', buffer);
        console.log('Image written to ./nfts/output.png');
        const nftUrl = await uploadPngToCloudinary('./nfts/output.png');
        console.log('NFT uploaded to Cloudinary:', nftUrl);
        return nftUrl;
    } catch (error) {
        console.error('Error creating image:', error);
    }
}


    const cloudinaryApiKey = env.config().parsed?.cloudinaryApiKey;
    const cloudinaryApiSecret = env.config().parsed?.cloudinaryApiSecret;
    const cloudinaryCloudName = env.config().parsed?.cloudinaryCloudName;
    cloudinary.v2.config({
        cloud_name: cloudinaryCloudName,
        api_key: cloudinaryApiKey,
        api_secret: cloudinaryApiSecret,
      });

async function uploadPngToCloudinary(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload(
        filePath,
        { resource_type: 'image' },  // Ensure it's treated as an image
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            // Return the URL of the uploaded image
            resolve(result?.secure_url || '');
          }
        }
      );
    });
  }
  