import { cookies } from "next/headers";

type User = {
  id: string;
  name: string;
  email: string;
};

// Mock user database - in a real app, this would be a database
const mockUsers: Record<string, { user: User; password: string }> = {
  "user@example.com": {
    user: {
      id: "1",
      name: "Demo User",
      email: "user@example.com",
    },
    password: "password123",
  },
};

export async function signIn(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const userRecord = mockUsers[email];
  
  if (!userRecord) {
    return { success: false, error: "User not found" };
  }
  
  if (userRecord.password !== password) {
    return { success: false, error: "Invalid password" };
  }
  
  // Set auth cookie - In a real app, you would use a proper JWT
  cookies().set("authToken", userRecord.user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  });
  
  return { success: true, user: userRecord.user };
}

export async function signUp(name: string, email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  if (mockUsers[email]) {
    return { success: false, error: "User already exists" };
  }
  
  const newUser = {
    user: {
      id: Math.random().toString(36).substring(2, 15),
      name,
      email,
    },
    password,
  };
  
  mockUsers[email] = newUser;
  
  // Set auth cookie
  cookies().set("authToken", newUser.user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  });
  
  return { success: true, user: newUser.user };
}

export async function signOut() {
  cookies().delete("authToken");
  return { success: true };
}

export function getCurrentUser(): User | null {
  const authToken = cookies().get("authToken")?.value;
  
  if (!authToken) {
    return null;
  }
  
  // In a real app, you would decode the JWT and fetch user data
  // For this demo, we'll just find the user with the matching ID
  const userEntry = Object.values(mockUsers).find(entry => entry.user.id === authToken);
  return userEntry ? userEntry.user : null;
}