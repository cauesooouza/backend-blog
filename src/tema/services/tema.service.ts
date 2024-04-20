import { Tema } from './../entities/tema.entity';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";

@Injectable()
export class TemaService {
    constructor(
        @InjectRepository(Tema)
        private temaRepository: Repository<Tema>) { }

    async findAll(): Promise<Tema[]> {
        return await this.temaRepository.find({ relations: { postagem: true } });
    }

    async findById(id: number): Promise<Tema> {
        let findedTema = await this.temaRepository.findOne({ where: { id }, relations: { postagem: true } })

        if (!findedTema) throw new HttpException("Post not found", HttpStatus.NOT_FOUND);

        return findedTema;
    }

    async findByDescription(text: string): Promise<Tema[]> {
        return this.temaRepository.find({ where: { description: ILike(`%${text}%`) }, relations: { postagem: true } })
    }

    async create(tema: Tema): Promise<Tema> {
        return await this.temaRepository.save(tema)
    }

    protected async findTema(id: number): Promise<Tema> {
        return this.temaRepository.findOne({ where: { id } })
    }

    async update(tema: Tema): Promise<Tema> {
        let findedPost = await this.findTema(tema.id);

        if (!findedPost || !tema.id) {
            throw new HttpException("Post not found", HttpStatus.NOT_FOUND);
        }

        return this.temaRepository.save(tema);
    }

    async delete(id: number): Promise<DeleteResult> {
        let findedPost = await this.findTema(id);

        if (!findedPost) {
            throw new HttpException("Post not found", HttpStatus.NOT_FOUND);
        }

        return await this.temaRepository.delete(findedPost)
    }

}