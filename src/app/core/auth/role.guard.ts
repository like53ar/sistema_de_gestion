import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    // Expected roles passed in route data
    const expectedRoles = route.data['roles'] as string[];

    if (!expectedRoles || expectedRoles.length === 0) {
        return true;
    }

    if (authService.hasAnyRole(expectedRoles)) {
        return true;
    }

    // User doesn't have the required roles, redirect to home/unauthorized
    return router.createUrlTree(['/']);
};
