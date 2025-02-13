import { Injectable, Inject, Logger, HttpException, HttpStatus } from "@nestjs/common";

import { IdCarrinhoDto } from "src/dto/remover-do-carrinho.dto";
import { PrismaService } from "src/config/prisma.service";
import { UserCartDto, ShoppingCartDataDto } from "src/dto/shoppingCart.dto";
import { Course, ShoppingCart } from "@prisma/client";


export interface UserCartInterface {
  id: number,
  isOrderCompleted: boolean,
  course: Course
}

@Injectable()
export class ShoppingCartService {

  private readonly logger = new Logger(ShoppingCartService.name);
  constructor(private prisma: PrismaService) { };

  async isProductInTheCart(shoppingCartData: ShoppingCartDataDto): Promise<Boolean> {
    const cart = await this.prisma.shoppingCart.findFirst({
      where: {
        userId: shoppingCartData.userId,
        courseId: shoppingCartData.courseId
      }
    })
    return !!cart
  }

  async isUserIdValid(userId: number): Promise<Boolean> {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId
      }
    })
    return !!user
  }

  async isCourseIdValid(courseId: number): Promise<Boolean> {
    const course = await this.prisma.course.findFirst({
      where: {
        id: courseId
      }
    })
    return !!course
  }

  async isTheCarOwnedByThisUser(deleteCartData: UserCartDto): Promise<Boolean> {
    const cart = await this.prisma.shoppingCart.findFirst({
      where: {
        id: deleteCartData.cartId,
      }
    })

    return cart?.userId === deleteCartData.userId ? true : false
  }

  async addToCart(shoppingCartData: ShoppingCartDataDto): Promise<void> {
    try {
      const [isProductInTheCart, isUserIdValid, isCourseIdValid] = await Promise.all([
        this.isProductInTheCart(shoppingCartData),
        this.isUserIdValid(shoppingCartData.userId),
        this.isCourseIdValid(shoppingCartData.courseId)
      ]);

      if (!isUserIdValid) throw new HttpException("Invalid userId", HttpStatus.BAD_REQUEST);
      if (!isCourseIdValid) throw new HttpException("Invalid courseId", HttpStatus.BAD_REQUEST);
      if (isProductInTheCart) throw new HttpException("Course already in the cart", HttpStatus.CONFLICT)

      await this.prisma.shoppingCart.create({
        data: shoppingCartData
      })

    } catch (e) {
      if (e instanceof HttpException) throw e;
      this.logger.error("Add to cart error: ", e)
      throw new HttpException("An error occurred while add course at cart", 500)
    }
  }

  async findUserCart(userId: number): Promise<UserCartInterface[]> {
    try {
      const userCart = await this.prisma.shoppingCart.findMany({
        where: {
          userId
        },
        select: {
          id: true,
          isOrderCompleted: true,
          course: true
        },
      })
      return userCart

    } catch (e) {
      if (e instanceof HttpException) throw e;
      this.logger.error("Error at find user cart: ", e)
      throw new HttpException("An error occurred while retrieving the user's cart", 500)
    }
  }

  async deleteCart(deleteCartData: UserCartDto): Promise<void> {
    try {
      const isTheCarOwnedByThisUser = await this.isTheCarOwnedByThisUser(deleteCartData);
      if (!isTheCarOwnedByThisUser) throw new HttpException("This cart does not belong to this user or doesn't exists", HttpStatus.UNAUTHORIZED)

      await this.prisma.shoppingCart.delete({
        where: {
          id: deleteCartData.cartId
        }
      })

    } catch (e) {
      if (e instanceof HttpException) throw e;
      this.logger.error("Error while delete cart: ", e);
      throw new HttpException("An error occurred while deleting the car", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async finalizePurchase(userCart: UserCartDto): Promise<void> {
    try {
      const isTheCarOwnedByThisUser = await this.isTheCarOwnedByThisUser(userCart);
      if (!isTheCarOwnedByThisUser) throw new HttpException("This cart does not belong to this user or doesn't exists", HttpStatus.UNAUTHORIZED)

      await this.prisma.shoppingCart.update({
        where: {
          id: userCart.cartId
        },
        data: {
          isOrderCompleted: true
        }
      })

    } catch (e) {
      if (e instanceof HttpException) throw e;
      this.logger.error("Erro while finalize purchase: ", e)
      throw new HttpException("An error occurred while trying to finalize the purchase", HttpStatus.INTERNAL_SERVER_ERROR)
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