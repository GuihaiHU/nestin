import chalk from 'chalk';
import { ConsoleService } from 'nestjs-console';
import { Injectable } from '@nestjs/common';
import { AuthRoleService } from '../role/role.service';
import { AuthUserService } from './user.service';
const c = console;

@Injectable()
export class UserConsole {
  constructor(
    private readonly consoleService: ConsoleService,
    readonly userService: AuthUserService,
    readonly roleService: AuthRoleService,
  ) {
    const cli = this.consoleService.getCli();
    cli
      .command('user:create <username> <password> [roleNames]')
      .description('create user')
      .action(this.createUser.bind(this));
  }

  async createUser(username: string, password: string, roleNames: string) {
    const [_, created] = await this.userService.findOrCreate({
      username,
      password,
      roleNames: roleNames && roleNames.split(',') ? roleNames.split(',') : ['customer'],
    });
    if (!created) {
      c.log(chalk.yellow(`user:${username} has been in database before.`));
    } else {
      c.log(chalk.green(`user:${username} created successfully!`));
    }
    process.exit(0);
  }
}
