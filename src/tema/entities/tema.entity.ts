import { IsNotEmpty} from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Postagem } from "../../postagem/entities/postagem.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: "tb_tema"})
export class Tema {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id:number;

    @ApiProperty()
    @IsNotEmpty()
    @Column({length: 255, nullable:false})
    description:string;

    @ApiProperty()
    @OneToMany(()=> Postagem, (postagem) => postagem.tema)
    postagem: Postagem[]
}