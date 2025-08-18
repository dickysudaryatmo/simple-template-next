import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken'; // Import library jsonwebtoken

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    // === BLOK AUTENTIKASI TOKEN ===

    // 1. Ambil header Authorization dari request
    const authHeader = request.headers.get('Authorization');

    // 2. Cek apakah header ada dan formatnya benar ("Bearer <token>")
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'Authorization header is missing or invalid' },
        { status: 401 } // 401 Unauthorized
      );
    }

    // 3. Ekstrak token dari header
    const token = authHeader.split(' ')[1];

    // 4. Verifikasi token menggunakan kunci rahasia
    try {
      // Pastikan JWT_SECRET ada di environment variables
      if (!process.env.JWT_SECRET) {
        throw new Error('JWT secret key is not configured.');
      }
      jwt.verify(token, process.env.JWT_SECRET);
      // Jika token valid, `verify` tidak akan melempar error dan kode akan lanjut.
    } catch (error) {
      // Jika token tidak valid (kadaluwarsa, signature salah, dll.)
      return NextResponse.json(
        { message: 'Invalid or expired token' },
        { status: 401 } // 401 Unauthorized
      );
    }

    // === AKHIR BLOK AUTENTIKASI ===
    // Jika kode sampai di sini, berarti token valid. Lanjutkan proses pembuatan data.

    const body = await request.json();
    const { kodeSatuan, namaSatuan, status } = body;

    if (!kodeSatuan || !namaSatuan) {
      return NextResponse.json(
        { message: 'Error: kodeSatuan and namaSatuan are required' },
        { status: 400 }
      );
    }

    const newMasterSatuan = await prisma.masterSatuan.create({
      data: {
        kodeSatuan: kodeSatuan,
        namaSatuan: namaSatuan,
        status: status,
      },
    });

    return NextResponse.json(newMasterSatuan, { status: 201 });

  } catch (error) {
    // Error ini menangani masalah server, bukan masalah autentikasi
    console.error("Error creating MasterSatuan:", error);
    return NextResponse.json(
      { message: 'An error occurred on the server.' },
      { status: 500 }
    );
  }
}