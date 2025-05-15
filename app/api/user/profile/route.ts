import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

// Mock function to update user data - in a real app, this would update a database
async function updateUser(userId: string, data: { name?: string; email?: string }) {
  // This is a mock implementation
  console.log(`Updating user ${userId} with data:`, data);
  return { success: true };
}

export async function PUT(request: NextRequest) {
  try {
    const user = getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    const { name, email } = await request.json();
    
    if (!name && !email) {
      return NextResponse.json(
        { error: "No data provided" },
        { status: 400 }
      );
    }
    
    const result = await updateUser(user.id, { name, email });
    
    if (!result.success) {
      return NextResponse.json(
        { error: "Failed to update profile" },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}