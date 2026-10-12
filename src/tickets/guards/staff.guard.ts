import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class StaffGuard implements CanActivate {
  canActivate(
    context: ExecutionContext, // need to study more
  ): boolean {
    const request = context.switchToHttp().getRequest();
    const staffKey = request.headers['x-staff-token'];
    if (staffKey !== 'helpdesk-staff-key') {
      throw new ForbiddenException('Staff access required');
    }
    return true;
  }
}
