import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('Testes dos módulos usuario e auth (e2e)', () => {

  let token: any;
  let usuarioId: any;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot({
        type: 'sqlite',
        database: 'db_blogpessoal_test.db',
        entities: [__dirname + "./../src/**/entities/*.entity.ts"],
        synchronize: true,
        dropSchema: true
      }), AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  })

  it("01 - Deve cadastrar um novo usuario", async () => {
    const resposta = await request(app.getHttpServer())
      .post('/usuarios/cadastrar')
      .send({
        nome: 'root',
        usuario: 'root@root.com',
        senha: 'rootroot',
        foto: '-',
      }).expect(201);

    usuarioId = resposta.body.id;
  });

  it("02 - Não deve cadastrar um novo usuario", async () => {
    await request(app.getHttpServer())
      .post('/usuarios/cadastrar')
      .send({
        nome: 'root',
        usuario: 'root@root.com',
        senha: 'rootroot',
        foto: '-',
      }).expect(400)

  });

  it("03 - Deve autenticar o usuario", async () => {
    const resposta = await request(app.getHttpServer())
      .post('/usuarios/logar')
      .send({
        usuario: 'root@root.com',
        senha: 'rootroot',
      }).expect(200);

    token = resposta.body.token;
  })

  it("04 - Deve listar todos os usuarios", async () => {
    await request(app.getHttpServer())
      .get('/usuarios/all')
      .set('Authorization', `${token}`)
      .expect(200);
  })

  it("05 - Deve atualizar usuario", async () => {
    await request(app.getHttpServer())
      .put('/usuarios/atualizar')
      .set('Authorization', `${token}`)
      .send({
        id: usuarioId,
        nome: 'Caue',
        usuario: 'caue@root.com',
        senha: 'caue1234',
        foto: '-',
      })
      .expect(200)
      .then((response) => {
        expect(response.body.nome).toBe('Caue')
      })
  })

  it("06 - Deve retornar o usuario pelo id", async () => {
    await request(app.getHttpServer())
      .get(`/usuarios/${usuarioId}`)
      .set('Authorization', `${token}`)
      .expect(200)
  })

});
