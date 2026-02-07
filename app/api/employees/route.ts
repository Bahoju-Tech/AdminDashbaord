import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Employee from '@/models/Employee';
import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';

// GET all employees
export async function GET() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URL!);
    console.log('Connected to MongoDB, fetching employees...');
    
    const employees = await Employee.find().sort({ createdAt: -1 });
    console.log('Found employees:', employees.length);
    
    return NextResponse.json({ success: true, data: employees });
  } catch (error) {
    console.error('Error fetching employees:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch employees' },
      { status: 500 }
    );
  }
}

// POST create new employee
export async function POST(request: NextRequest) {
  try {
    console.log('Connecting to MongoDB for POST...');
    await mongoose.connect(process.env.MONGODB_URL!);
    console.log('Connected to MongoDB, creating employee...');
    
    const employeeData = await request.json();
    console.log('Received employee data:', employeeData);
    
    // Generate unique employee ID
    const generatedEmployeeId = `EMP${Date.now().toString().slice(-6)}`;
    
    // Generate unique profile URL
    const profileUrl = `http://localhost:3000/employee/${generatedEmployeeId}`;
    
    console.log('Generated profileUrl:', profileUrl);
    
    // Generate QR code and save as file
    const qrCodeBuffer = await QRCode.toBuffer(profileUrl, {
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });
    
    // Create qr-codes directory if it doesn't exist
    const qrCodesDir = path.join(process.cwd(), 'public', 'qr-codes');
    if (!fs.existsSync(qrCodesDir)) {
      fs.mkdirSync(qrCodesDir, { recursive: true });
    }
    
    // Save QR code as file
    const qrCodeFileName = `${generatedEmployeeId}.png`;
    const qrCodeFilePath = path.join(qrCodesDir, qrCodeFileName);
    fs.writeFileSync(qrCodeFilePath, qrCodeBuffer);
    
    // Return the URL to the QR code file
    const qrCodeUrl = `/qr-codes/${qrCodeFileName}`;
    
    console.log('Generated QR code, length:', qrCodeBuffer.length);
    console.log('QR code saved to:', qrCodeFilePath);
    
    // Create employee with generated data
    const newEmployee = new Employee({
      ...employeeData,
      employeeId: generatedEmployeeId,
      profileUrl: profileUrl,
      qrCodeUrl: qrCodeUrl,
      updatedAt: new Date()
    });
    
    console.log('Saving employee to database...');
    await newEmployee.save();
    console.log('Employee saved successfully!');
    
    return NextResponse.json({ 
      success: true, 
      data: newEmployee,
      message: 'Employee profile created successfully' 
    });
  } catch (error: any) {
    console.error('Error creating employee:', error);
    
    // Handle duplicate key errors
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json(
        { success: false, error: 'Validation error', details: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to create employee profile' },
      { status: 500 }
    );
  }
}
