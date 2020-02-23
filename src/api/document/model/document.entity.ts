import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BaseEntity } from 'typeorm';

@Entity({
    name: 'document'
})
export class DocumentEntity extends BaseEntity {
    @PrimaryGeneratedColumn({
        name: 'id',
        type: 'integer'
    })
    public id: number;

    @Column({
        name: 'text_data',
        type: 'varchar',
        nullable: false,
    })
    public text: string;

    @CreateDateColumn({
        name: 'created_at_utc',
        type: 'timestamp without time zone',
        default: () => 'now()',
        nullable: false,
    })
    public createdAtUtc: Date;
}
