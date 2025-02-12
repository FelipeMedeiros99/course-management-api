import { Injectable, Inject } from "@nestjs/common";

import { IdCarrinhoDto } from "src/dto/remover-do-carrinho.dto";
import { PrismaService } from "src/config/prisma.service";
import { ShoppingCartDataDto } from "src/dto/shoppingCart.dto";

@Injectable()
export class ShoppingCartService {

  constructor(private prisma: PrismaService) { }

  async isProductInTheCart(shoppingCartData: ShoppingCartDataDto): Promise<Boolean>{
    const cart = await this.prisma.shoppingCart.findFirst({
      where: {
        userId: shoppingCartData.userId,
        courseId: shoppingCartData.courseId
      }
    })

    return !!cart

  }

  async addToCart(shoppingCartData: ShoppingCartDataDto){
    const isProductInTheCart = await this.isProductInTheCart(shoppingCartData)
    if(!isProductInTheCart){
      await this.prisma.shoppingCart.create({
        data: shoppingCartData
      })
    }
  }
  

}

//   async adicionarAoCarrinho(dadosCarrinho: CarrinhoDto) {
//     const db = await this.db.connect()
//     const { usuario_id, curso_id } = dadosCarrinho;
//     const verificarSeProdutoEstaNoCarrinhoQuery = `
//             SELECT * FROM carrinho
//             WHERE usuario_id = $1 AND curso_id = $2
//         `
//     const adicionarAoCarrinhoQuery = `
//             INSERT INTO carrinho(usuario_id, curso_id)
//             VALUES ($1, $2)
//         `
//     const valores = [usuario_id, curso_id];

//     try {

//       const buscarProdutoNoCarrinho = await db.query(verificarSeProdutoEstaNoCarrinhoQuery, valores)
//       if (!buscarProdutoNoCarrinho.rows.length) {
//         await db.query(adicionarAoCarrinhoQuery, valores)
//       }
//     } catch (error) {
//       throw new Error("Erro ao adicionar ao carrinho: " + error.message)
//     } finally {
//       db.release()
//     }
//   }

//   async removerDoCarrinho(dados: IdCarrinhoDto) {
//     const db = await this.db.connect()
//     const { id, usuario_id } = dados;
//     const removerDoCarrinhoQuery = `
//             DELETE FROM carrinho
//             WHERE id=$1
//         `
//     const valores = [id];

//     const buscarItensNoCarrinhoQuery = `
//             SELECT carrinho.id as codigo_carrinho, curso.*
//             FROM carrinho 
//             JOIN curso ON carrinho.curso_id = curso.id
//             JOIN usuario ON carrinho.usuario_id = usuario.id
//             WHERE usuario.id = $1
//         `

//     try {
//       await db.query(removerDoCarrinhoQuery, valores)

//       const buscarProdutos = await db.query(buscarItensNoCarrinhoQuery, [usuario_id])
//       return buscarProdutos.rows;


//     } catch (error) {
//       throw new Error("Erro ao adicionar ao carrinho: " + error.message)
//     } finally {
//       db.release()
//     }
//   }

//   async verCarrinho(id: number) {
//     const db = await this.db.connect()
//     try {

//       const buscarProdutos = await db.query(`
//                 SELECT carrinho.id as codigo_carrinho, curso.*, carrinho.pedido_finalizado as comprado
//                 FROM carrinho 
//                 JOIN curso ON carrinho.curso_id = curso.id
//                 JOIN usuario ON carrinho.usuario_id = usuario.id
//                 WHERE usuario.id = $1
//                 `, [id])
//       return buscarProdutos.rows;


//     } catch (error) {
//       throw new Error("Erro ao buscar dados do carrinho: " + error.message)
//     } finally {
//       db.release()
//     }
//   }

//   async alterarStatusDeCompra(dados: IdCarrinhoDto) {
//     const db = await this.db.connect()

//     try {
//       const atualizaStatusQuery = `
//             UPDATE carrinho 
//             SET pedido_finalizado = true
//             where id =$1
//             `
//       const valores = [dados.id]

//       await db.query(atualizaStatusQuery, valores)

//       return this.verCarrinho(dados.usuario_id)


//     } catch (e) {
//       throw new Error("Erro ao alterar status de compra: " + e)
//     } finally {
//       db.release()
//     }
//   }
// }