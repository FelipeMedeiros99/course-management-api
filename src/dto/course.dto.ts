import { IsString, IsNumber, IsUrl, MinLength, MaxLength, IsNotEmpty, IsInt } from 'class-validator';

export class CourseDataDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(200)
    name: string;

    @IsNotEmpty()
    @IsString()
    @IsUrl()
    url: string;

    @IsNumber({})
    @IsNotEmpty()
    price: number;

    @IsNumber({})
    @IsNotEmpty()
    descountedPrice: number;

    @IsNumber({})
    @IsNotEmpty()
    workload: number;

    @IsString()
    @IsNotEmpty()
    content: string;
}

export class EditCourseDto {
    @IsInt()
    @IsNotEmpty()
    id: number;
    
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(200)
    name: string;

    @IsNotEmpty()
    @IsString()
    @IsUrl()
    url: string;

    @IsNumber({})
    @IsNotEmpty()
    price: number;

    @IsNumber({})
    @IsNotEmpty()
    descountedPrice: number;

    @IsNumber({})
    @IsNotEmpty()
    workload: number;

    @IsString()
    @IsNotEmpty()
    content: string;
}
