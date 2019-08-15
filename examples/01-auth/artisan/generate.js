const shell = require('shelljs');
const program = require('commander');
const fs = require('fs');
const lodash = require('lodash');
const chalk = require('chalk').default;

class ModuleMaker {
  constructor(modulePath, options) {
    this.modulePath = modulePath;
    this.options = options;
    this.modulePathArr = this.modulePath.split('/');
    this.moduleName = this.modulePathArr[this.modulePathArr.length - 1];
    if (!fs.existsSync('app/' + modulePath)) {
      fs.mkdirSync('app/' + modulePath, { recursive: true });
    }
  }

  getFileName(type) {
    switch (type) {
      case 'entity':
        return 'app/' + this.modulePath + '/' + this.moduleName + '.entity.ts';
      case 'controller':
        return 'app/' + this.modulePath + '/' + this.moduleName + '.controller.ts';
      case 'service':
        return 'app/' + this.modulePath + '/' + this.moduleName + '.service.ts';
      case 'module':
        return 'app/' + this.modulePath + '/' + this.moduleName + '.module.ts';
    }
  }

  checkFileName(type) {
    let fileName = this.getFileName(type);
    if (fs.existsSync(fileName)) {
      throw new Error(fileName + '存在，创建失败');
    }
    return fileName;
  }

  getComponentName(type) {
    const BaseName = lodash.upperFirst(lodash.camelCase(this.moduleName));
    switch (type) {
      case 'entity':
        return BaseName;
      case 'table':
        return lodash.snakeCase(this.modulePath);
      case 'controller':
        return BaseName + 'Controller';
      case 'service':
        return BaseName + 'Service';
      case 'module':
        return BaseName + 'Module';
    }
  }

  initModule() {
    let fileName = this.checkFileName('module');
    let serviceName = this.getComponentName('service');
    let moduleName = this.getComponentName('module');
    let entityName = this.getComponentName('entity');
    let controllerName = this.getComponentName('controller');
    let fd = fs.openSync(fileName, 'w+');
    let tpl = `import { Module } from '@nestjs/common';
import { ${controllerName} } from './${this.moduleName}.controller';
import { ${serviceName} } from './${this.moduleName}.service';
import { ${entityName} } from './${this.moduleName}.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([${entityName}])],
  controllers: [${controllerName}],
  providers: [${serviceName}],
})
export class ${moduleName} {}
`;
    fs.writeSync(fd, tpl);
    fs.closeSync(fd);
  }

  initEntity() {
    let fileName = this.checkFileName('entity');
    let tableName = this.getComponentName('table');
    let entityName = this.getComponentName('entity');
    let fd = fs.openSync(fileName, 'w+');
    let tpl = `import { Entity, Column } from 'typeorm';
import { CommonEntity } from 'nestin-common/common.entity';

@Entity('${tableName}')
export class ${entityName} extends CommonEntity<${entityName}> {
}
`;
    fs.writeSync(fd, tpl);
    fs.closeSync(fd);
  }

  initService() {
    let fileName = this.checkFileName('service');
    let serviceName = this.getComponentName('service');
    let fd = fs.openSync(fileName, 'w+');
    let entityName = this.getComponentName('entity');
    let tpl = `import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommonService } from 'nestin-common/service/common.service';
import { ${entityName} } from './${this.moduleName}.entity';

@Injectable()
export class ${serviceName} extends CommonService<${entityName}> {
  constructor(@InjectRepository(${entityName}) public readonly repo: Repository<${entityName}>) {
    super(repo);
  }
}
`;
    fs.writeSync(fd, tpl);
    fs.closeSync(fd);
  }

  initController(modulePath) {
    let fileName = this.checkFileName('controller');
    let controllerName = this.getComponentName('controller');
    let serviceName = this.getComponentName('service');
    let entityName = this.getComponentName('entity');
    let fd = fs.openSync(fileName, 'w+');
    let tpl = `import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { ${serviceName} } from './${this.moduleName}.service';
`;
    if (this.options.crud) {
      tpl += `import { ${entityName} } from './${this.moduleName}.entity';\n`;
      tpl += `import { Crud } from '@nestjsx/crud';\n`;
      tpl += `\n`;
      tpl += `@Crud(${entityName})\n`;
    } else {
      tpl += `\n`;
    }

    tpl += `@ApiUseTags('')
@ApiBearerAuth()
@Controller('${this.modulePath}')
export class ${controllerName} {
  constructor(public service: ${serviceName}) {}
}
`;
    fs.writeSync(fd, tpl);
    fs.closeSync(fd);
  }
}

program
  .command('module [modulePath]')
  .option('-c, --crud', '是否启用crud')
  .action(function(modulePath, options) {
    let m = new ModuleMaker(modulePath, options);
    m.initModule();
    m.initEntity();
    m.initService();
    m.initController();
    console.log(chalk.green('create ok'));
  });
program.on('command:*', function() {
  console.error(chalk.red(`Invalid command: ${program.args.join(' ')}\nSee --help for a list of available commands.`));
  process.exit(1);
});
program.parse(process.argv);
