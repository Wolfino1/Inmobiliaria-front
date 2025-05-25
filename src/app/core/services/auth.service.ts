import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject  } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  role: string;
  sellerId: number;
  sub: string;
  iat: number;
  exp: number;
}
export interface RegisterRequest {
  name:         string;
  lastname:     string;
  document:     string;
  phoneNumber:  string;
  dateOfBirth:  string; 
  email:        string;
  password:     string;
}

export interface RegisterResponse {
  id:       number;
  name:     string;
  lastname: string;
  email:    string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  name:  string;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  private baseUrl = 'http://localhost:8090/api/v1/auth';
  private userUrl = 'http://localhost:8090/api/v1/user';

  private userNameSubject = new BehaviorSubject<string>(this.getUserName() || '');
  userName$ = this.userNameSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.baseUrl}/login`,
      credentials
    );
  }
    setUserName(name: string) {
    this.userNameSubject.next(name);
  }

    registerBuyer(data: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(
      `${this.userUrl}/buyer`,
      data
    );
  }

  registerSeller(data: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(
      `${this.userUrl}/seller`,
      data
    );
  }

getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;
    const payload = jwtDecode(token) as JwtPayload;
    return payload.role;
  }

getUserName(): string | null {
  const token = this.getToken();
  if (!token) return null;

  const payload = jwtDecode(token) as JwtPayload;
  const sub = payload.sub || '';

  const localPart = sub.split('@')[0];

  const firstSegment = localPart.split(/[\.\-_]/)[0];

  return firstSegment.charAt(0).toUpperCase() + firstSegment.slice(1);
}
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('token');
    this.userNameSubject.next('');
    window.location.href = '/login';
  }
}