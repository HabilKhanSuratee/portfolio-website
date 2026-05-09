import React, { useRef, useState, useEffect, ChangeEvent } from 'react';
import { Upload } from 'lucide-react';
import { FONTS } from '../../constants/theme';
import defaultAvatar from '../../img/habil_khan.jpg';

const CANVAS_SIZE = 320;
const PIXEL_BLOCK = 6;

export const PixelImageRenderer = () => {
  const [hasImage, setHasImage] = useState(false);
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const img = new Image();
    img.onload = () => renderPixelated(img);
    img.src = defaultAvatar;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result;
      if (typeof dataUrl !== 'string') return;
      const img = new Image();
      img.onerror = () => console.error('PixelImageRenderer: failed to load image');
      img.onload = () => renderPixelated(img);
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const renderPixelated = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    canvas.width  = CANVAS_SIZE;
    canvas.height = CANVAS_SIZE;

    const lowResW = Math.ceil(CANVAS_SIZE / PIXEL_BLOCK);
    const lowResH = Math.ceil(CANVAS_SIZE / PIXEL_BLOCK);

    const offscreen = document.createElement('canvas');
    offscreen.width  = lowResW;
    offscreen.height = lowResH;
    const offCtx = offscreen.getContext('2d');
    if (!offCtx) return;

    const scale  = Math.max(lowResW / img.width, lowResH / img.height);
    const coverW = img.width  * scale;
    const coverH = img.height * scale;
    const coverX = (lowResW - coverW) / 2;
    const coverY = (lowResH - coverH) / 2;

    offCtx.drawImage(img, coverX, coverY, coverW, coverH);

    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(offscreen, 0, 0, lowResW, lowResH, 0, 0, CANVAS_SIZE, CANVAS_SIZE);

    ctx.fillStyle = 'rgba(0, 255, 65, 0.2)';
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    ctx.globalCompositeOperation = 'overlay';
    ctx.drawImage(offscreen, 0, 0, lowResW, lowResH, 0, 0, CANVAS_SIZE, CANVAS_SIZE);
    ctx.globalCompositeOperation = 'source-over';

    setHasImage(true);
  };

  return (
    <div
      className="absolute inset-0 z-0 flex items-center justify-center cursor-pointer group/uploader"
      onClick={handleUploadClick}
      title="Upload an image to digitize"
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      <canvas
        ref={canvasRef}
        className={`w-full h-full object-cover absolute inset-0 z-0 transition-opacity duration-300 ${hasImage ? 'opacity-100' : 'opacity-0'}`}
      />

      <div className="absolute inset-0 bg-black/0 group-hover/uploader:bg-black/60 transition-colors z-10 flex items-center justify-center opacity-0 group-hover/uploader:opacity-100 backdrop-blur-[2px]">
        <div className="flex items-center gap-2 text-sm text-[#00ff41] bg-black px-2 py-1 border border-[#00ff41]">
          <Upload className="w-4 h-4" />
          <span style={FONTS.code}>OVERRIDE_IMG</span>
        </div>
      </div>
    </div>
  );
};
