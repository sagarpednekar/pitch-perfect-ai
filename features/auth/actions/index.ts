'use server';
import { auth, db } from '@/core/db/admin';
import { cookies } from 'next/headers';

const SESSION_DURATION = 60 * 60 * 24 * 7;

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  const sessionCookie = await auth.createSessionCookie(token, {
    expiresIn: SESSION_DURATION,
  });
  cookieStore.set('session', sessionCookie, {
    maxAge: SESSION_DURATION,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
  });
}

export async function Register(params: RegisterParams) {
  const { name, email, uid } = params;

  try {
    // check if the user exists
    const user = await db.collection('users').doc(uid).get();

    if (user.exists) {
      return {
        status: 'success',
        message: 'User already exists. Please login instead.',
      };
    }

    // If user does not exist, create a new user
    await db.collection('users').doc(uid).set({
      name,
      email,
    });

    return {
      status: 'success',
      message: 'User registered successfully.',
    };
  } catch (error) {
    return {
      status: 'error',
      message: 'An error occurred while registering the user.',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function login(params: { email: string; token: string }) {
  const { email, token } = params;
  try {
    // Authenticate user with email and password
    const user = await auth.getUserByEmail(email);
    if (!user) {
      return {
        status: 'error',
        message: 'User not found. Create an account.',
      };
    }
    await setSessionCookie(token);
  } catch (error) {
    return {
      status: 'error',
      message: 'An error occurred while logging in.',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function logout() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('session');
    return {
      status: 'success',
      message: 'User logged out successfully.',
    };
  } catch (error) {
    return {
      status: 'error',
      message: 'An error occurred while logging out.',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session')?.value;
  if (!sessionCookie) {
    return null;
  }
  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
    const user = await db.collection('users').doc(decodedClaims.uid).get();
    if (!user.exists) {
      return null;
    }
    return {
      ...user.data(),
      id: user.id,
    } as User;
  } catch (error) {
    console.error('Error verifying session cookie:', error);
    return null;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser();
  return user !== null;
}
