import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCarImages1635600693633 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "cars_image",
                columns: [
                    { name: "id", type: "uuid", isPrimary: true },
                    { name: "car_id", type: "uuid"},
                    { name: "image_name", type: "varchar"},
                    { name: "create_at", type: "timestamp", default: "now()"},
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("cars_image");
    }

}
