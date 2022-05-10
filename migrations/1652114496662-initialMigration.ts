import {MigrationInterface, QueryRunner} from "typeorm";

export class initialMigration1652114496662 implements MigrationInterface {
    name = 'initialMigration1652114496662'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "notifications" ("id" SERIAL NOT NULL, "currency_pair" character varying(10) NOT NULL, "rate" character varying(30) NOT NULL, "oscillation" character varying(100) NOT NULL, "percentage" character varying(30) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(0) with time zone, CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "notifications"`);
    }

}
