export function getRptidFromQrcode(qrcode: string): string {
    
  const qrcodeData : string[] = qrcode.split("|");
  return `${qrcodeData[3]}${qrcodeData[2]}`;
}