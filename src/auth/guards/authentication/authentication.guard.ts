import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { AuthType } from "src/auth/enum/auth-type.enum";
import { AccessTokenGuard } from "../access-token/access-token.guard";

@Injectable()
export class AuthenticationGuard implements CanActivate {
    // Set the default Auth Type
    private static readonly defaultAuthType = AuthType.Bearer;

    constructor(
        private readonly reflector: Reflector,
        private readonly accessTokenGuard: AccessTokenGuard,
      ) {}
    // create authTypeGuardMap
    private readonly authTypeGuardMap: Record<AuthType, CanActivate | CanActivate[]> = {
        [AuthType.Bearer]: this.accessTokenGuard,
        [AuthType.None]: { canActivate: () => true }
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        console.log(this.authTypeGuardMap);
        return true;
    }

    
}