import { DeleteResult } from 'typeorm';
import { Postagem } from '../entities/postagem.entity';
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
    findById(@Param('id', ParseIntPipe) id: number): Promise<Postagem> {
        return this.postagemService.findById(id);
    }

    @Get('/title/:title')
    @HttpCode(HttpStatus.OK)
    findByTitle(@Param('title') title: string): Promise<Postagem[]> {
        return this.postagemService.findByTitle(title);
    }

    @Get('/description/:description')
    @HttpCode(HttpStatus.OK)
    findByDescription(@Param('description') description: string): Promise<Postagem[]> {
        return this.postagemService.findByDescription(description);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createPost(@Body() postagem: Postagem): Promise<Postagem> {
        return this.postagemService.create(postagem)
    }

    @Put()
    @HttpCode(HttpStatus.CREATED)
    updatePost(@Body() postagem: Postagem): Promise<Postagem> {
        return this.postagemService.update(postagem);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    deletePost(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
        return this.postagemService.delete(id);
    }
}