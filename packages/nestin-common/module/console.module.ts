import { ConsoleModule } from 'nestjs-console';
import { Module, Global } from '@nestjs/common';

@Global()
@Module({
  imports: [ConsoleModule],
  exports: [ConsoleModule],
})
export class GlobalConsoleModule {}
