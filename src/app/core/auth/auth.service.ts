import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';

export interface User {
    id: string;
    username: string;
    name: string;
    roles: string[];
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly ACCESS_TOKEN_KEY = 'ACCESS_TOKEN';
    private readonly REFRESH_TOKEN_KEY = 'REFRESH_TOKEN';
    private readonly USER_KEY = 'USER_DATA';

    private router = inject(Router);

    private currentUserSubject = new BehaviorSubject<User | null>(this.getStoredUser());
    currentUser$ = this.currentUserSubject.asObservable();

    private isRefreshing = false;

    get isAuthenticated(): boolean {
        return !!this.getAccessToken();
    }

    get currentUser(): User | null {
        return this.currentUserSubject.value;
    }

    // Mock Login - will replace with real HttpClient later
    login(username: string, password: string): Observable<AuthResponse> {
        // Simulated backend call
        return of({
            accessToken: 'mock-jwt-access-token',
            refreshToken: 'mock-jwt-refresh-token',
            user: {
                id: '1',
                username: username,
                name: 'Administrador',
                roles: ['ADMIN', 'VENTAS']
            }
        }).pipe(
            delay(800),
            tap(response => this.storeTokens(response))
        );
    }

    logout() {
        this.removeTokens();
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
    }

    // Tokens
    getAccessToken(): string | null {
        return localStorage.getItem(this.ACCESS_TOKEN_KEY);
    }

    getRefreshToken(): string | null {
        return localStorage.getItem(this.REFRESH_TOKEN_KEY);
    }

    // Mock Refresh Token Logic
    refreshToken(): Observable<{ accessToken: string, refreshToken: string }> {
        if (this.isRefreshing) {
            return throwError(() => new Error('Already refreshing'));
        }

        this.isRefreshing = true;

        // Simulated token refresh
        return of({
            accessToken: 'new-mock-jwt-access-token',
            refreshToken: 'new-mock-jwt-refresh-token'
        }).pipe(
            delay(500),
            tap(tokens => {
                this.isRefreshing = false;
                localStorage.setItem(this.ACCESS_TOKEN_KEY, tokens.accessToken);
                localStorage.setItem(this.REFRESH_TOKEN_KEY, tokens.refreshToken);
            }),
            catchError(error => {
                this.isRefreshing = false;
                this.logout();
                return throwError(() => error);
            })
        );
    }

    hasRole(role: string): boolean {
        const user = this.currentUser;
        return user ? user.roles.includes(role) || user.roles.includes('ADMIN') : false;
    }

    hasAnyRole(roles: string[]): boolean {
        const user = this.currentUser;
        if (!user) return false;
        if (user.roles.includes('ADMIN')) return true;

        return roles.some(role => user.roles.includes(role));
    }

    private storeTokens(response: AuthResponse) {
        localStorage.setItem(this.ACCESS_TOKEN_KEY, response.accessToken);
        localStorage.setItem(this.REFRESH_TOKEN_KEY, response.refreshToken);
        localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
        this.currentUserSubject.next(response.user);
    }

    private removeTokens() {
        localStorage.removeItem(this.ACCESS_TOKEN_KEY);
        localStorage.removeItem(this.REFRESH_TOKEN_KEY);
        localStorage.removeItem(this.USER_KEY);
    }

    private getStoredUser(): User | null {
        const userData = localStorage.getItem(this.USER_KEY);
        return userData ? JSON.parse(userData) : null;
    }
}
