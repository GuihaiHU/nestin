import * as moduleAlias from 'module-alias';
import * as path from 'path';

moduleAlias.addAlias('@plugin', path.resolve(__dirname, '../plugin'));
moduleAlias.addAlias('@common', path.resolve(__dirname, '../common'));
moduleAlias.addAlias('@app', path.resolve(__dirname, '../app'));
moduleAlias();

export default {};
