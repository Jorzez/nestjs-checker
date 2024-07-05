import { EnvConfig } from '@smartchecker/config';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { TelegrafExecutionContext } from 'nestjs-telegraf';
import { TelegramUserContext } from 'src/users';

@Injectable()
export class IsNotBannedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const { user } = TelegrafExecutionContext.create(context).getContext<TelegramUserContext>();

    if (user?.banned && !EnvConfig.TELEGRAM_ADMIN_IDS.includes(String(user.id))) throw new Error();

    return true;
  }
}
