import { Postagem } from './../entities/postagem.entity';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { postagemDTO } from '../postagem.dto';

@Injectable()
export class PostagemService {
    constructor(
        @InjectRepository(Postagem)
        private postagemRepository: Repository<Postagem>) { }

    async findAll(): Promise<Postagem[]> {
        return await this.postagemRepository.find();
    }

    async findById(id: number): Promise<Postagem> {
        let findedPost = await this.postagemRepository.findOneBy({ id })
        
        if(!findedPost) throw new HttpException("Post not found", HttpStatus.NOT_FOUND);

        return findedPost;  
    }

    async createPost(postagem: postagemDTO): Promise<Postagem> {
        return await this.postagemRepository.save(postagem)
    }
}