import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Tema } from "../../tema/entities/tema.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: "tb_postagem" })
export class Postagem {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({ length: 100, nullable: false })
    @IsNotEmpty()
    titulo: string;

    @ApiProperty()
    @IsNotEmpty()
    @Column({ length: 1000, nullable: false })
    text: string;

    @ApiProperty()
    @UpdateDateColumn()
    date: Date;

    @ApiProperty()
    @ManyToOne(() => Tema, (tema) => tema.postagem, {
        onDelete: "CASCADE"
    })
    tema: Tema[];

    @ApiProperty()
    @ManyToOne(() => Usuario, (usuario) => usuario.postagem, {
        onDelete: "CASCADE"
    })
    usuario: Usuario[];

}