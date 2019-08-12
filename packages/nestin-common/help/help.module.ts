import { Module, Global } from '@nestjs/common';
import { ConfigModule } from 'nestjs-config';
import { HelpService } from './help.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [HelpService],
  exports: [HelpService],
})
export class GlobalHelpModule {}
