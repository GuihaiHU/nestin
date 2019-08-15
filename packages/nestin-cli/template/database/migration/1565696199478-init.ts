import {MigrationInterface, QueryRunner} from "typeorm";

export class init1565696199478 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "auth_sso" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "deleted_at" datetime, "user_id" integer NOT NULL, "type" varchar NOT NULL, "open_id" varchar NOT NULL, "union_id" varchar, "visit_token" varchar, "refresh_token" varchar, "expires_in" varchar, "scope" varchar, "visit_token_created_at" datetime, CONSTRAINT "UQ_ac2aaf095f7206ba67bda246522" UNIQUE ("open_id"), CONSTRAINT "REL_459c714f690e6b2c119a4c6924" UNIQUE ("user_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ac2aaf095f7206ba67bda24652" ON "auth_sso" ("open_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_927d0880078a90463ca07ca1a7" ON "auth_sso" ("union_id") `);
        await queryRunner.query(`CREATE TABLE "auth_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "deleted_at" datetime, "username" varchar, "password" varchar, "avatar_path" varchar, "nick_name" varchar, "phone" varchar, "is_active" boolean NOT NULL DEFAULT (1), CONSTRAINT "UQ_d7612de7c31d802a8346f412648" UNIQUE ("username"))`);
        await queryRunner.query(`CREATE TABLE "auth_role" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "deleted_at" datetime, "name" varchar NOT NULL, CONSTRAINT "UQ_dd2dc743f4acaa5343a5b8c7685" UNIQUE ("name"))`);
        await queryRunner.query(`CREATE TABLE "auth_user_roles_auth_role" ("user_id" integer NOT NULL, "role_id" integer NOT NULL, PRIMARY KEY ("user_id", "role_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_72c13f4d17ed9507b4a9e146fe" ON "auth_user_roles_auth_role" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_f0df60180682dbf7ea9cd369c8" ON "auth_user_roles_auth_role" ("role_id") `);
        await queryRunner.query(`DROP INDEX "IDX_ac2aaf095f7206ba67bda24652"`);
        await queryRunner.query(`DROP INDEX "IDX_927d0880078a90463ca07ca1a7"`);
        await queryRunner.query(`CREATE TABLE "temporary_auth_sso" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "deleted_at" datetime, "user_id" integer NOT NULL, "type" varchar NOT NULL, "open_id" varchar NOT NULL, "union_id" varchar, "visit_token" varchar, "refresh_token" varchar, "expires_in" varchar, "scope" varchar, "visit_token_created_at" datetime, CONSTRAINT "UQ_ac2aaf095f7206ba67bda246522" UNIQUE ("open_id"), CONSTRAINT "REL_459c714f690e6b2c119a4c6924" UNIQUE ("user_id"), CONSTRAINT "FK_459c714f690e6b2c119a4c69244" FOREIGN KEY ("user_id") REFERENCES "auth_user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_auth_sso"("id", "created_at", "updated_at", "deleted_at", "user_id", "type", "open_id", "union_id", "visit_token", "refresh_token", "expires_in", "scope", "visit_token_created_at") SELECT "id", "created_at", "updated_at", "deleted_at", "user_id", "type", "open_id", "union_id", "visit_token", "refresh_token", "expires_in", "scope", "visit_token_created_at" FROM "auth_sso"`);
        await queryRunner.query(`DROP TABLE "auth_sso"`);
        await queryRunner.query(`ALTER TABLE "temporary_auth_sso" RENAME TO "auth_sso"`);
        await queryRunner.query(`CREATE INDEX "IDX_ac2aaf095f7206ba67bda24652" ON "auth_sso" ("open_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_927d0880078a90463ca07ca1a7" ON "auth_sso" ("union_id") `);
        await queryRunner.query(`DROP INDEX "IDX_72c13f4d17ed9507b4a9e146fe"`);
        await queryRunner.query(`DROP INDEX "IDX_f0df60180682dbf7ea9cd369c8"`);
        await queryRunner.query(`CREATE TABLE "temporary_auth_user_roles_auth_role" ("user_id" integer NOT NULL, "role_id" integer NOT NULL, CONSTRAINT "FK_72c13f4d17ed9507b4a9e146fea" FOREIGN KEY ("user_id") REFERENCES "auth_user" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_f0df60180682dbf7ea9cd369c83" FOREIGN KEY ("role_id") REFERENCES "auth_role" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, PRIMARY KEY ("user_id", "role_id"))`);
        await queryRunner.query(`INSERT INTO "temporary_auth_user_roles_auth_role"("user_id", "role_id") SELECT "user_id", "role_id" FROM "auth_user_roles_auth_role"`);
        await queryRunner.query(`DROP TABLE "auth_user_roles_auth_role"`);
        await queryRunner.query(`ALTER TABLE "temporary_auth_user_roles_auth_role" RENAME TO "auth_user_roles_auth_role"`);
        await queryRunner.query(`CREATE INDEX "IDX_72c13f4d17ed9507b4a9e146fe" ON "auth_user_roles_auth_role" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_f0df60180682dbf7ea9cd369c8" ON "auth_user_roles_auth_role" ("role_id") `);
        await queryRunner.query(`CREATE TABLE "query-result-cache" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "identifier" varchar, "time" bigint NOT NULL, "duration" integer NOT NULL, "query" text NOT NULL, "result" text NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "query-result-cache"`);
        await queryRunner.query(`DROP INDEX "IDX_f0df60180682dbf7ea9cd369c8"`);
        await queryRunner.query(`DROP INDEX "IDX_72c13f4d17ed9507b4a9e146fe"`);
        await queryRunner.query(`ALTER TABLE "auth_user_roles_auth_role" RENAME TO "temporary_auth_user_roles_auth_role"`);
        await queryRunner.query(`CREATE TABLE "auth_user_roles_auth_role" ("user_id" integer NOT NULL, "role_id" integer NOT NULL, PRIMARY KEY ("user_id", "role_id"))`);
        await queryRunner.query(`INSERT INTO "auth_user_roles_auth_role"("user_id", "role_id") SELECT "user_id", "role_id" FROM "temporary_auth_user_roles_auth_role"`);
        await queryRunner.query(`DROP TABLE "temporary_auth_user_roles_auth_role"`);
        await queryRunner.query(`CREATE INDEX "IDX_f0df60180682dbf7ea9cd369c8" ON "auth_user_roles_auth_role" ("role_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_72c13f4d17ed9507b4a9e146fe" ON "auth_user_roles_auth_role" ("user_id") `);
        await queryRunner.query(`DROP INDEX "IDX_927d0880078a90463ca07ca1a7"`);
        await queryRunner.query(`DROP INDEX "IDX_ac2aaf095f7206ba67bda24652"`);
        await queryRunner.query(`ALTER TABLE "auth_sso" RENAME TO "temporary_auth_sso"`);
        await queryRunner.query(`CREATE TABLE "auth_sso" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "deleted_at" datetime, "user_id" integer NOT NULL, "type" varchar NOT NULL, "open_id" varchar NOT NULL, "union_id" varchar, "visit_token" varchar, "refresh_token" varchar, "expires_in" varchar, "scope" varchar, "visit_token_created_at" datetime, CONSTRAINT "UQ_ac2aaf095f7206ba67bda246522" UNIQUE ("open_id"), CONSTRAINT "REL_459c714f690e6b2c119a4c6924" UNIQUE ("user_id"))`);
        await queryRunner.query(`INSERT INTO "auth_sso"("id", "created_at", "updated_at", "deleted_at", "user_id", "type", "open_id", "union_id", "visit_token", "refresh_token", "expires_in", "scope", "visit_token_created_at") SELECT "id", "created_at", "updated_at", "deleted_at", "user_id", "type", "open_id", "union_id", "visit_token", "refresh_token", "expires_in", "scope", "visit_token_created_at" FROM "temporary_auth_sso"`);
        await queryRunner.query(`DROP TABLE "temporary_auth_sso"`);
        await queryRunner.query(`CREATE INDEX "IDX_927d0880078a90463ca07ca1a7" ON "auth_sso" ("union_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_ac2aaf095f7206ba67bda24652" ON "auth_sso" ("open_id") `);
        await queryRunner.query(`DROP INDEX "IDX_f0df60180682dbf7ea9cd369c8"`);
        await queryRunner.query(`DROP INDEX "IDX_72c13f4d17ed9507b4a9e146fe"`);
        await queryRunner.query(`DROP TABLE "auth_user_roles_auth_role"`);
        await queryRunner.query(`DROP TABLE "auth_role"`);
        await queryRunner.query(`DROP TABLE "auth_user"`);
        await queryRunner.query(`DROP INDEX "IDX_927d0880078a90463ca07ca1a7"`);
        await queryRunner.query(`DROP INDEX "IDX_ac2aaf095f7206ba67bda24652"`);
        await queryRunner.query(`DROP TABLE "auth_sso"`);
    }

}
