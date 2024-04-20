import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Tema } from "../../tema/entities/tema.entity";

@Entity({ name: "tb_postagem" })
export class Postagem {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, nullable: false })
    @IsNotEmpty()
    titulo: string;

    @IsNotEmpty()
    @Column({ length: 1000, nullable: false })
    text: string;

    @UpdateDateColumn()
    date: Date;

    @ManyToOne(() => Tema, (tema) => tema.postagem, {
        onDelete: "CASCADE"
    })
    tema: Tema

}