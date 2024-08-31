import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { Request } from "express";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
    
    canActivate(context: ExecutionContext) {
        // Get the request object
        const request = context.switchToHttp().getRequest<Request>();

        // Check if the token is provided in the query parameter
        const queryToken = request.query.token as string;

        if (queryToken) {
            // If token is in the query, set it as the Authorization header for Passport's JwtStrategy
            request.headers['authorization'] = `Bearer ${queryToken}`;
        }

        return super.canActivate(context);
    }
}