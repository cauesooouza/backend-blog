import { Postagem } from './../entities/postagem.entity';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";

@Injectable()
export class PostagemService {
    constructor(
        @InjectRepository(Postagem)
        private postagemRepository: Repository<Postagem>) { }

    async findAll(): Promise<Postagem[]> {
        return await this.postagemRepository.find({ relations: { tema: true, usuario: true } });
    }

    async findById(id: number): Promise<Postagem> {
        let findedPost = await this.postagemRepository.findOne({ where: { id }, relations: { tema: true, usuario: true } })

        if (!findedPost) throw new HttpException("Post not found", HttpStatus.NOT_FOUND);

        return findedPost;
    }

    async findByTitle(title: string): Promise<Postagem[]> {
        return this.postagemRepository.find({ where: { titulo: ILike(`%${title}%`) }, relations: { tema: true, usuario: true } })
    }

    async findByDescription(text: string): Promise<Postagem[]> {
        return this.postagemRepository.find({ where: { text: ILike(`%${text}%`) }, relations: { tema: true, usuario: true } })
    }

    async create(postagem: Postagem): Promise<Postagem> {
        return await this.postagemRepository.save(postagem)
    }

    async update(postagem: Postagem): Promise<Postagem> {
        let findedPost = await this.findById(postagem.id);

        if (!findedPost || !postagem.id) {
            throw new HttpException("Post not found", HttpStatus.NOT_FOUND);
        }

        return this.postagemRepository.save(postagem);
    }

    async delete(id: number): Promise<DeleteResult> {
        let findedPost = await this.findById(id);

        if (!findedPost) {
            throw new HttpException("Post not found", HttpStatus.NOT_FOUND);
        }

        return await this.postagemRepository.delete(findedPost)
    }

}