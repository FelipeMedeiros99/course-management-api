import { IsInt, IsNotEmpty } from 'class-validator';

export class ShoppingCartDataDto {
    @IsInt()
    @IsNotEmpty()
    userId: number;

    @IsInt()
    @IsNotEmpty()
    courseId: number;
}


export class UserCartDto{
  @IsInt()
  @IsNotEmpty()
  userId: number;
  
  @IsInt()
  @IsNotEmpty()
  cartId: number
}