import { Postagem } from '../entities/postagem.entity';
import { postagemDTO } from '../postagem.dto';
import { PostagemService } from './../services/postagem.service';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";

@Controller("/posts")
export class PostagemController {
    constructor(private readonly postagemService: PostagemService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Postagem[]> {
        return this.postagemService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number) {
        return this.postagemService.findById(id);
    }

    @Get('/title/:title')
    @HttpCode(HttpStatus.OK)
    findByTitle(@Param('title') title: string) {
        return this.postagemService.findByTitle(title);
    }

    @Get('/description/:description')
    @HttpCode(HttpStatus.OK)
    findByDescription(@Param('description') description: string){
        return this.postagemService.findByDescription(description);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createPost(@Body() postagemDTO: postagemDTO) {
        return this.postagemService.create(postagemDTO)
    }

    @Put()
    @HttpCode(HttpStatus.CREATED)
    updatePost(@Body() postagem:Postagem){
        return this.postagemService.update(postagem);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    deletePost(@Param('id', ParseIntPipe) id:number){
        return this.postagemService.delete(id);
    }
}