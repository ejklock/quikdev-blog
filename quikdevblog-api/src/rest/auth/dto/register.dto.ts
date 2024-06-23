import { IsEmail, IsNotEmpty } from 'class-validator';
import { UserEmailIsUnique } from 'src/user/validators/email-unique';
export default class RegisterDto {
  @IsNotEmpty()
  name: string;

  @UserEmailIsUnique()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
