import { Postagem } from '../entities/postagem.entity';
import { postagemDTO } from '../postagem.dto';
import { PostagemService } from './../services/postagem.service';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post } from "@nestjs/common";

@Controller("/postagens")
export class PostagemController{
    constructor(private readonly postagemService:PostagemService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Postagem[]>{
        return this.postagemService.findAll();
    }

    @Get('/:id')
    findById(@Param('id', ParseIntPipe) id:number){
        return this.postagemService.findById(id);
    }

    @Post()
    createPost(@Body() postagemDTO: postagemDTO){
        return this.postagemService.createPost(postagemDTO)
    }
    
}