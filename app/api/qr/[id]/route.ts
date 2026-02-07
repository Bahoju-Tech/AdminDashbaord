import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    
    // Read the QR code file from the public directory
    const qrCodePath = path.join(process.cwd(), 'public', 'qr-codes', `${id}.png`);
    
    if (fs.existsSync(qrCodePath)) {
      const qrCodeBuffer = fs.readFileSync(qrCodePath);
      const qrCodeBase64 = qrCodeBuffer.toString('base64');
      const qrCodeDataUrl = `data:image/png;base64,${qrCodeBase64}`;
      
      return NextResponse.json({
        success: true,
        qrCodeUrl: qrCodeDataUrl
      });
    } else {
      return NextResponse.json({
        success: false,
        error: 'QR code not found'
      }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching QR code:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch QR code' },
      { status: 500 }
    );
  }
}
