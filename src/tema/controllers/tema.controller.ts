import { Tema } from '../entities/tema.entity';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { TemaService } from '../services/tema.service';
import { DeleteResult } from 'typeorm';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller("/tema")
export class TemaController {
    constructor(private readonly temaService: TemaService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Tema[]> {
        return this.temaService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Tema> {
        return this.temaService.findById(id);
    }

    @Get('/description/:description')
    @HttpCode(HttpStatus.OK)
    findByDescription(@Param('description') description: string): Promise<Tema[]> {
        return this.temaService.findByDescription(description);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createPost(@Body() tema: Tema): Promise<Tema> {
        return this.temaService.create(tema)
    }

    @Put()
    @HttpCode(HttpStatus.CREATED)
    updatePost(@Body() tema: Tema): Promise<Tema> {
        return this.temaService.update(tema);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    deletePost(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
        return this.temaService.delete(id);
    }
}