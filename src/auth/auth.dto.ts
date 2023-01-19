import { IsEmail, IsNotEmpty } from 'class-validator';
import { MaxLength } from 'class-validator/types/decorator/decorators';

// for register and login : data transfer object
// without decorator
export interface RegisterDto {
    email: string;
    password: string;
}
export interface PayloadDto {
    email: string;
}


// with decorator
export class RegisterDecoratorDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MaxLength(10)
    password: string;

}