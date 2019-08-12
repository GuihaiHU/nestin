import * as createOutputStream from 'create-output-stream';
import * as fs from 'fs-extra';
import * as moment from 'moment';
import * as path from 'path';

import { AppException } from 'nestin-common/exception/app.exception';
import { Injectable } from '@nestjs/common';

import { AbstractStorage } from '../storage.interface';

/**
 * Returns a boolean indication if stream param
 * is a readable stream or not.
 *
 * @param {*} stream
 *
 * @return {Boolean}
 */
function isReadableStream(stream) {
  return (
    stream !== null &&
    typeof stream === 'object' &&
    typeof stream.pipe === 'function' &&
    typeof stream._read === 'function' &&
    typeof stream._readableState === 'object' &&
    stream.readable !== false
  );
}

@Injectable()
export class LocalService implements AbstractStorage {
  public config;

  /**
   * Returns full path to the storage root directory
   *
   * @method _fullPath
   *
   * @param  {String}  relativePath
   *
   * @return {String}
   *
   * @private
   */
  _fullPath(relativePath) {
    return path.isAbsolute(relativePath) ? relativePath : path.join(this.config.root, relativePath);
  }

  /**
   * Determine if a file or folder already exists
   *
   * @method exists
   * @async
   *
   * @param {String} location
   */
  exists(location) {
    return fs.pathExists(this._fullPath(location));
  }

  /**
   * Returns file contents
   *
   * @method get
   * @async
   *
   * @param  {String} location
   * @param  {String} [encoding]
   *
   * @return {String|Buffer}
   */
  public async get(location: string, encoding: string): Promise<string | Buffer> {
    try {
      return await fs.readFile(this._fullPath(location), encoding);
    } catch (e) {
      if (e.code === 'ENOENT') {
        throw new AppException(`The file ${location} doesn't exist`, { code: 10404 });
      }

      throw e;
    }
  }

  /**
   * Returns a read stream for a file location. This method
   * is same as `fs.createReadStream` but added for
   * convenience.
   *
   * @method getStream
   *
   * @param {String} location
   * @param {Object|String} options
   *
   * @return {ReadableStream}
   */
  getStream(location, options) {
    return fs.createReadStream(this._fullPath(location), options);
  }

  /**
   * Create a new file. This method will create
   * missing directories on the fly.
   *
   * @method put
   *
   * @param  {String} location
   * @param  {String|Buffer|Stream}  content
   * @param  {Object} [options = {}]
   *
   * @return {Boolean}
   */
  async put(location: string, content: any, options: object = {}): Promise<boolean | object> {
    if (isReadableStream(content)) {
      return new Promise((resolve, reject) => {
        const ws = createOutputStream(this._fullPath(location), options);

        ws.on('close', () => resolve(true));
        ws.on('error', reject);
        content.pipe(ws);
      });
    }

    await fs.outputFile(this._fullPath(location), content, options);

    return true;
  }

  /**
   * Prepends content to the file
   *
   * @method prepend
   *
   * @param  {String} location
   * @param  {String|Buffer}  content
   * @param  {Object} [options = {}]
   *
   * @return {Boolean}
   */
  async prepend(location, content, options) {
    if (await this.exists(location)) {
      const actualContent = await this.get(location, 'utf-8');

      return this.put(location, `${content}${actualContent}`, options);
    }

    return this.put(location, content, options);
  }

  /**
   * Appends content to the file
   *
   * @method append
   *
   * @param  {String} location
   * @param  {String|Buffer|Stream}  content
   * @param  {Object} [options = {}]
   *
   * @return {Boolean}
   */
  async append(location, content, options) {
    if (isReadableStream(content)) {
      return this.put(location, content, Object.assign({ flags: 'a' }, options));
    }

    await fs.appendFile(this._fullPath(location), content, options);

    return true;
  }

  /**
   * Delete existing file. This method will not
   * throw any exception if file doesn't exists
   *
   * @method delete
   *
   * @param  {String} location
   *
   * @return {Boolean}
   */
  async delete(location: string): Promise<boolean> {
    await fs.remove(this._fullPath(location));

    return true;
  }

  /**
   * Move file to a new location
   *
   * @method move
   * @async
   *
   * @param  {String} src
   * @param  {String} dest
   * @param  {Object} options
   *
   * @return {Boolean}
   */
  async move(src, dest, options = {}) {
    await fs.move(this._fullPath(src), this._fullPath(dest), options);

    return true;
  }

  /**
   * Copy a file to a location.
   *
   * @method copy
   * @async
   *
   * @param  {String} src
   * @param  {String} dest
   * @param  {Object} options
   *
   * @return {Boolean}
   */
  async copy(src, dest, options) {
    await fs.copy(this._fullPath(src), this._fullPath(dest), options);

    return true;
  }

  url(location: string): string {
    const protocol = this.config.secure ? 'https' : 'http';
    const prefix = path.relative(process.cwd(), this.config.root);
    const filePath = path.join(this.config.host, prefix, location);
    return `${protocol}://${filePath}`;
  }

  asset(location: string): string {
    const prefix = path.relative(process.cwd(), this.config.root);
    return path.join(prefix, location);
  }

  randomLocation(folderName: string, suffix: string = 'png'): string {
    const name = moment().format('YYYY-MM-DD-HH:mm:ss-') + Math.floor(Math.random() * 100000) + '.' + suffix;
    return path.join(folderName, name);
  }
}
