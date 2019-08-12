import chalk from 'chalk';
import { ConsoleService } from 'nestjs-console';
import { Injectable } from '@nestjs/common';
import { AuthRoleService } from './role.service';
const c = console;

@Injectable()
export class RoleConsole {
  constructor(private readonly consoleService: ConsoleService, readonly roleService: AuthRoleService) {
    const cli = this.consoleService.getCli();
    cli
      .command('role:create <roleName>')
      .description('create role if role is not exist')
      .action(this.createRole.bind(this));
  }

  async createRole(roleName: string) {
    const [_, created] = await this.roleService.findOrCreate({ name: roleName });
    created
      ? c.log(chalk.green(`role:${roleName} has been created successfully!`))
      : c.log(chalk.yellow(`role:${roleName} has been in database before.`));
    process.exit(0);
  }
}
