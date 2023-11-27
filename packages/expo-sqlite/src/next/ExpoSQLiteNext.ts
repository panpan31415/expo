import { SQLiteOpenOptions } from './NativeDatabase';

export default {
  get name(): string {
    return 'ExpoSQLiteNext';
  },

  NativeDatabase(dbName: string, options?: SQLiteOpenOptions): void {
    throw new Error('Unimplemented');
  },

  NativeStatement(): void {
    throw new Error('Unimplemented');
  },

  async deleteDatabaseAsync(dbName: string): Promise<void> {
    throw new Error('Unimplemented');
  },

  deleteDatabaseSync(dbName: string): void {
    throw new Error('Unimplemented');
  },

  //#region EventEmitter implementations

  addListener() {
    throw new Error('Unimplemented');
  },
  removeListeners() {
    throw new Error('Unimplemented');
  },

  //#endregion
};
