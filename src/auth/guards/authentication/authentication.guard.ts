import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { AuthType } from "src/auth/enum/auth-type.enum";
import { AccessTokenGuard } from "../access-token/access-token.guard";
import { AUTH_TYPE_KEY } from "src/auth/decorators/auth.decorator";

@Injectable()
export class AuthenticationGuard implements CanActivate {
    // Set the default Auth Type
    private static readonly defaultAuthType = AuthType.Bearer;

    constructor(
        private readonly reflector: Reflector,
        private readonly accessTokenGuard: AccessTokenGuard,
    ) { }
    // create authTypeGuardMap
    private readonly authTypeGuardMap: Record<AuthType, CanActivate | CanActivate[]> = {
        [AuthType.Bearer]: this.accessTokenGuard,
        [AuthType.None]: { canActivate: () => true }
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        console.log(this.authTypeGuardMap);
        // Print authTypeGuardMap
        const authTypes = this.reflector.getAllAndOverride<AuthType[]>(
            AUTH_TYPE_KEY,
            [context.getHandler(), context.getClass()],
        ) ?? [AuthenticationGuard.defaultAuthType];
        // Show what are authTypes
        console.log(authTypes);
        const guards = authTypes.map((type) => this.authTypeGuardMap[type]).flat();
        // Declare the default error
        let error = new UnauthorizedException();

        for (let instance of guards) {
            console.log(instance);
            const canActivate = await Promise.resolve(
                instance.canActivate(context),
            ).catch((err) => {
                error = err;
            });

            // Display Can Activate
            console.log(canActivate);
            if (canActivate) {
                return true;
            }
        }
        //return true;
    }


}